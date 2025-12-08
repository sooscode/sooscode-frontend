import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/services/api';
import { useUser } from '@/hooks/useUser';
import { useToast } from '@/hooks/useToast';

const useLogout = () => {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    /* 공용 훅 사용중 */
    const { clearUser } = useUser();
    const toast = useToast();

    const logout = async () => {
        setLoading(true);

        try {
            await api.post('/api/auth/logout');
        } catch (err) {
            // 서버 에러여도 무시
        } finally {
            clearUser();
            toast.success('로그아웃 되었습니다.');
            navigate('/login');
            setLoading(false);
        }
    };

    return {
        logout,
        loading,
    };
};

export default useLogout;