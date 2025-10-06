import { getCookieIsomorphic } from '../../../lib/tanstack-start/getCookieIsomorphic';
import { Settings } from '../../../lib/tanstack-start/settings';
import { AGENCY_ROLE, AGENT_ROLE, getTokenObject, MANAGER_ROLE, OWNER_ROLE, PARTNER_ROLE, ROLE_COMPOSE_MANAGER, ROLE_COMPOSE_PRO, SALES_ROLE, SYSTEM_ROLE, TENANT_ROLE } from '../../../utils/getTokenObject';

export function getRoles(settings: Settings): Array<string> {
  const token = getCookieIsomorphic(settings.TOKEN_COOKIE_NAME!)();
  const decodedJwtData = getTokenObject(token);
  if (!decodedJwtData) {
    return [];
  }
  if (Array.isArray(decodedJwtData.roles)) {
    return decodedJwtData.roles;
  }
  return [decodedJwtData.roles];
}

export function getRolesFromToken(token?: string): Array<string> {
  const decodedJwtData = getTokenObject(token);
  if (!decodedJwtData) return [];
  return Array.isArray(decodedJwtData.roles) ? decodedJwtData.roles : [decodedJwtData.roles];
}

export function hasRole(roleName: string | Array<string>, settings: Settings): boolean {
  const roles = getRoles(settings);

  if (Array.isArray(roleName)) {
    return roleName.some((r) => roles.includes(r));
  }

  return roles.includes(roleName);
}

export function hasRoleFromToken(roleName: string | Array<string>, token?: string): boolean {
  const roles = getRolesFromToken(token);
  if (Array.isArray(roleName)) {
    return roleName.some((r) => roles.includes(r));
  }
  return roles.includes(roleName);
}
export function userConnected(settings: Settings): boolean {
  const token = getCookieIsomorphic(settings.TOKEN_COOKIE_NAME!)();
  return !!token;
}
export function getUserInfo(settings: Settings): { name: string; userId: string; email: string } | null {
  const token = getCookieIsomorphic(settings.TOKEN_COOKIE_NAME!)();
  const decodedJwtData = getTokenObject(token);

  if (!decodedJwtData) {
    return null;
  }
  return {
    name: decodedJwtData.name,
    email: decodedJwtData.sub,
    userId: decodedJwtData.sub_id,
  };
}
export function isTenantRole(settings: Settings): boolean {
  return hasRole(TENANT_ROLE, settings);
}

export function isOwnerRole(settings: Settings): boolean {
  return hasRole(OWNER_ROLE, settings);
}

export function isPartnerRole(settings: Settings): boolean {
  return hasRole(PARTNER_ROLE, settings);
}

export function isAgencyRole(settings: Settings): boolean {
  return hasRole(AGENCY_ROLE, settings);
}

export function isManagerRole(settings: Settings): boolean {
  return hasRole(MANAGER_ROLE, settings);
}
export function isManagerRoleFromToken(token?: string): boolean {
  return hasRoleFromToken(MANAGER_ROLE, token);
}
export function isManagerComposedRole(settings: Settings): boolean {
  return hasRole(ROLE_COMPOSE_MANAGER, settings);
}
export function isSalesRole(settings: Settings): boolean {
  return hasRole(SALES_ROLE, settings);
}

export function isSystemRole(settings: Settings): boolean {
  return hasRole(SYSTEM_ROLE, settings);
}

export function isAgentRole(settings: Settings): boolean {
  return hasRole(AGENT_ROLE, settings);
}

export function isProRole(settings: Settings): boolean {
  return hasRole(ROLE_COMPOSE_PRO, settings);
}

export function isProRoleFromToken(token?: string): boolean {
  return hasRoleFromToken(ROLE_COMPOSE_PRO, token);
}
export function isTenantRoleFromToken(token?: string): boolean {
  return hasRoleFromToken(TENANT_ROLE, token);
}
export function getRoleLabel(settings: Settings): string {
  if (!userConnected(settings)) {
    return '';
  }

  if (isSystemRole(settings)) {
    return 'System';
  }

  if (isManagerRole(settings)) {
    return 'Manager';
  }

  if (isSalesRole(settings)) {
    return 'Sales';
  }

  if (isAgencyRole(settings)) {
    return 'RealEstate';
  }

  if (isPartnerRole(settings)) {
    return 'Partner';
  }

  if (isOwnerRole(settings)) {
    return 'Owner';
  }

  if (isTenantRole(settings)) {
    return 'Tenant';
  }

  if (isAgentRole(settings)) {
    return 'Agent';
  }

  return 'Unknown';
}
