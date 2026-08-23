import fs from "node:fs";
import path from "node:path";
import { registerHooks } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";

/**
 * Teaches plain Node the `@/*` -> `src/*` alias from jsconfig.json.
 *
 * Next resolves that alias through its bundler, so anything under src/ is free
 * to use it — but the seed and maintenance scripts run under bare Node, which
 * has never heard of it. Without this they die on the first aliased import,
 * which is why the older seed scripts duplicated their data inline instead of
 * importing the real constants. Load this first (`node --import`) and the
 * scripts can read the same source of truth the app does.
 */
const SRC = path.resolve(import.meta.dirname, "../src");

/* Node's ESM resolver does no extension or directory-index guessing, so the
   CommonJS-style candidates have to be tried by hand. The app relies on that
   guessing for relative imports too ("./pageContent"), not just aliased ones. */
function firstExistingFile(base) {
  const candidates = [
    base,
    `${base}.js`,
    `${base}.mjs`,
    `${base}.jsx`,
    path.join(base, "index.js"),
    path.join(base, "index.mjs"),
  ];

  return candidates.find(
    (candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile(),
  );
}

function resolveRelative(specifier, parentURL) {
  if (!parentURL?.startsWith("file:")) return undefined;
  const parentDir = path.dirname(fileURLToPath(parentURL));
  return firstExistingFile(path.resolve(parentDir, specifier));
}

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/")) {
      const resolved = firstExistingFile(path.join(SRC, specifier.slice(2)));
      if (resolved) {
        return { url: pathToFileURL(resolved).href, shortCircuit: true };
      }
    }

    try {
      return nextResolve(specifier, context);
    } catch (error) {
      /* Only extensionless relative imports get a second chance; anything else
         should surface its real resolution error. */
      if (error?.code !== "ERR_MODULE_NOT_FOUND" || !specifier.startsWith(".")) {
        throw error;
      }

      const resolved = resolveRelative(specifier, context.parentURL);
      if (!resolved) throw error;

      return { url: pathToFileURL(resolved).href, shortCircuit: true };
    }
  },
});
