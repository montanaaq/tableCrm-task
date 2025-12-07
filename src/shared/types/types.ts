// ============= БАЗОВЫЕ ТИПЫ =============

export interface Contragent {
    id: number;
    name: string;
    phone?: string;
    email?: string;
    loyalty_card_id?: number;
    created_at?: string;
    updated_at?: string;
}

export interface Warehouse {
    id: number;
    name: string;
    address?: string;
    is_active: boolean;
}

export interface Paybox {
    id: number;
    name: string;
    type?: string;
    is_active: boolean;
}

export interface Organization {
    id: number;
    work_name: string;
    inn?: string;
    kpp?: string;
    address?: string;
}

export interface PriceType {
    id: number;
    name: string;
    is_default: boolean;
}

export interface Nomenclature {
    id: number;
    name: string;
    article?: string;
    barcode?: string;
    price: number;
    unit: number;
    category_id?: number;
    is_active: boolean;
}

// ============= ТОВАР В ЗАКАЗЕ =============

interface OrderGood {
    price: number;
    quantity: number;
    unit: number; // ID единицы измерения
    discount: number; // Процент или сумма скидки
    sum_discounted: number; // Сумма скидки
    nomenclature: number; // ID товара
}

// ============= НАСТРОЙКИ ПОВТОРА =============

interface OrderSettings {
    repeatability_period?: 'hours' | 'days' | 'weeks' | 'months';
    repeatability_value?: string; // Количество периодов
    repeatability_count?: string; // Сколько раз повторить
    date_next_created?: number; // Unix timestamp следующего создания
}

// ============= ЗАКАЗ (ПРОДАЖА) =============

export interface Order {
    id?: number;
    priority: number;
    dated: number; // Unix timestamp
    operation: string; // "Заказ", "Продажа", etc.
    tax_included: boolean;
    tax_active: boolean;
    goods: OrderGood[];
    settings: OrderSettings;
    loyality_card_id?: number; // ID карты лояльности
    warehouse: number; // ID склада
    contragent: number; // ID контрагента
    paybox: number; // ID счета
    organization: number; // ID организации
    status: boolean; // false = создать, true = создать и провести
    paid_rubles: number | string; // Оплаченная сумма
    paid_lt: number; // Оплаченная сумма в литах (если используется)
    created_at?: string;
    updated_at?: string;
}

// ============= ОТВЕТЫ API =============

export interface ApiListResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    result: T[];
}

// ============= ЗАПРОСЫ =============

interface CreateOrderRequest {
    priority: number;
    dated: number;
    operation: string;
    tax_included: boolean;
    tax_active: boolean;
    goods: OrderGood[];
    settings: OrderSettings;
    loyality_card_id?: number;
    warehouse: number;
    contragent: number;
    paybox: number;
    organization: number;
    status: boolean;
    paid_rubles: number | string;
    paid_lt: number;
}

export type CreateOrderPayload = CreateOrderRequest[];

// Dictionaries
export interface IDictionaries {
    warehouses: Warehouse[];
    payboxes: Paybox[];
    organizations: Organization[];
    priceTypes: PriceType[];
    isLoading: boolean;
    error: Error | null;
    refetch: () => void;
}

export type FieldKey =
    | 'client'
    | 'warehouse'
    | 'paybox'
    | 'organization'
    | 'priceType';

export type SelectedValues = {
    client: Contragent | null;
    warehouse: Warehouse | null;
    paybox: Paybox | null;
    organization: Organization | null;
    priceType: PriceType | null;
};
