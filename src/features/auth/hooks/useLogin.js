import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/services/api';
import { useUser } from '@/hooks/useUser';
import { useToast } from '@/hooks/useToast';

const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    /* 공용 훅 사용중 */
    const { setUser } = useUser();
    const toast = useToast();

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const { data } = await api.post('/api/auth/login', {
                email,
                password,
            });
            console.log("[data.user]", data.user);

            setUser(data.user);
            toast.success('로그인 성공!');
            navigate('/');
        } catch (err) {
            const errorMessage = err.response?.data?.message || '로그인에 실패했습니다.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        onSubmit,
    };
};

export default useLogin;