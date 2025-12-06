import axios, { type AxiosRequestConfig } from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

type RequestOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    data?: unknown;
    timeout?: number;
    headers?: Record<string, string>;
    token: string;
    params?: Record<string, string | number | boolean>;
};

export async function request<T = unknown>(
    url: string,
    options: RequestOptions
): Promise<T> {
    const { method = 'GET', data, timeout, headers, params, token } = options;

    const finalParams = {
        ...params,
        token
    };

    const config: AxiosRequestConfig = {
        url,
        method,
        data,
        timeout,
        headers,
        params: finalParams
    };

    const res = await api.request<T>(config);
    return res.data as T;
}
