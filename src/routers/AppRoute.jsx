import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import PrivateRoute from "./PrivateRoute";

const AppRoute = () => {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/business/*" element={<PrivateRoute />} />
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default AppRoute