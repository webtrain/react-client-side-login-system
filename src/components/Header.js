import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { logout } from '../app/actions/authActions';
import { AppContext } from '../context/AppContext';
import Message from '../components/Message';

const Header = () => {
  const [isActive, setIsactive] = useState(false);

  const history = useHistory();
  const location = useLocation();
  

  const { state, dispatch, state: {userInfo} } = useContext(AppContext);

  const authToken = sessionStorage.getItem('loggedIn');

  useEffect(() => {
    authToken ? history.push('/dashboard') : history.push('/');
  }, [authToken, dispatch, history]);

  const handleLogout = () => {
    logout(dispatch);
    history.push('/login');
  };

   const showUserDetails = (id) => {
     history.push(`user/${id}`);
   };

  return (
    <>
      <div>
        <nav className={`navbar ${authToken && 'is-primary'}`} role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="logo" />
            </Link>

            <div
              to=""
              role="button"
              className="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
              onClick={() => setIsactive(!isActive)}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </div>
          </div>

          <div id="navbarBasicExample" className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
            <div className="navbar-start"></div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  {authToken ? (
                    <>
                      {!location.pathname.includes('album') && <button className="button is-primary" onClick={() =>showUserDetails(userInfo.id)}>
                        <span className="icon">
                          <i className="fas fa-user"></i>
                        </span>
                        <strong>UserDetails</strong>
                      </button>}

                      <button to="/login" className="button is-primary" onClick={handleLogout}>
                        <span className="icon">
                          <i className="fas fa-sign-out-alt"></i>
                        </span>
                        <strong>Logout</strong>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/register" className="button is-primary">
                        <strong>Sign up</strong>
                      </Link>
                      <Link to="/login" className="button is-light">
                        Log in
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      {state.error && <Message variant="danger" message={state.msg} loginPage={true} />}
      {state.success && <Message variant="success" message={state.msg} loginPage={true} />}
    </>
  );
};

export default Header;
