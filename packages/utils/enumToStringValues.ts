export function enumToStringValues<E extends Record<string, number | string>>(enumObj: E): string[] {
  return Object.keys(enumObj)
    .filter((key) => isNaN(Number(key)))
    .map((key) => String(enumObj[key]));
}
