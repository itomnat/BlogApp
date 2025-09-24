import { useContext } from 'react';
import {Outlet, useNavigate} from 'react-router-dom'
import Home from '../GeneralScreens/Home';
import { AuthContext } from "../../Context/AuthContext";
import Loader from '../GeneralScreens/Loader';

const PrivateRoute = () => {
    const navigate = useNavigate()
    const { isAuthenticated, isLoading } = useContext(AuthContext)

    // Show loading spinner while checking authentication
    if (isLoading) {
        return <Loader />
    }

    // If not authenticated, redirect to home with error message
    if (!isAuthenticated) {
        navigate("/", { replace: true })
        return <Home error="You are not authorized please login" />
    }

    // If authenticated, render the protected route
    return <Outlet />
}

export default PrivateRoute;
