import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import {jwtDecode} from 'jwt-decode';

const UserContext = createContext({name: '', auth: false});

// eslint-disable-next-line react/prop-types
const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if the token is expired
  const isTokenExpired = (token) => {
    try {
      const { exp } = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return currentTime > exp; // Token is expired if the current time exceeds expiration
    } catch (error) {
      console.error("Error decoding token:", error);
      return true; // Assume expired on error
    }
  };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const authToken = localStorage.getItem('authtoken');

        if (storedUser && authToken) {
            console.log(isTokenExpired(authToken))
            if (isTokenExpired(authToken)) {
                // console.log('hết hạn');
                auth.onAuthStateChanged(async (currentUser) => {
                    console.log(currentUser);
                    const refreshedToken = await currentUser.getIdToken(true);
                    login(currentUser, refreshedToken);
                })
            }
            else {
                const _user = JSON.parse(storedUser);
                setUser(_user);
            }
        }
        setLoading(false);
    }, []);

    const login = (user, authtoken) => {
        const _userSave = {
            name: user.displayName,
            email: user.email,
            photo: user.photoURL
        }
        setUser(_userSave);
        localStorage.setItem('user', JSON.stringify(_userSave));
        localStorage.setItem('authtoken', JSON.stringify(authtoken));
    };

    const logout = () => {
        const firebaseSignOut = async () => {
            await auth.signOut();
        }
        firebaseSignOut();
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('authtoken');
    };

    return (
        <UserContext.Provider value={{user, loading, login, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };