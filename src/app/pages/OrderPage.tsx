import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { FC } from 'react';
import { OrderForm } from '@/components/forms/OrderForm';
import { Button } from '@/components/ui/button';
import { useOrderForm } from '@/shared/hooks/useOrderForm';
import PageLayout from '../layout/PageLayout';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1
        }
    }
});

const OrderPageContent: FC = () => {
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
                <h2 className="text-xl font-bold mb-3">Создать заказ</h2>
                <OrderForm formState={formState} />
            </div>
        </PageLayout>
    );
};

const OrderPage: FC = () => (
    <QueryClientProvider client={queryClient}>
        <OrderPageContent />
    </QueryClientProvider>
);

export default OrderPage;
