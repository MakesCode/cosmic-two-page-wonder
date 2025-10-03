import { createIsomorphicFn } from '@tanstack/react-start';
import Cookies from 'js-cookie';
import { Settings } from '@lib/tanstack-start/settings';

export const getSetting = (): Settings => {
  const datasetting =
    createIsomorphicFn()
      .server(() => {
        const data = JSON.stringify({
          VITE_SMART_GARANT_URL: process.env.VITE_SMART_GARANT_URL,
          VITE_DOMAIN_URL: process.env.VITE_DOMAIN_URL,
          VITE_DOMAIN_APP_URL: process.env.VITE_DOMAIN_APP_URL,
          GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
          TOKEN_COOKIE_NAME: process.env.TOKEN_COOKIE_NAME,
          REFRESH_COOKIE_NAME: process.env.REFRESH_COOKIE_NAME,
          DOMAIN_HOST: process.env.DOMAIN_HOST,
          COOKIE_SECURE: import.meta.env.NODE_ENV === 'production',
        });
        return data;
      })
      .client(() => {
        const data = Cookies.get('settingConfig');
        return data;
      })() ?? `{}`;
  const parsed = JSON.parse(decodeURIComponent(datasetting)) as {
    VITE_SMART_GARANT_URL: string;
    VITE_DOMAIN_URL: string;
    VITE_DOMAIN_APP_URL: string;
    GOOGLE_MAPS_API_KEY: string;
    TOKEN_COOKIE_NAME: string;
    REFRESH_COOKIE_NAME: string;
    DOMAIN_HOST: string;
    COOKIE_SECURE: boolean;
  };
  if (Object.keys(parsed).length === 0) {
    return {
      VITE_SMART_GARANT_URL: '',
      VITE_DOMAIN_URL: '',
      VITE_DOMAIN_APP_URL: '',
      GOOGLE_MAPS_API_KEY: '',
      TOKEN_COOKIE_NAME: '',
      REFRESH_COOKIE_NAME: '',
      DOMAIN_HOST: '',
      COOKIE_SECURE: undefined,
    };
  }
  return parsed;
};
