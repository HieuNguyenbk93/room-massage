import './App.css'
import { useContext } from 'react'
import { UserContext } from './hooks/authContext'
import AppRoute from './routers/AppRoute'
import 'bootstrap/dist/css/bootstrap.min.css';
// import Login from './components/Login';

function App() {
  // eslint-disable-next-line no-unused-vars
  const { user } = useContext(UserContext);
  
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
              <a className="nav-link active" aria-current="page" href="/business/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/business/user">User</a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <button className="btn btn-outline-success" type="submit">Logout</button>
          </form>
        </div>
      </div>
    </nav>
    <div className="container">
      <AppRoute />
    </div>
    </>
  )
}

export default App