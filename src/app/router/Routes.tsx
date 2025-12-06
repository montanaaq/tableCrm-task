import {
    type ComponentType,
    type LazyExoticComponent,
    lazy,
    type ReactElement,
    Suspense
} from 'react';
import type { RouteObject } from 'react-router';
import { Spinner } from '@/components/ui/spinner';
import PrivateRoute from './PrivateRoute';

const withSuspense = (
    Component: LazyExoticComponent<ComponentType>
): ReactElement => (
    <Suspense fallback={<Spinner />}>
        <Component />
    </Suspense>
);

const App = lazy(() => import('@/app/App'));
const AuthPage = lazy(() => import('@/app/pages/AuthPage'));
const OrderPage = lazy(() => import('@/app/pages/OrderPage'));
const NotFoundPage = lazy(() => import('@/app/pages/NotFoundPage'));

export const routes: RouteObject[] = [
    {
        path: '/',
        element: withSuspense(App)
    },
    {
        path: '/auth',
        element: withSuspense(AuthPage)
    },
    {
        path: '/order',
        element: <PrivateRoute />,
        children: [
            {
                index: true,
                element: withSuspense(OrderPage)
            }
        ]
    },
    {
        path: '*',
        Component: NotFoundPage
    }
];
