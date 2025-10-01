export function getEnumNumericValuesAsStrings<T extends object>(enumType: T): string[] {
  return Object.values(enumType)
    .filter((value) => typeof value === 'number')
    .map((value) => value.toString());
}
