export type RefreshCookiePayload = { refreshToken: string; userName: string };

export function toBase64(text: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(text, 'utf-8').toString('base64');
  }
  if (typeof TextEncoder !== 'undefined' && typeof btoa !== 'undefined') {
    const bytes = new TextEncoder().encode(text);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  }
  throw new Error('Base64 encode not supported in this environment');
}

export function fromBase64(b64: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(b64, 'base64').toString('utf-8');
  }
  if (typeof TextDecoder !== 'undefined' && typeof atob !== 'undefined') {
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder('utf-8').decode(bytes);
  }
  throw new Error('Base64 decode not supported in this environment');
}

export function encodeRefreshCookie(payload: RefreshCookiePayload): string {
  return toBase64(JSON.stringify(payload));
}

export function parseRefreshCookie(raw?: string | null): RefreshCookiePayload | null {
  if (!raw) return null;
  try {
    return JSON.parse(fromBase64(raw)) as RefreshCookiePayload;
  } catch {
    return null;
  }
}
