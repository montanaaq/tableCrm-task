import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface BaseSelectDialogProps<T> {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: string;
    data: T[];
    isLoading?: boolean;
    error?: Error | null;
    onSelect: (item: T) => void;
    renderItem: (item: T) => React.ReactNode;
    searchable?: boolean;
    searchPlaceholder?: string;
    getSearchValue?: (item: T) => string;
    emptyMessage?: string;
}

export function BaseSelectDialog<T>({
    open,
    onOpenChange,
    title,
    description,
    data,
    isLoading,
    error,
    onSelect,
    renderItem,
    searchable = false,
    searchPlaceholder = 'Поиск...',
    getSearchValue,
    emptyMessage = 'Ничего не найдено'
}: BaseSelectDialogProps<T>) {
    const [search, setSearch] = useState('');

    const filteredData =
        searchable && search && getSearchValue
            ? data.filter(item =>
                  getSearchValue(item)
                      .toLowerCase()
                      .includes(search.toLowerCase())
              )
            : data;

    const handleSelect = (item: T) => {
        onSelect(item);
        onOpenChange(false);
        setSearch('');
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] max-h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}
                </DialogHeader>

                <div className="flex flex-col gap-4 flex-1 overflow-hidden">
                    {searchable && (
                        <Input
                            placeholder={searchPlaceholder}
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    )}

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
                                {emptyMessage}
                            </div>
                        ) : (
                            filteredData.map((item, index) => (
                                <button
                                    key={(item as any).id || index}
                                    onClick={() => handleSelect(item)}
                                    onKeyDown={e => {
                                        if (
                                            e.key === 'Enter' ||
                                            e.key === ' '
                                        ) {
                                            e.preventDefault();
                                            handleSelect(item);
                                        }
                                    }}
                                    type="button"
                                    className="w-full text-left focus:outline-none focus:ring-2 focus:ring-primary rounded"
                                >
                                    {renderItem(item)}
                                </button>
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
