import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { OrderCreateButton } from '@/components/OrderCreateButton';
import RenderDialog from '@/components/renders/RenderDialog';
import RenderField from '@/components/renders/RenderField';
import { Button } from '@/components/ui/button';
import { FIELD_CONFIG } from '@/shared/constants/dialogs.constant';
import { useAuth } from '@/shared/hooks/useAuthReturn';
import { useTableCrmApi } from '@/shared/hooks/useTableCrmApi';
import type {
    Contragent,
    CreateOrderPayload,
    Organization,
    Paybox,
    PriceType,
    Warehouse
} from '@/shared/types/types';
import PageLayout from '../layout/PageLayout';

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

    const handleSelect = <T extends FieldKey>(
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
                    {FIELD_CONFIG.map(field => (
                        <RenderField
                            key={field.key}
                            fieldKey={field.key as FieldKey}
                            label={field.label}
                            value={selectedValues[field.key as FieldKey]}
                            onClick={() =>
                                handleOpenModal(field.key as FieldKey)
                            } // <- тоже каст
                        />
                    ))}

                    <div className="pt-6 space-y-2">
                        <OrderCreateButton
                            buttonText="Создать заказ"
                            payload={[]}
                            createOrder={(
                                payload: CreateOrderPayload
                            ): void => {
                                throw new Error('Function not implemented.');
                            }}
                            isLoading={false}
                        />
                        <Button
                            className="w-full text-md"
                            variant="outline"
                            size="lg"
                        >
                            Создать и провести
                        </Button>
                    </div>
                </div>

                {FIELD_CONFIG.map(field => (
                    <RenderDialog
                        key={field.key}
                        field={field}
                        openModals={openModals}
                        dictionaries={dictionaries}
                        onOpen={handleOpenModal}
                        onClose={handleCloseModal}
                        onSelect={handleSelect}
                    />
                ))}
            </div>
        </PageLayout>
    );
};

export default OrderPage;
