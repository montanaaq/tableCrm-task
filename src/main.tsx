import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import Router from './app/router/Routes';

import './index.css';
import { StrictMode } from 'react';
import { Toaster } from 'sonner';

createRoot(
    document.getElementById('root') || document.createElement('div')
).render(
    <StrictMode>
        <BrowserRouter>
            <Router />
            <Toaster
                expand
                visibleToasts={4}
                position="bottom-right"
                richColors
            />
        </BrowserRouter>
    </StrictMode>
);
