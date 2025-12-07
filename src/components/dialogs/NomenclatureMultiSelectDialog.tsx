import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
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
import type { Nomenclature } from '@/shared/types/types';

interface NomenclatureMultiSelectDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: Nomenclature[];
    isLoading?: boolean;
    error?: Error | null;
    selectedItems: Nomenclature[];
    onSave: (items: Nomenclature[]) => void;
}

export function NomenclatureMultiSelectDialog({
    open,
    onOpenChange,
    data,
    isLoading,
    error,
    selectedItems,
    onSave
}: NomenclatureMultiSelectDialogProps) {
    const [search, setSearch] = useState('');
    const [localSelected, setLocalSelected] = useState<Nomenclature[]>([]);

    useEffect(() => {
        if (open) {
            setLocalSelected(selectedItems);
        }
    }, [open, selectedItems]);

    const filteredData = search
        ? data.filter(item =>
              item.name.toLowerCase().includes(search.toLowerCase())
          )
        : data;

    const isSelected = (item: Nomenclature) =>
        localSelected.some(i => i.id === item.id);

    const handleToggle = (item: Nomenclature) => {
        setLocalSelected(prev => {
            if (isSelected(item)) {
                return prev.filter(i => i.id !== item.id);
            }
            return [...prev, item];
        });
    };

    const handleSave = () => {
        onSave(localSelected);
        onOpenChange(false);
    };

    const handleCancel = () => {
        setLocalSelected(selectedItems);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleCancel}>
            <DialogContent className="sm:max-w-[500px] max-h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Выбрать товары</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4 flex-1 overflow-hidden">
                    <Input
                        placeholder="Поиск товаров..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />

                    <div className="flex-1 overflow-y-auto space-y-2">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                            </div>
                        ) : error ? (
                            <div className="text-center py-8 text-red-500">
                                Ошибка: {error.message}
                            </div>
                        ) : filteredData.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                Товары не найдены
                            </div>
                        ) : (
                            filteredData.map(item => {
                                const selected = isSelected(item);
                                return (
                                    <Button
                                        key={item.id}
                                        variant={
                                            selected ? 'default' : 'outline'
                                        }
                                        className="w-full justify-start"
                                        onClick={() => handleToggle(item)}
                                    >
                                        {item.name}
                                    </Button>
                                );
                            })
                        )}
                    </div>
                </div>

                <DialogFooter className="flex gap-2">
                    <DialogClose asChild>
                        <Button variant="outline" onClick={handleCancel}>
                            Отмена
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={handleSave}
                        disabled={localSelected.length === 0}
                    >
                        Сохранить ({localSelected.length})
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
