export function isEmpty(obj: any): boolean {
  return obj && typeof obj === 'object' && !Array.isArray(obj) && Object.keys(obj).length === 0;
}
