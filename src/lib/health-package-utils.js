export function parseTestsInput(text) {
  if (!text?.trim()) return [];

  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      if (line.startsWith("{")) {
        try {
          return JSON.parse(line);
        } catch {
          return line;
        }
      }

      return line;
    });
}

export function formatTestsForInput(testsJson) {
  if (!testsJson) return "";

  try {
    const tests = JSON.parse(testsJson);
    if (!Array.isArray(tests)) return "";

    return tests
      .map((test) =>
        typeof test === "string" ? test : JSON.stringify(test),
      )
      .join("\n");
  } catch {
    return "";
  }
}

export function mapPackageForClient(row) {
  let tests = [];

  try {
    tests = JSON.parse(row.testsJson ?? "[]");
  } catch {
    tests = [];
  }

  return {
    id: row.id,
    legacyId: row.legacyId,
    sectionId: row.sectionId,
    name: row.name,
    price: row.price,
    originalPrice: row.originalPrice,
    badge: row.badge,
    tests,
    testsJson: row.testsJson,
    sortOrder: row.sortOrder,
    isActive: row.isActive,
    section: row.section
      ? {
          id: row.section.id,
          section: row.section.section,
          icon: row.section.icon,
        }
      : undefined,
  };
}
