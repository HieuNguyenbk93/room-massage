import { useContext } from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from '../hooks/authContext';

const PrivateRoute = () => {
    const { user, loading } = useContext(UserContext);
    console.log('>>>Private route', user);
    if (loading) {
        return <div>Loading ...</div>
    }

    return user ? <Outlet /> : <Navigate to="/login" replace/>;
}

export default PrivateRoute;