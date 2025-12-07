import type { FC } from 'react';
import type { FieldConfigItem } from '@/shared/constants/dialogs.constant';
import type {
    FieldKey,
    IDictionaries,
    SelectedValues
} from '@/shared/types/types';
import { BaseSelectDialog } from '../dialogs/BaseSelectDialog';
import { ClientSearchDialog } from '../dialogs/ClientSearchDialog';
import { NomenclatureMultiSelectDialog } from '../dialogs/NomenclatureMultiSelectDialog';

interface RenderDialogProps {
    field: FieldConfigItem;
    openModals: Record<FieldKey, boolean>;
    dictionaries: IDictionaries;
    selectedValues: SelectedValues;
    onOpen: (key: FieldKey) => void;
    onClose: (key: FieldKey) => void;
    onSelect: (key: FieldKey, value: any) => void;
}

const RenderDialog: FC<RenderDialogProps> = ({
    field,
    openModals,
    dictionaries,
    selectedValues,
    onClose,
    onSelect
}) => {
    const key = field.key as FieldKey;
    const isOpen = openModals[key];

    if (field.useCustomDialog && key === 'client') {
        return (
            <ClientSearchDialog
                open={isOpen}
                onOpenChange={open => {
                    if (!open) onClose(key);
                }}
                onSelect={value => {
                    onSelect(key, value);
                }}
            />
        );
    }

    if (key === 'nomenclature') {
        return (
            <NomenclatureMultiSelectDialog
                open={isOpen}
                onOpenChange={open => {
                    if (!open) onClose(key);
                }}
                data={dictionaries.nomenclatures}
                isLoading={dictionaries.isLoading}
                error={dictionaries.error}
                selectedItems={selectedValues.nomenclature}
                onSave={items => onSelect(key, items)}
            />
        );
    }

    const dictKeyMap: Record<
        Exclude<FieldKey, 'client' | 'nomenclature'>,
        keyof IDictionaries
    > = {
        warehouse: 'warehouses',
        paybox: 'payboxes',
        organization: 'organizations',
        priceType: 'priceTypes'
    };

    const dataKey =
        dictKeyMap[key as Exclude<FieldKey, 'client' | 'nomenclature'>];
    const data = dictionaries[dataKey] ?? [];

    const fieldWithRender = field as Extract<
        FieldConfigItem,
        { renderItem: any }
    >;

    return (
        <BaseSelectDialog
            open={isOpen}
            onOpenChange={open => {
                if (!open) onClose(key);
            }}
            title={`Выбрать ${field.label.toLowerCase()}`}
            data={data as any[]}
            isLoading={dictionaries.isLoading}
            error={dictionaries.error}
            searchable
            searchPlaceholder={fieldWithRender.searchPlaceholder ?? 'Поиск...'}
            getSearchValue={fieldWithRender.getSearchValue as any}
            onSelect={value => onSelect(key, value)}
            renderItem={(item: any) =>
                fieldWithRender.renderItem(item, () => {})
            }
        />
    );
};

export default RenderDialog;
