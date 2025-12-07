import { Button } from '@/components/ui/button';

type Props = {
    createOrder: () => void;
    isLoading: boolean;
    buttonText: string;
    variant?: 'default' | 'outline';
};

export const OrderCreateButton = ({
    createOrder,
    isLoading,
    buttonText,
    variant = 'default'
}: Props) => {
    return (
        <Button
            className="w-full text-md"
            size="lg"
            variant={variant}
            disabled={isLoading}
            onClick={createOrder}
        >
            {isLoading ? 'Создание...' : buttonText}
        </Button>
    );
};
