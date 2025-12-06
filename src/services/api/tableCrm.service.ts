import type {
    ApiListResponse,
    Contragent,
    CreateOrderPayload,
    Nomenclature,
    Order,
    Organization,
    Paybox,
    PriceType,
    Warehouse
} from '@/shared/types/types';

import { request } from './client';

export const tableCrmApi = {
    validateToken: (token: string) =>
        request('/warehouses/', {
            token,
            params: { limit: 1 }
        }),

    /**
     * Получить список клиентов
     */
    getContragents: (
        token: string,
        params?: { search?: string; phone?: string }
    ) =>
        request<ApiListResponse<Contragent>>('/contragents/', {
            token,
            params
        }),

    /**
     * Получить список складов
     */
    getWarehouses: (token: string) =>
        request<ApiListResponse<Warehouse>>('/warehouses/', {
            token
        }),

    /**
     * Получить список счетов
     */
    getPayboxes: (token: string) =>
        request<ApiListResponse<Paybox>>('/payboxes/', {
            token
        }),

    /**
     * Получить список организаций
     */
    getOrganizations: (token: string) =>
        request<ApiListResponse<Organization>>('/organizations/', {
            token
        }),

    /**
     * Получить список типов цен
     */
    getPriceTypes: (token: string) =>
        request<ApiListResponse<PriceType>>('/price_types/', {
            token
        }),

    /**
     * Получить список товаров
     */
    getNomenclature: (token: string, params?: { search?: string }) =>
        request<ApiListResponse<Nomenclature>>('/nomenclature/', {
            token,
            params
        }),

    // ============= ЗАКАЗЫ =============

    /**
     * Получить список заказов
     */
    getOrders: (token: string, params?: { limit?: number; offset?: number }) =>
        request<ApiListResponse<Order>>('/docs_sales/', {
            token,
            params
        }),

    /**
     * Создать заказ (или несколько)
     */
    createOrder: (token: string, payload: CreateOrderPayload) =>
        request<Order[]>('/docs_sales/', {
            method: 'POST',
            token,
            data: payload
        }),

    /**
     * Получить конкретный заказ по ID
     */
    getOrderById: (token: string, id: number) =>
        request<Order>(`/docs_sales/${id}/`, {
            token
        })
};
