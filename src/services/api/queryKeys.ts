export const queryKeys = {
    // Заказы
    orders: (token: string) => ['orders', token] as const,
    order: (token: string, id: number) => ['orders', token, id] as const,

    // Справочники
    contragents: (token: string, search?: string, phone?: string) =>
        ['contragents', token, { search, phone }] as const,
    warehouses: (token: string) => ['warehouses', token] as const,
    payboxes: (token: string) => ['payboxes', token] as const,
    organizations: (token: string) => ['organizations', token] as const,
    priceTypes: (token: string) => ['priceTypes', token] as const,
    nomenclature: (token: string, search?: string) =>
        ['nomenclature', token, { search }] as const
};
