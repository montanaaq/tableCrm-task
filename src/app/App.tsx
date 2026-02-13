import { type FC, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/shared/hooks/useAuthReturn';

const App: FC = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/auth', { replace: true });
        } else {
            navigate('/order', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    return <div></div>;
};

export default App;
