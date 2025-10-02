export interface JwtPayload {
  roles: rolesType | Array<rolesType>;
  name: string;
  sub: string;
  sub_id: string;
  nbf: number;
  exp: number;
  token: string;
}
export type rolesType = 'Agent' | 'Tenant' | 'Owner' | 'Partner' | 'Agency' | 'Manager' | 'Sales' | 'System' | 'Api';
export const AGENT_ROLE = 'Agent';
export const TENANT_ROLE = 'Tenant';
export const OWNER_ROLE = 'Owner';
export const PARTNER_ROLE = 'Partner';
export const AGENCY_ROLE = 'Agency';
export const MANAGER_ROLE = 'Manager';
export const SALES_ROLE = 'Sales';
export const SYSTEM_ROLE = 'System';
export const API_ROLE = 'Api';

export const ROLE_COMPOSE_TENANT = [TENANT_ROLE, MANAGER_ROLE];
export const ROLE_COMPOSE_MANAGER = [AGENT_ROLE, MANAGER_ROLE, SALES_ROLE, SYSTEM_ROLE];
export const ROLE_COMPOSE_PRO = [AGENCY_ROLE, PARTNER_ROLE, OWNER_ROLE];
export const ROLE_COMPOSE_PRO_API = [...ROLE_COMPOSE_PRO, API_ROLE];
export const ROLE_COMPOSE_AGENCY_OWNER = [AGENCY_ROLE, OWNER_ROLE];
export const ROLE_COMPOSE_OWNER = [OWNER_ROLE];
export const ROLE_COMPOSE_AGENCY = [AGENCY_ROLE];
export const ROLE_COMPOSE_PARTNER = [PARTNER_ROLE];
export interface JwtDecodeOptions {
  header?: boolean;
}

export interface JwtHeader {
  typ?: string;
  alg?: string;
  kid?: string;
}

function b64DecodeUnicode(str: string) {
  return decodeURIComponent(
    atob(str).replace(/(.)/g, (m, p) => {
      let code = (p as string).charCodeAt(0).toString(16).toUpperCase();
      if (code.length < 2) {
        code = '0' + code;
      }
      return '%' + code;
    }),
  );
}
function base64UrlDecode(str: string) {
  let output = str.replace(/-/g, '+').replace(/_/g, '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw new Error('base64 string is not of the correct length');
  }

  try {
    return b64DecodeUnicode(output);
  } catch (err) {
    return atob(output);
  }
}

export class InvalidTokenError extends Error {}

export function jwtDecode<T = JwtPayload>(token: string, options?: JwtDecodeOptions): T;
export function jwtDecode<T = JwtHeader | JwtPayload>(token: string, options?: JwtDecodeOptions): T {
  if (typeof token !== 'string') {
    throw new InvalidTokenError('Invalid token specified: must be a string');
  }

  options ||= {};

  const pos = options.header === true ? 0 : 1;
  const part = token.split('.')[pos];

  if (typeof part !== 'string') {
    throw new InvalidTokenError(`Invalid token specified: missing part #${pos + 1}`);
  }

  let decoded: string;
  try {
    decoded = base64UrlDecode(part);
  } catch (e) {
    throw new InvalidTokenError(`Invalid token specified: invalid base64 for part #${pos + 1} (${(e as Error).message})`);
  }

  try {
    return JSON.parse(decoded) as T;
  } catch (e) {
    throw new InvalidTokenError(`Invalid token specified: invalid json for part #${pos + 1} (${(e as Error).message})`);
  }
}
export const getTokenObject = (token?: string) => {
  if (!token) {
    return undefined;
  }

  return jwtDecode(token);
};
