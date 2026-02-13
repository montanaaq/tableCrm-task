import type { FC } from 'react';
import { OrderForm } from '@/components/forms/OrderForm';
import { Button } from '@/components/ui/button';
import { useOrderForm } from '@/shared/hooks/useOrderForm';
import PageLayout from '../layout/PageLayout';

const OrderPage: FC = () => {
    const formState = useOrderForm();

    return (
        <PageLayout>
            <Button
                className="absolute top-8 right-8 text-md"
                onClick={formState.handleLogout}
            >
                Выйти
            </Button>

            <div className="max-w-xl mx-auto p-2">
                <h2 className='text-xl font-bold mb-3'>Создать заказ</h2>
                <OrderForm formState={formState} />
            </div>
        </PageLayout>
    );
};

export default OrderPage;
