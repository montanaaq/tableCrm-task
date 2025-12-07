import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useContragents } from '@/shared/hooks/useContragents';
import { useDebounce } from '@/shared/hooks/useDebounce';
import type { Contragent } from '@/shared/types/types';

interface ClientSearchDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect: (client: Contragent) => void;
}

export function ClientSearchDialog({
    open,
    onOpenChange,
    onSelect
}: ClientSearchDialogProps) {
    const [phone, setPhone] = useState('');
    const debouncedPhone = useDebounce(500, phone);

    const { data, isLoading } = useContragents(
        debouncedPhone ? { phone: debouncedPhone } : undefined
    );

    const handleSelect = (client: Contragent) => {
        onSelect(client);
        onOpenChange(false);
        setPhone('');
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Поиск клиента</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Телефон клиента</Label>
                        <Input
                            id="phone"
                            placeholder="+7 (999) 999-99-99"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            autoFocus
                        />
                    </div>

                    <div className="max-h-[300px] overflow-y-auto space-y-2">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                            </div>
                        ) : data?.result.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                {debouncedPhone
                                    ? 'Клиенты не найдены'
                                    : 'Введите телефон для поиска'}
                            </div>
                        ) : (
                            data?.result.map((client: Contragent) => (
                                <Button
                                    key={client.id}
                                    variant="outline"
                                    className="w-full h-auto p-4 justify-start"
                                    onClick={() => handleSelect(client)}
                                >
                                    <div className="text-left">
                                        <p className="font-semibold">
                                            {client.name}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {client.phone}
                                        </p>
                                        {client.email && (
                                            <p className="text-sm text-gray-500">
                                                {client.email}
                                            </p>
                                        )}
                                    </div>
                                </Button>
                            ))
                        )}
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Отмена</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
