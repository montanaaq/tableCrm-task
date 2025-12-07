import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import type { Contragent } from '@/shared/types/types';

interface RenderFieldProps {
    fieldKey: string;
    label: string;
    value: any;
    onClick: () => void;
}

const RenderField: FC<RenderFieldProps> = ({
    fieldKey,
    label,
    value,
    onClick
}) => {
    const renderValue = () => {
        if (!value) return null;

        if (Array.isArray(value)) {
            return (
                <div className="mt-2 p-4 border rounded-lg">
                    <p className="font-semibold mb-2">
                        Выбрано товаров: {value.length}
                    </p>
                    {value.length > 0 && (
                        <div className="space-y-1">
                            {value.slice(0, 3).map((item: any) => (
                                <p
                                    key={item.id}
                                    className="text-sm text-gray-600"
                                >
                                    • {item.name}
                                </p>
                            ))}
                            {value.length > 3 && (
                                <p className="text-sm text-gray-500">
                                    и еще {value.length - 3}...
                                </p>
                            )}
                        </div>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClick}
                        className="mt-2"
                    >
                        Изменить
                    </Button>
                </div>
            );
        }

        if (fieldKey === 'client') {
            const client = value as Contragent;
            return (
                <div className="mt-2 flex items-center justify-between p-4 border rounded-lg">
                    <div>
                        <p className="font-semibold text-md">{client.name}</p>
                        <p className="text-md text-gray-600">{client.phone}</p>
                    </div>
                    <Button variant="outline" size="lg" onClick={onClick}>
                        Изменить
                    </Button>
                </div>
            );
        }

        return (
            <div className="mt-2 flex items-center justify-between p-4 border rounded-lg">
                <p className="font-semibold">{value.name || value.work_name}</p>
                <Button variant="ghost" size="lg" onClick={onClick}>
                    Изменить
                </Button>
            </div>
        );
    };

    return (
        <div>
            <Label className="text-md font-semibold">{label} *</Label>
            {value ? (
                renderValue()
            ) : (
                <Button
                    variant="outline"
                    className="w-full mt-2 text-md"
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
