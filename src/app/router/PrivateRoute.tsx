import type { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/shared/hooks/useAuthReturn';

const PrivateRoute = (): ReactNode => {
    // const { isAuthenticated } = useAuth();
    const isAuthenticated = true

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
