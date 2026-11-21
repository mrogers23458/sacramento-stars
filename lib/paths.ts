export function sitePath(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (path.startsWith("#")) return path;

  const hashAt = path.indexOf("#");
  const hash = hashAt >= 0 ? path.slice(hashAt) : "";
  let pathname = hashAt >= 0 ? path.slice(0, hashAt) : path;
  if (!pathname.startsWith("/")) return path;
  if (pathname !== "/" && !pathname.endsWith("/")) pathname = `${pathname}/`;
  return `${base}${pathname}${hash}`;
}
