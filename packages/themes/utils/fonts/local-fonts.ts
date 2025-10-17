export const LOCAL_FONTS = new Set([
  "AvenirNext",
  "Raleway",
]);

export function isLocalFont(fontFamily: string | null | undefined): boolean {
  if (!fontFamily) return false;
  return LOCAL_FONTS.has(fontFamily);
}
