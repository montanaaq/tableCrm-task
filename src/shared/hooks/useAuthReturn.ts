import { useCallback, useEffect, useState } from 'react'
import { tableCrmApi } from '@/services/api/tableCrm.service'

interface UseAuthReturn {
    token: string | null
    isAuthenticated: boolean
    setToken: (token: string) => Promise<void>
    logout: () => void
}

const TOKEN_KEY = 'userToken'

const normalizeToken = (value: string | null | undefined): string | null => {
    if (value === undefined || value === null || value === '') {
        return null
    }
    if (typeof value === 'string' && value.trim().length > 0) {
        return value.trim()
    }
    return null
}

export const useAuth = (): UseAuthReturn => {
    const [token, setTokenState] = useState<string | null>(() => {
        const stored = sessionStorage.getItem(TOKEN_KEY)
        return normalizeToken(stored)
    })

    const isAuthenticated = token !== null

    const setToken = useCallback(async (newToken: string) => {
        const normalized = normalizeToken(newToken)
        if (normalized === null) {
            throw new Error('Token cannot be empty')
        }

        try {
            await tableCrmApi.validateToken(normalized)
            sessionStorage.setItem(TOKEN_KEY, normalized)
            setTokenState(normalized)
        } catch (error: any) {
            if (error?.response?.status === 403) {
                throw new Error('Неверный токен')
            }
            throw new Error('Ошибка при проверке токена')
        }
    }, [])

    const logout = useCallback(() => {
        sessionStorage.removeItem(TOKEN_KEY)
        setTokenState(null)
    }, [])

    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === TOKEN_KEY) {
                setTokenState(normalizeToken(e.newValue))
            }
        }

        window.addEventListener('storage', handleStorageChange)
        return () => window.removeEventListener('storage', handleStorageChange)
    }, [])

    return {
        token,
        isAuthenticated,
        setToken,
        logout
    }
}