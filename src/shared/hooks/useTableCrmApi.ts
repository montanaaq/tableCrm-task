import { useQuery, useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query'
import { tableCrmApi} from '@/services/api/tableCrm.service'
import type { CreateOrderPayload, IDictionaries, Order } from '@/shared/types/types'
import { queryKeys } from '@/services/api/queryKeys'
import { useAuth } from './useAuthReturn'

type UseTableCrmApiResult = {
    dictionaries: IDictionaries;

    orders: {
        data: any[];
        isLoading: boolean;
        error: Error | null;
        refetch: () => void;
    };

    createOrderMutation: UseMutationResult<Order[], Error, CreateOrderPayload, unknown>

    createOrder: (payload: CreateOrderPayload) => unknown;
    createOrderAsync: (payload: CreateOrderPayload) => Promise<unknown>;

    isCreatingOrder: boolean;
    createOrderError: Error | null;
};

export const useTableCrmApi = (): UseTableCrmApiResult => {
    const { token } = useAuth()
    const queryClient = useQueryClient()

    // ============= Queries =============

    const warehouses = useQuery({
        queryKey: queryKeys.warehouses(token || ''),
        queryFn: () => tableCrmApi.getWarehouses(token!), 
        enabled: !!token
    })

    const payboxes = useQuery({
        queryKey: queryKeys.payboxes(token || ''),
        queryFn: () => tableCrmApi.getPayboxes(token!), 
        enabled: !!token
    })

    const organizations = useQuery({
        queryKey: queryKeys.organizations(token || ''),
        queryFn: () => tableCrmApi.getOrganizations(token!), 
        enabled: !!token
    })

    const priceTypes = useQuery({
        queryKey: queryKeys.priceTypes(token || ''),
        queryFn: () => tableCrmApi.getPriceTypes(token!), 
        enabled: !!token
    })

    const nomenclatures = useQuery({
        queryKey: queryKeys.nomenclature(token || ""),
        queryFn: () => tableCrmApi.getNomenclature(token!),
        enabled: !!token
    })

    const orders = useQuery({
        queryKey: queryKeys.orders(token || ''),
        queryFn: () => tableCrmApi.getOrders(token!),
        enabled: !!token
    })

    // ============= MUTATIONS =============

    const createOrderMutation = useMutation({
        mutationFn: (payload: CreateOrderPayload) => 
            tableCrmApi.createOrder(token!, payload), 
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.orders(token || ''),
            })
        },
    })

    // ============= COMPUTED VALUES =============

    const isLoadingDictionaries =
        warehouses.isLoading ||
        payboxes.isLoading ||
        organizations.isLoading ||
        priceTypes.isLoading ||
        nomenclatures.isLoading

    const dictionariesError =
        warehouses.error ||
        payboxes.error ||
        organizations.error ||
        priceTypes.error ||
        nomenclatures.error

    return {
        dictionaries: {
            warehouses: warehouses.data?.result ?? [],
            payboxes: payboxes.data?.result ?? [],
            organizations: organizations.data?.result ?? [],
            priceTypes: priceTypes.data?.result ?? [],
            nomenclatures: nomenclatures.data?.result ?? [],

            isLoading: isLoadingDictionaries,
            error: dictionariesError,

            refetch: () => {
                warehouses.refetch()
                payboxes.refetch()
                organizations.refetch()
                priceTypes.refetch()
                nomenclatures.refetch()
            },
        },

        orders: {
            data: orders.data?.result ?? [],
            isLoading: orders.isLoading,
            error: orders.error,
            refetch: orders.refetch,
        },

        createOrderMutation,

        createOrder: createOrderMutation.mutate,
        createOrderAsync: createOrderMutation.mutateAsync,
        isCreatingOrder: createOrderMutation.isPending,
        createOrderError: createOrderMutation.error,
    }
}