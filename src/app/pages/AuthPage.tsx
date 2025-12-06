import type { FC } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/shared/hooks/useAuthReturn';
import PageLayout from '../layout/PageLayout';

interface Inputs {
    token: string;
}

const AuthPage: FC = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<Inputs>();
    const { setToken, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/order', { replace: true });
            toast.success('Вы успешно вошли в аккаунт!');
        }
    }, [isAuthenticated, navigate]);

    const onSubmit = async (data: Inputs) => {
        try {
            await setToken(data.token);
        } catch (e) {
            const message = e instanceof Error ? e.message : 'Произошла ошибка';
            toast.error(message);
        }
    };

    return (
        <PageLayout>
            <div className="flex items-center justify-center flex-col gap-6 w-80 mb-20">
                <h1 className="text-3xl font-bold mb-6">
                    Вход при помощи токена
                </h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full flex flex-col gap-2"
                >
                    <Input
                        {...register('token', {
                            required: 'Токен обязателен',
                            minLength: {
                                value: 10,
                                message:
                                    'Токен должен содержать минимум 10 символов'
                            },
                            validate: {
                                notEmpty: value =>
                                    value.trim().length > 0 ||
                                    'Токен не может быть пустым'
                            }
                        })}
                        placeholder="Введите ваш токен"
                        className="h-12 placeholder:text-lg"
                        autoComplete="off"
                        disabled={isSubmitting}
                    />
                    {errors.token && (
                        <p className="w-full m-0 text-red-500 text-sm text-left">
                            {errors.token.message}
                        </p>
                    )}
                    <Button
                        className="w-full text-lg font-medium mt-4"
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Проверка токена...' : 'Войти'}
                    </Button>
                </form>
            </div>
        </PageLayout>
    );
};

export default AuthPage;
