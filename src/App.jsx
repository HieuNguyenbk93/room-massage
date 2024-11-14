import './App.css'
import { useContext } from 'react'
import { UserContext } from './hooks/authContext'
import AppRoute from './routers/AppRoute'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// import Login from './components/Login';

function App() {
  // eslint-disable-next-line no-unused-vars
  const { user, logout } = useContext(UserContext);

  // const onPressLogout = () => {
  //   console.log(user);

  // }
  
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/Login">Manage Rooms</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"> 
            {/* style="--bs-scroll-height: 100px;"> */}
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/business/home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/business/log">Log</a>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <>{user.name ? <span>Xin chào {user.name} &nbsp;</span> : ''}</>
            <button className="btn btn-outline-success" onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    </nav>
    <div className="container">
      <AppRoute />
    </div>
    <ToastContainer
      position='bottom-right'
    />
    </>
  )
}

export default App
