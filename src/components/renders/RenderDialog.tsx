import type { FC } from 'react';
import type { FieldKey, SelectedValues } from '@/app/pages/OrderPage';
import type { FieldConfigItem } from '@/shared/constants/dialogs.constant';
import type { IDictionaries } from '@/shared/types/types';
import { BaseSelectDialog } from '../dialogs/BaseSelectDialog';
import { ClientSearchDialog } from '../dialogs/ClientSearchDialog';

interface RenderDialogProps {
    field: FieldConfigItem;
    openModals: Record<FieldKey, boolean>;
    dictionaries: IDictionaries;
    onOpen: (key: FieldKey) => void;
    onClose: (key: FieldKey) => void;
    onSelect: <T extends FieldKey>(key: T, value: SelectedValues[T]) => void;
}

const RenderDialog: FC<RenderDialogProps> = ({
    field,
    openModals,
    dictionaries,
    onOpen,
    onClose,
    onSelect
}) => {
    const key = field.key as FieldKey;
    const isOpen = openModals[key];

    if (field.useCustomDialog) {
        return (
            <ClientSearchDialog
                open={isOpen}
                onOpenChange={open => (open ? onOpen(key) : onClose(key))}
                onSelect={value => onSelect(key, value as any)}
            />
        );
    }

    if (!field.useCustomDialog) {
        const dictKeyMap: Record<
            Exclude<FieldKey, 'client'>,
            keyof IDictionaries
        > = {
            warehouse: 'warehouses',
            paybox: 'payboxes',
            organization: 'organizations',
            priceType: 'priceTypes'
        };

        const dataKey = dictKeyMap[key as Exclude<FieldKey, 'client'>];
        const data = dictionaries[dataKey] ?? [];

        return (
            <BaseSelectDialog
                open={isOpen}
                onOpenChange={open => (open ? onOpen(key) : onClose(key))}
                title={`Выбрать ${field.label.toLowerCase()}`}
                data={data as any[]}
                isLoading={dictionaries.isLoading}
                error={dictionaries.error}
                searchable
                searchPlaceholder={field.searchPlaceholder ?? 'Поиск...'}
                getSearchValue={field.getSearchValue as any}
                renderItem={field.renderItem as any}
                onSelect={value => onSelect(key, value as any)}
            />
        );
    }

    return null;
};

export default RenderDialog;
