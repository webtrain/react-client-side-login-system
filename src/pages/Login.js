import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { login } from '../app/actions/authActions';

const Login = () => {
  const { state, dispatch, users } = useContext(AppContext);
  const { loading, userInfo } = state;

  const [loginInput, setLoginInput] = useState({ email: '', password: '' });

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    login(users, loginInput, dispatch);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginInput({ ...loginInput, [name]: value });
  };

  return (
    <>
      {!userInfo.id && (
        <div className="container">
          <div className="section">
            <div className="columns is-6-tablet is-centered">
              <form className="box column is-one-third" onSubmit={handleSubmit}>
                <h1 className="title is-4 has-text-centered mt-2" data-testid="login">
                  Login
                </h1>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      className="input"
                      type="email"
                      name="email"
                      placeholder="e.g. alex@example.com"
                      value={loginInput.email}
                      onChange={handleChange}
                      data-testid="email"
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      name="password"
                      placeholder="********"
                      value={loginInput.password}
                      onChange={handleChange}
                      data-testid="password"
                    />
                  </div>
                </div>

                <button
                  className={`button is-primary is-fullwidth ${loading ? 'is-loading' : ''}`}
                  data-testid="loginButton"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
