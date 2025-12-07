import { Button } from '@/components/ui/button';
import type { CreateOrderPayload } from '@/shared/types/types';

type Props = {
    payload: CreateOrderPayload;
    createOrder: (payload: CreateOrderPayload) => void;
    isLoading: boolean;
    buttonText: string
};

export const OrderCreateButton = ({
    payload,
    createOrder,
    isLoading,
    buttonText
}: Props) => {
    return (
        <Button
            className="w-full text-md"
            size="lg"
            disabled={isLoading}
            onClick={() => createOrder(payload)}
        >
            {isLoading ? 'Создание...' : buttonText}
        </Button>
    );
};
