import type { JSX } from 'react';
import { Button } from '@/components/ui/button';
import type {
    Contragent,
    Organization,
    Paybox,
    PriceType,
    Warehouse
} from '../types/types';

interface IFieldConfig<T> {
    key: string;
    label: string;
    required: boolean;
    useCustomDialog: boolean;
    dataKey?: string;
    searchPlaceholder?: string;
    getSearchValue?: (item: T) => string;
    renderItem?: (item: T, onSelect: () => void) => JSX.Element;
    getDisplayName?: (item: T) => string;
}

const renderWarehouse = (item: Warehouse, onSelect: () => void) => (
    <Button
        variant="outline"
        className="w-full h-auto p-4 justify-start"
        onClick={onSelect}
    >
        <div className="text-left">
            <p className="font-semibold">{item.name}</p>
            {item.address && (
                <p className="text-sm text-gray-600">{item.address}</p>
            )}
        </div>
    </Button>
);

const renderPaybox = (item: Paybox, onSelect: () => void) => (
    <Button
        variant="outline"
        className="w-full p-4 justify-start"
        onClick={onSelect}
    >
        <p className="font-semibold">{item.name}</p>
    </Button>
);

const renderOrganization = (item: Organization, onSelect: () => void) => (
    <Button
        variant="outline"
        className="w-full h-auto p-4 justify-start"
        onClick={onSelect}
    >
        <div className="text-left">
            <p className="font-semibold">{item.work_name}</p>
            {item.inn && (
                <p className="text-sm text-gray-600">ИНН: {item.inn}</p>
            )}
        </div>
    </Button>
);

const renderPriceType = (item: PriceType, onSelect: () => void) => (
    <Button
        variant="outline"
        className="w-full p-4 justify-between"
        onClick={onSelect}
    >
        <p className="font-semibold">{item.name}</p>
        {item.is_default && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                По умолчанию
            </span>
        )}
    </Button>
);

export const FIELD_CONFIG = [
    {
        key: 'client',
        label: 'Клиент',
        required: true,
        useCustomDialog: true,
        getDisplayName: (item: Contragent) => item.name
    } satisfies IFieldConfig<Contragent>,

    {
        key: 'warehouse',
        label: 'Склад',
        required: true,
        dataKey: 'warehouses',
        searchPlaceholder: 'Поиск склада...',
        useCustomDialog: false,
        getSearchValue: (item: Warehouse) => item.name,
        renderItem: renderWarehouse,
        getDisplayName: (item: Warehouse) => item.name
    } satisfies IFieldConfig<Warehouse>,

    {
        key: 'paybox',
        label: 'Счет',
        required: true,
        dataKey: 'payboxes',
        searchPlaceholder: 'Поиск счета...',
        useCustomDialog: false,
        getSearchValue: (item: Paybox) => item.name,
        renderItem: renderPaybox,
        getDisplayName: (item: Paybox) => item.name
    } satisfies IFieldConfig<Paybox>,

    {
        key: 'organization',
        label: 'Организация',
        required: true,
        dataKey: 'organizations',
        searchPlaceholder: 'Поиск организации...',
        useCustomDialog: false,
        getSearchValue: (item: Organization) => item.work_name,
        renderItem: renderOrganization,
        getDisplayName: (item: Organization) => item.work_name
    } satisfies IFieldConfig<Organization>,

    {
        key: 'priceType',
        label: 'Тип цены',
        required: true,
        dataKey: 'priceTypes',
        searchPlaceholder: 'Поиск типа цены...',
        useCustomDialog: false,
        getSearchValue: (item: PriceType) => item.name,
        renderItem: renderPriceType,
        getDisplayName: (item: PriceType) => item.name
    } satisfies IFieldConfig<PriceType>
] as const;

export type FieldConfigItem = (typeof FIELD_CONFIG)[number];
