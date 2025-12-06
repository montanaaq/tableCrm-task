import type { JSX } from 'react';
import { Button } from '@/components/ui/button';
import type {
    Organization,
    Paybox,
    PriceType,
    Warehouse
} from '../types/types';

interface IFieldConfig<T> {
    key: string;
    label: string;
    required: boolean;
    useCustomDialog?: boolean;

    dataKey?: string;
    searchPlaceholder?: string;

    getSearchValue?: (item: T) => string;
    renderItem?: (item: T, onSelect: () => void) => JSX.Element;
    getDisplayName?: (item: T) => string;
}

export const FIELD_CONFIG: readonly IFieldConfig<any>[] = [
    {
        key: 'client',
        label: 'Клиент',
        required: true,
        useCustomDialog: true
    },
    {
        key: 'warehouse',
        label: 'Склад',
        required: true,
        dataKey: 'warehouses' as const,
        searchPlaceholder: 'Поиск склада...',
        getSearchValue: (item: Warehouse) => item.name,
        renderItem: (item: Warehouse, onSelect: () => void) => (
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
        ),
        getDisplayName: (item: Warehouse) => item.name
    },
    {
        key: 'paybox',
        label: 'Счет',
        required: true,
        dataKey: 'payboxes' as const,
        searchPlaceholder: 'Поиск счета...',
        getSearchValue: (item: Paybox) => item.name,
        renderItem: (item: Paybox, onSelect: () => void) => (
            <Button
                variant="outline"
                className="w-full p-4 justify-start"
                onClick={onSelect}
            >
                <p className="font-semibold">{item.name}</p>
            </Button>
        ),
        getDisplayName: (item: Paybox) => item.name
    },
    {
        key: 'organization',
        label: 'Организация',
        required: true,
        dataKey: 'organizations' as const,
        searchPlaceholder: 'Поиск организации...',
        getSearchValue: (item: Organization) => item.name,
        renderItem: (item: Organization, onSelect: () => void) => (
            <Button
                variant="outline"
                className="w-full h-auto p-4 justify-start"
                onClick={onSelect}
            >
                <div className="text-left">
                    <p className="font-semibold">{item.name}</p>
                    {item.inn && (
                        <p className="text-sm text-gray-600">ИНН: {item.inn}</p>
                    )}
                </div>
            </Button>
        ),
        getDisplayName: (item: Organization) => item.name
    },
    {
        key: 'priceType',
        label: 'Тип цены',
        required: true,
        dataKey: 'priceTypes' as const,
        searchPlaceholder: 'Поиск типа цены...',
        getSearchValue: (item: PriceType) => item.name,
        renderItem: (item: PriceType, onSelect: () => void) => (
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
        ),
        getDisplayName: (item: PriceType) => item.name
    }
] as const;
