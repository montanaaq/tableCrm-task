import { valibotResolver } from '@hookform/resolvers/valibot';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import * as v from 'valibot';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/shared/hooks/useAuthReturn';
import PageLayout from '../layout/PageLayout';

const authSchema = v.object({
    token: v.pipe(
        v.string('Токен должен быть строкой'),
        v.trim(),
        v.minLength(10, 'Токен должен быть больше 10 символов'),
    )
});

type AuthInputs = v.InferOutput<typeof authSchema>;

const AuthPage: FC = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<AuthInputs>({
        resolver: valibotResolver(authSchema)
    });
    const { setToken, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/order', { replace: true });
            toast.success('Вы успешно вошли в аккаунт!');
        }
    }, [isAuthenticated, navigate]);

    const onSubmit = async (data: AuthInputs) => {
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
                        {...register('token')}
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
