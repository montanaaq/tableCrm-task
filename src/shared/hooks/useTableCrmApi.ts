import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { tableCrmApi} from '@/services/api/tableCrm.service'
import type { CreateOrderPayload } from '@/shared/types/types'
import { queryKeys } from '@/services/api/queryKeys'
import { useAuth } from './useAuthReturn'

export const useTableCrmApi = () => {
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
        priceTypes.isLoading

    const dictionariesError =
        warehouses.error ||
        payboxes.error ||
        organizations.error ||
        priceTypes.error

    return {
        dictionaries: {
            warehouses: warehouses.data?.results ?? [],
            payboxes: payboxes.data?.results ?? [],
            organizations: organizations.data?.results ?? [],
            priceTypes: priceTypes.data?.results ?? [],

            isLoading: isLoadingDictionaries,
            error: dictionariesError,

            refetch: () => {
                warehouses.refetch()
                payboxes.refetch()
                organizations.refetch()
                priceTypes.refetch()
            },
        },

        orders: {
            data: orders.data?.results ?? [],
            isLoading: orders.isLoading,
            error: orders.error,
            refetch: orders.refetch,
        },

        createOrder: createOrderMutation.mutate,
        createOrderAsync: createOrderMutation.mutateAsync,
        isCreatingOrder: createOrderMutation.isPending,
        createOrderError: createOrderMutation.error,
    }
}