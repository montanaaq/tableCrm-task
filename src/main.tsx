import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import Router from './app/router/Router';

import './index.css';
import { Toaster } from 'sonner';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1
        }
    }
});

createRoot(
    document.getElementById('root') || document.createElement('div')
).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <Router />
            <Toaster
                expand
                visibleToasts={4}
                position="bottom-right"
                richColors
            />
        </BrowserRouter>
    </QueryClientProvider>
);
