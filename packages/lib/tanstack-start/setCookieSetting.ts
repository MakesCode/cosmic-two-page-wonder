import { createIsomorphicFn } from '@tanstack/react-start';
import { setCookie } from '@tanstack/react-start/server';

export const setCookieSetting = createIsomorphicFn().server(async () => {
  const setting = {
    VITE_SMART_GARANT_URL: process.env.VITE_SMART_GARANT_URL,
    VITE_DOMAIN_APP_URL: process.env.VITE_DOMAIN_APP_URL,
    VITE_DOMAIN_URL: process.env.VITE_DOMAIN_URL_MILA,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    TOKEN_COOKIE_NAME: process.env.TOKEN_COOKIE_NAME,
    REFRESH_COOKIE_NAME: process.env.REFRESH_COOKIE_NAME,
    DOMAIN_HOST: process.env.DOMAIN_HOST,
    COOKIE_SECURE: import.meta.env.NODE_ENV === 'production',
  };
  const stringjsonconfig = JSON.stringify(setting);

  return await setCookie('settingConfig', stringjsonconfig, {
    path: '/',
    secure: setting.COOKIE_SECURE,
  });
});
