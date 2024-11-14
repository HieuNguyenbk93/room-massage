import { Routes, Route, BrowserRouter, Navigate  } from "react-router-dom";
import LoginComponent from "../components/LoginComponent";
import UserComponent from '../components/UserComponent';
import PrivateRoute from "./PrivateRoute";
import LogComponent from '../components/LogComponent';
import HomeComponent from "../components/HomeComponent";

const AppRoute = () => {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
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