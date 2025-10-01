import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { getCookieIsomorphic } from '../tanstack-start/getCookieIsomorphic.js';
import { encodeRefreshCookie, parseRefreshCookie } from '@/utils/refreshCookie.js';
import { getTokenObject } from '@/utils/getTokenObject.js';
import { Settings } from '../tanstack-start/settings.js';
import { getSetting } from '../tanstack-start/getSetting.js';

export interface ApiServiceConfig {
  options?: AxiosRequestConfig;
}

export type ApiRequestConfig = AxiosRequestConfig & {
  baseURLKey?: string;
};

export class ApiService {
  private axiosInstance: AxiosInstance;
  private defaultBaseURL: string;
  private isRefreshing = false;
  private settings: Settings;
  private failedQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (reason?: any) => void;
    config: AxiosRequestConfig;
  }> = [];

  constructor(config: ApiServiceConfig) {
    const options = config.options || {};
    const settings = getSetting();
    this.defaultBaseURL = settings.VITE_SMART_GARANT_URL!;
    this.settings = settings;

    this.axiosInstance = axios.create({
      baseURL: this.defaultBaseURL,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          const token = this.getAuthToken();

          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as (typeof error.config & { _retry?: boolean }) | undefined;

        if (error.response?.status === 401 && originalRequest) {
          // Prevent infinite refresh loops: only refresh once per request
          if (originalRequest._retry) {
            return Promise.reject(error);
          }

          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({
                resolve,
                reject,
                config: originalRequest,
              });
            });
          }

          this.isRefreshing = true;
          originalRequest._retry = true;

          try {
            const refreshToken = Cookies.get(this.settings.REFRESH_COOKIE_NAME!);
            const parsed = parseRefreshCookie(refreshToken);
            if (!parsed) throw new Error('Invalid refresh cookie');

            await this.postRefreshToken({ userName: parsed.userName, refreshToken: parsed.refreshToken });

            const token = this.getAuthToken();
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }

            this.processQueue(null);

            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            this.processQueue(refreshError);
            this.handleLogout();
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      },
    );
  }
  private isCookieSecure(): boolean {
    if (typeof this.settings.COOKIE_SECURE === 'boolean') return this.settings.COOKIE_SECURE;
    if (typeof window !== 'undefined') return window.location.protocol === 'https:';
    return false;
  }

  private handleLogout() {
    Cookies.remove(this.settings.TOKEN_COOKIE_NAME!, { path: '/', domain: this.settings.DOMAIN_HOST });
    Cookies.remove(this.settings.REFRESH_COOKIE_NAME!, { path: '/', domain: this.settings.DOMAIN_HOST });
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }

  private processQueue(error: any) {
    const queueToProcess = [...this.failedQueue];
    this.failedQueue = [];

    queueToProcess.forEach((request) => {
      if (error) {
        request.reject(error);
      } else {
        const newToken = this.getAuthToken();
        if (request.config.headers) {
          request.config.headers.Authorization = `Bearer ${newToken}`;
        }
        // Mark as retried to avoid another refresh cycle if it still 401s
        (request.config as any)._retry = true;
        request.resolve(this.axiosInstance(request.config));
      }
    });
  }
  private async postRefreshToken(data: { userName: string; refreshToken: string }) {
    const dataRefreshToken = await this.postPublic<{
      token: string;
      refreshToken: string;
      utcExpireDate: Date;
    }>('/v1/identity/refreshToken', data);

    const decodedToken = getTokenObject(dataRefreshToken.token) as {
      exp: number;
      name: string;
      nbf: number;
      roles: string;
      sub: string;
      sub_id: string;
    };

    Cookies.set(this.settings.TOKEN_COOKIE_NAME!, dataRefreshToken.token, {
      expires: new Date(dataRefreshToken.utcExpireDate),
      path: '/',
      sameSite: 'lax',
      secure: this.isCookieSecure(),
      domain: this.settings.DOMAIN_HOST,
    });
    const encoded = encodeRefreshCookie({ refreshToken: dataRefreshToken.refreshToken, userName: decodedToken?.sub });
    Cookies.set(this.settings.REFRESH_COOKIE_NAME!, encoded, {
      expires: new Date(new Date(dataRefreshToken.utcExpireDate).getTime() + 7 * 24 * 60 * 60 * 1000), // +7 jours
      path: '/',
      sameSite: 'lax',
      secure: this.isCookieSecure(),
      domain: this.settings.DOMAIN_HOST,
    });
  }
  private getAuthToken(): string | null {
    return getCookieIsomorphic(this.settings.TOKEN_COOKIE_NAME!)() || null;
  }

  public async request<T>(method: string, url: string, data?: any, config?: ApiRequestConfig): Promise<T> {
    const { baseURLKey, ...restConfig } = config ?? {};
    const baseURL = baseURLKey ?? this.defaultBaseURL;
    const response: AxiosResponse<T> = await this.axiosInstance.request({
      method,
      url,
      data,
      ...restConfig,
      baseURL,
    });
    return response.data;
  }

  public async publicRequest<T>(method: string, url: string, data?: any, config?: ApiRequestConfig): Promise<T> {
    const { baseURLKey, ...restConfig } = config ?? {};
    const baseURL = baseURLKey ?? this.defaultBaseURL;

    const publicAxios = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        ...restConfig?.headers,
      },
    });

    const response: AxiosResponse<T> = await publicAxios.request({
      method,
      url,
      data,
      ...restConfig,
      baseURL,
    });

    return response.data;
  }

  public async get<T>(url: string, config?: ApiRequestConfig): Promise<T> {
    return this.request<T>('get', url, undefined, config);
  }

  public async post<T>(url: string, data?: any, config?: ApiRequestConfig): Promise<T> {
    return this.request<T>('post', url, data, config);
  }

  public async put<T>(url: string, data?: any, config?: ApiRequestConfig): Promise<T> {
    return this.request<T>('put', url, data, config);
  }

  public async patch<T>(url: string, data?: any, config?: ApiRequestConfig): Promise<T> {
    return this.request<T>('patch', url, data, config);
  }

  public async delete<T>(url: string, config?: ApiRequestConfig): Promise<T> {
    return this.request<T>('delete', url, undefined, config);
  }

  public async getPublic<T>(url: string, config?: ApiRequestConfig): Promise<T> {
    return this.publicRequest<T>('get', url, undefined, config);
  }

  public async postPublic<T>(url: string, data?: any, config?: ApiRequestConfig): Promise<T> {
    return this.publicRequest<T>('post', url, data, config);
  }

  public async putPublic<T>(url: string, data?: any, config?: ApiRequestConfig): Promise<T> {
    return this.publicRequest<T>('put', url, data, config);
  }

  public async patchPublic<T>(url: string, data?: any, config?: ApiRequestConfig): Promise<T> {
    return this.publicRequest<T>('patch', url, data, config);
  }

  public async deletePublic<T>(url: string, config?: ApiRequestConfig): Promise<T> {
    return this.publicRequest<T>('delete', url, undefined, config);
  }
}
