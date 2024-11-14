import { Routes, Route, BrowserRouter, Navigate  } from "react-router-dom";
import LoginComponent from "../components/LoginComponent";
import UserComponent from '../components/UserComponent';
import PrivateRoute from "./PrivateRoute";
import LogComponent from '../components/LogComponent';
import HomeComponent from "../components/HomeComponent";
// import { useContext } from 'react';
// import { UserContext } from '../hooks/authContext';

const AppRoute = () => {
    // const { user } = useContext(UserContext);

    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/business/home" replace />} />
                {/* <Route path="/" element={user.auth ? (
                    <Navigate to="/business/home" replace />
                    ) : (
                    <Navigate to="/login" replace />
                    )
                } /> */}
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/business/*" element={<PrivateRoute />} >
                    <Route path="home" element={<HomeComponent />} />
                    <Route path="user/:userId" element={<UserComponent />} />
                    <Route path="user" element={<UserComponent />} />
                    <Route path="log" element={<LogComponent />} />
                </Route>
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default AppRoute