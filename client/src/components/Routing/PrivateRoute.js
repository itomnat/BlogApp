import { useContext, useEffect } from 'react';
import {Outlet, useNavigate} from 'react-router-dom'
import Home from '../GeneralScreens/Home';
import { AuthContext } from "../../Context/AuthContext";
import Loader from '../GeneralScreens/Loader';

const PrivateRoute = () => {
    const navigate = useNavigate()
    const { isAuthenticated, isLoading } = useContext(AuthContext)

    // Handle navigation after authentication check is complete
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate("/", { replace: true });
        }
    }, [isLoading, isAuthenticated, navigate]);

    // Show loading spinner while checking authentication
    if (isLoading) {
        return <Loader />
    }

    // If not authenticated, show home with error message
    if (!isAuthenticated) {
        return <Home error="You are not authorized please login" />
    }

    // If authenticated, render the protected route
    return <Outlet />
}

export default PrivateRoute;
