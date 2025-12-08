// routes/PublicRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from "@/hooks/useUser.js";

const PublicRoute = () => {
    const { user } = useUser();

    if (user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;