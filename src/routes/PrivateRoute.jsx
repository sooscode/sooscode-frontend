// routes/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from "@/hooks/useUser.js";

const PrivateRoute = ({ allowedRoles }) => {
    const { user } = useUser();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/error/403" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;