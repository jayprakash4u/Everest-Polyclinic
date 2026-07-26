/** Encode spaces and special chars in public folder paths for next/image */
export function encodePublicPath(path) {
  return path
    .split("/")
    .map((segment) => (segment ? encodeURIComponent(segment) : segment))
    .join("/");
}
