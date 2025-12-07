import type { FC, ReactNode } from 'react';
import Logo from '@/components/ui/Logo';

interface PageLayoutProps {
    children: ReactNode;
    className?: string;
}

const PageLayout: FC<PageLayoutProps> = ({ children, className }) => {
    return (
        <div
            className={`h-auto w-full flex items-center-safe justify-center-safe px-6 py-20 ${className}`}
        >
            <Logo />
            {children}
        </div>
    );
};

export default PageLayout;
