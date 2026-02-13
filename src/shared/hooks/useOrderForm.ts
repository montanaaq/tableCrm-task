import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useAuth } from '@/shared/hooks/useAuthReturn';
import { useTableCrmApi } from '@/shared/hooks/useTableCrmApi';
import type {
    CreateOrderPayload,
    FieldKey,
    SelectedValues
} from '@/shared/types/types';

const initialSelectedValues: SelectedValues = {
    client: null,
    warehouse: null,
    paybox: null,
    organization: null,
    priceType: null,
    nomenclature: []
};

const initialOpenModals: Record<FieldKey, boolean> = {
    client: false,
    warehouse: false,
    paybox: false,
    organization: false,
    priceType: false,
    nomenclature: false
};

export const useOrderForm = () => {
    const { dictionaries, isCreatingOrder, createOrderMutation } =
        useTableCrmApi();
    const { logout } = useAuth();
    const navigate = useNavigate();

    const [selectedValues, setSelectedValues] = useState<SelectedValues>(
        initialSelectedValues
    );
    const [openModals, setOpenModals] = useState<Record<FieldKey, boolean>>(
        initialOpenModals
    );

    const handleOpenModal = (key: FieldKey) => {
        setOpenModals(prev => ({ ...prev, [key]: true }));
    };

    const handleCloseModal = (key: FieldKey) => {
        setOpenModals(prev => ({ ...prev, [key]: false }));
    };

    const handleSelect = (key: FieldKey, value: any) => {
        setSelectedValues(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const createPayload = (status: boolean): CreateOrderPayload | null => {
        if (
            !selectedValues.client ||
            !selectedValues.warehouse ||
            !selectedValues.paybox ||
            !selectedValues.organization ||
            !selectedValues.priceType ||
            !selectedValues.nomenclature
        ) {
            toast.error('Заполните все обязательные поля');
            return null;
        }

        return [
            {
                priority: 0,
                dated: Math.floor(Date.now() / 1000),
                operation: 'Заказ',
                tax_included: true,
                tax_active: true,
                goods: [],
                settings: {},
                loyality_card_id: selectedValues.client.loyalty_card_id,
                warehouse: selectedValues.warehouse.id,
                contragent: selectedValues.client.id,
                paybox: selectedValues.paybox.id,
                organization: selectedValues.organization.id,
                status,
                paid_rubles: 0,
                paid_lt: 0
            }
        ];
    };

    const handleCreateOrder = (status: boolean) => {
        const payload = createPayload(status);
        if (!payload) return;

        createOrderMutation.mutate(payload, {
            onSuccess: () => {
                toast.success(
                    status ? 'Заказ создан и проведен!' : 'Заказ создан!'
                );
                setSelectedValues(initialSelectedValues);
            },
            onError: error => {
                toast.error(`Ошибка: ${error.message}`);
            }
        });
    };

    const handleLogout = () => {
        logout();
        toast.success('Вы вышли из аккаунта!');
        setTimeout(() => navigate('/auth'), 200);
    };

    return {
        selectedValues,
        openModals,
        dictionaries,
        isCreatingOrder,
        handleOpenModal,
        handleCloseModal,
        handleSelect,
        handleCreateOrder,
        handleLogout
    };
};