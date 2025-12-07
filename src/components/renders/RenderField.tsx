import type { FC } from 'react';
import type { Contragent, FieldKey, SelectedValues } from '@/shared/types/types';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

interface RenderFieldProps {
    label: string;
    fieldKey: FieldKey;
    value: SelectedValues[FieldKey] | null;
    onClick: () => void;
}

const RenderField: FC<RenderFieldProps> = ({
    label,
    fieldKey,
    value,
    onClick
}) => {
    const renderValue = () => {
        if (!value) return null;

        if (fieldKey === 'client') {
            const client = value as Contragent;
            return (
                <>
                    <p className="font-semibold">{client.name}</p>
                    <p className="text-gray-600">{client.phone}</p>
                </>
            );
        }

        return (
            <p className="font-semibold">
                {(value as { name?: string }).name ?? 'Выбрано'}
            </p>
        );
    };

    return (
        <div>
            <Label className="text-md font-semibold">{label}*</Label>

            {value ? (
                <div className="mt-2 p-4 border rounded-lg">
                    {renderValue()}
                    <Button
                        variant="outline"
                        size="lg"
                        className="w-full mt-2"
                        onClick={onClick}
                    >
                        Изменить
                    </Button>
                </div>
            ) : (
                <Button
                    variant="outline"
                    className="w-full mt-2"
                    size="lg"
                    onClick={onClick}
                >
                    Выбрать {label.toLowerCase()}
                </Button>
            )}
        </div>
    );
};

export default RenderField;
