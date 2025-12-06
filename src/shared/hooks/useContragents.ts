import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuthReturn"
import { queryKeys } from "@/services/api/queryKeys";
import { tableCrmApi } from "@/services/api/tableCrm.service";

export const useContragents = (params?: { search?: string; phone?: string }) => {
    const {token} = useAuth();

    return useQuery({
        queryKey: queryKeys.contragents(token || '', params?.search, params?.phone),
        queryFn:  () => tableCrmApi.getContragents(token!, params),
        enabled: !!token && !!(params?.search || params?.phone)
    })
}