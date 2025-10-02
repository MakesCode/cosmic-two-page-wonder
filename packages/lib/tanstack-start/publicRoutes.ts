const DEFAULT_PUBLIC_PREFIXES = ['/401'];

export function isPublicPath(pathname: string | undefined | null, extraPrefixes: string[] = []): boolean {
  if (!pathname) return false;
  const prefixes = [...DEFAULT_PUBLIC_PREFIXES, ...extraPrefixes].filter(Boolean);
  return prefixes.some((p) => pathname === p || pathname.startsWith(p + '/') || pathname.startsWith(p + '?'));
}

export const PUBLIC_ROUTE_PREFIXES = DEFAULT_PUBLIC_PREFIXES;
