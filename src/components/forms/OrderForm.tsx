import type { FC } from 'react';
import { OrderCreateButton } from '@/components/OrderCreateButton';
import RenderDialog from '@/components/renders/RenderDialog';
import RenderField from '@/components/renders/RenderField';
import { FIELD_CONFIG } from '@/shared/constants/dialogs.constant';
import type { useOrderForm } from '@/shared/hooks/useOrderForm';
import type { FieldKey } from '@/shared/types/types';

interface OrderFormProps {
    formState: ReturnType<typeof useOrderForm>;
}

export const OrderForm: FC<OrderFormProps> = ({ formState }) => {
    const {
        selectedValues,
        openModals,
        dictionaries,
        isCreatingOrder,
        handleOpenModal,
        handleCloseModal,
        handleSelect,
        handleCreateOrder
    } = formState;

    return (
        <div className="space-y-4">
            {FIELD_CONFIG.map(field => (
                <RenderField
                    key={field.key}
                    fieldKey={field.key as FieldKey}
                    label={field.label}
                    value={selectedValues[field.key as FieldKey]}
                    onClick={() => handleOpenModal(field.key as FieldKey)}
                />
            ))}

            <div className="pt-6 space-y-2">
                <OrderCreateButton
                    buttonText="Создать продажу"
                    createOrder={() => handleCreateOrder(false)}
                    isLoading={isCreatingOrder}
                />
                <OrderCreateButton
                    buttonText="Создать и провести"
                    createOrder={() => handleCreateOrder(true)}
                    isLoading={isCreatingOrder}
                    variant="outline"
                />
            </div>

            {FIELD_CONFIG.map(field => (
                <RenderDialog
                    key={field.key}
                    field={field}
                    openModals={openModals}
                    dictionaries={dictionaries}
                    selectedValues={selectedValues}
                    onOpen={handleOpenModal}
                    onClose={handleCloseModal}
                    onSelect={handleSelect}
                />
            ))}
        </div>
    );
};
