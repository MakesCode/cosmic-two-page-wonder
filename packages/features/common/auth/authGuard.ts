import Cookies from 'js-cookie';
import { createIsomorphicFn } from '@tanstack/react-start';
import { setCookie } from '@tanstack/react-start/server';
import { getCookieIsomorphic } from '../../../lib/tanstack-start/getCookieIsomorphic';
import { Dependencies } from '../../../lib/redux/dependencies';
import { Settings } from '../../../lib/tanstack-start/settings';
import { encodeRefreshCookie, parseRefreshCookie } from '../../../utils/refreshCookie';

type RefreshPayload = { refreshToken: string; userName: string } | null;

export function safeParseRefreshCookie(raw?: string): RefreshPayload {
  if (!raw) return null;
  return parseRefreshCookie(raw);
}

export const setAuthCookies = createIsomorphicFn()
  .server((settings: Settings, token: string, refreshToken: string, userName: string, utcExpireDate: string | Date) => {
    const expireDate = new Date(utcExpireDate);
    const options: any = {
      path: '/',
      secure: settings.COOKIE_SECURE,
      sameSite: 'lax',
      domain: settings.DOMAIN_HOST,
      expires: expireDate,
    };

    setCookie(settings.TOKEN_COOKIE_NAME!, token, options);

    const refreshOptions = {
      ...options,
      expires: new Date(expireDate.getTime() + 7 * 24 * 60 * 60 * 1000),
    } as const;
    const encoded = encodeRefreshCookie({ refreshToken, userName });
    setCookie(settings.REFRESH_COOKIE_NAME!, encoded, refreshOptions);
  })
  .client((settings: Settings, token: string, refreshToken: string, userName: string, utcExpireDate: string | Date) => {
    const expireDate = new Date(utcExpireDate);
    const common: any = {
      path: '/',
      secure: settings.COOKIE_SECURE,
      sameSite: 'lax',
      domain: settings.DOMAIN_HOST,
    };
    Cookies.set(settings.TOKEN_COOKIE_NAME!, token, { ...common, expires: expireDate });
    const encoded = encodeRefreshCookie({ refreshToken, userName });
    Cookies.set(settings.REFRESH_COOKIE_NAME!, encoded, {
      ...common,
      expires: new Date(expireDate.getTime() + 7 * 24 * 60 * 60 * 1000),
    });
  });

export async function refreshSessionFromCookie(dependencies: Dependencies, settings: Settings): Promise<string | null> {
  const refreshRaw = getCookieIsomorphic(settings.REFRESH_COOKIE_NAME!)();
  const parsed = safeParseRefreshCookie(refreshRaw);
  if (!parsed) return null;

  const data = await dependencies.apiService
    .postPublic<{
      token: string;
      refreshToken: string;
      utcExpireDate: string | Date;
    }>('/v1/identity/refreshToken', {
      userName: parsed.userName,
      refreshToken: parsed.refreshToken,
    })
    .then((r) => r)
    .catch(() => null);

  if (!data) return null;

  setAuthCookies(settings, data.token, data.refreshToken, parsed.userName, data.utcExpireDate);
  return data.token;
}

export function ensureRole(roleCheck: () => boolean): boolean {
  return !!roleCheck();
}

export type AuthGuardResult = { isAuth: boolean; status?: 401 };

export async function authGuard(
  dependencies: Dependencies,
  options: {
    settings: Settings;
    roleCheckFromToken: (token?: string) => boolean;
  },
): Promise<AuthGuardResult> {
  const token = getCookieIsomorphic(options.settings.TOKEN_COOKIE_NAME!)();
  if (!token) {
    const refreshedToken = await refreshSessionFromCookie(dependencies, options.settings);
    if (!refreshedToken) {
      return { isAuth: false };
    }
    const okFromRefreshed = options.roleCheckFromToken(refreshedToken);
    if (!okFromRefreshed) {
      return { isAuth: false, status: 401 };
    }
    return { isAuth: true };
  }

  const ok = options.roleCheckFromToken(token);
  if (!ok) {
    return { isAuth: false, status: 401 };
  }
  return { isAuth: true };
}
