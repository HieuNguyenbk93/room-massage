import { useContext } from 'react'
import { Navigate, Outlet } from "react-router-dom";
// import ListUsersComponent from "../components/ListUsersComponent";
// import HomeComponent from "../components/HomeComponent";
import { UserContext } from '../hooks/authContext';
// import UserComponent from '../components/UserComponent';
// import LogComponent from '../components/LogComponent';

const PrivateRoute = () => {
    const { user } = useContext(UserContext);

    // if (user && !user.auth) {
    //     console.log('>>> Private');
    //     return <Navigate to="/login" replace/>
    // }

    // return (
    //     <Routes>
    //         <Route path="/" element={<HomeComponent />} />
    //         <Route path="/user" element={<UserComponent />} />
    //         <Route path="/user/:userId" element={<UserComponent />} />
    //         {/* <Route path="/users" element={<ListUsersComponent />} /> */}
    //         <Route path="/log" element={<LogComponent />} />
    //     </Routes>
    // )

    return user.auth ? <Outlet /> : <Navigate to="/login" replace/>;
}

export default PrivateRoute;