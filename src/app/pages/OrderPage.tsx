import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { BaseSelectDialog } from '@/components/dialogs/BaseSelectDialog';
import { ClientSearchDialog } from '@/components/dialogs/ClientSearchDialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FIELD_CONFIG } from '@/shared/constants/dialogs.constant';
import { useAuth } from '@/shared/hooks/useAuthReturn';
import { useTableCrmApi } from '@/shared/hooks/useTableCrmApi';
import type {
    Contragent,
    Organization,
    Paybox,
    PriceType,
    Warehouse
} from '@/shared/types/types';
import PageLayout from '../layout/PageLayout';

type FieldKey =
    | 'client'
    | 'warehouse'
    | 'paybox'
    | 'organization'
    | 'priceType';

type SelectedValues = {
    client: Contragent | null;
    warehouse: Warehouse | null;
    paybox: Paybox | null;
    organization: Organization | null;
    priceType: PriceType | null;
};

const OrderPage = () => {
    const { dictionaries } = useTableCrmApi();

    const { logout } = useAuth();

    const navigate = useNavigate();

    const [selectedValues, setSelectedValues] = useState<SelectedValues>({
        client: null,
        warehouse: null,
        paybox: null,
        organization: null,
        priceType: null
    });

    const [openModals, setOpenModals] = useState<Record<FieldKey, boolean>>({
        client: false,
        warehouse: false,
        paybox: false,
        organization: false,
        priceType: false
    });

    const handleOpenModal = (key: FieldKey) => {
        setOpenModals(prev => ({ ...prev, [key]: true }));
    };

    const handleCloseModal = (key: FieldKey) => {
        setOpenModals(prev => ({ ...prev, [key]: false }));
    };

    const handleSelect = <T extends keyof SelectedValues>(
        key: T,
        value: SelectedValues[T]
    ) => {
        setSelectedValues(prev => ({ ...prev, [key]: value }));
    };

    const onLogout = () => {
        logout();
        toast.success('Вы вышли из аккаунта!');
        setTimeout(() => {
            navigate('/auth');
        }, 200);
    };

    const renderField = (field: (typeof FIELD_CONFIG)[number]) => {
        const key = field.key as FieldKey;
        const selectedValue = selectedValues[key];

        return (
            <div key={key}>
                <Label className="text-md font-semibold">
                    {field.label} {field.required && '*'}
                </Label>
                {selectedValue ? (
                    <div className="mt-2 flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            {field.key === 'client' ? (
                                <>
                                    <p className="font-semibold text-md">
                                        {(selectedValue as Contragent).name}
                                    </p>
                                    <p className="text-md text-gray-600">
                                        {(selectedValue as Contragent).phone}
                                    </p>
                                </>
                            ) : (
                                <p className="font-semibold">
                                    {field.getDisplayName?.(
                                        selectedValue as any
                                    )}
                                </p>
                            )}
                        </div>
                        <Button
                            variant="ghost"
                            size="lg"
                            className="w-full text-md"
                            onClick={() => handleOpenModal(key)}
                        >
                            Изменить
                        </Button>
                    </div>
                ) : (
                    <Button
                        variant="outline"
                        className="w-full mt-2 text-md"
                        size="lg"
                        onClick={() => handleOpenModal(key)}
                    >
                        Выбрать {field.label.toLowerCase()}
                    </Button>
                )}
            </div>
        );
    };

    const renderDialog = (field: (typeof FIELD_CONFIG)[number]) => {
        const key = field.key as FieldKey;

        if (field.useCustomDialog) {
            return (
                <ClientSearchDialog
                    key={key}
                    open={openModals[key]}
                    onOpenChange={open =>
                        open ? handleOpenModal(key) : handleCloseModal(key)
                    }
                    onSelect={client => handleSelect('client', client)}
                />
            );
        }

        return (
            <BaseSelectDialog
                key={key}
                open={openModals[key]}
                onOpenChange={open =>
                    open ? handleOpenModal(key) : handleCloseModal(key)
                }
                title={`Выбрать ${field.label.toLowerCase()}`}
                data={dictionaries[field.dataKey!]}
                isLoading={dictionaries.isLoading}
                error={dictionaries.error}
                onSelect={value => handleSelect(key, value)}
                searchable
                searchPlaceholder={field.searchPlaceholder}
                getSearchValue={field.getSearchValue as any}
                renderItem={field.renderItem as any}
            />
        );
    };

    return (
        <PageLayout>
            <Button
                size="lg"
                variant="outline"
                className="absolute top-8 right-8 text-md"
                onClick={onLogout}
            >
                Выйти
            </Button>
            <div className="p-4 max-w-xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Создать заказ</h1>

                <div className="space-y-4">
                    {FIELD_CONFIG.map(renderField)}

                    <div className="pt-6 space-y-2">
                        <Button className="w-full text-md" size="lg">
                            Создать продажу
                        </Button>
                        <Button
                            className="w-full text-md"
                            variant="outline"
                            size="lg"
                        >
                            Создать и провести
                        </Button>
                    </div>
                </div>

                {FIELD_CONFIG.map(renderDialog)}
            </div>
        </PageLayout>
    );
};

export default OrderPage;
