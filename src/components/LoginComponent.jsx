import { useContext } from 'react'
import { UserContext } from '../hooks/authContext';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const pressLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const userData = result.user;
      console.log(userData);
      const token = await userData.getIdTokenResult();
      // console.log(token);
      login(userData, token.token);
      navigate('/business/home');
    } catch (error) {
      console.error("Error during login: ", error);
    }
  }
  return (
    <>
    <h2>Login</h2>
    <button className="btn btn-primary" type="button" onClick={() => pressLogin()}>Google Sign In</button>
    </>
  )
}

export default LoginComponent