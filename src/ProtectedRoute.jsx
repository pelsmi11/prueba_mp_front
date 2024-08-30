import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoadingSpinner from "./components/LoadingSpinner";

function ProtectedRoute() {
    const { loading, isAuthenticated } = useAuth();

    if(loading) 
        return 
        <LoadingSpinner />
    if (!loading && !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
}

export default ProtectedRoute;
