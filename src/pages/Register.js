import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { register } from '../app/actions/authActions';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const {
    state: { alert, loading, success },
    dispatch,
    users,
    AUTH,
  } = useContext(AppContext);

  const history = useHistory();

  const [registerInput, setRegisterInput] = useState({ name: '', email: '', password: '', cf_password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegisterInput({ ...registerInput, [name]: value });

    dispatch({ type: AUTH.RESET });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(registerInput, users, dispatch);
  };
  useEffect(() => {
    success && history.push('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  return (
    <>
      <div className="container">
        <div className="section">
          <div className="columns is-6-tablet is-centered">
            <form className="box column is-one-third" onSubmit={handleSubmit}>
              <h2 className="title is-4 has-text-centered mt-2">Register</h2>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input className="input" type="text" name="name" placeholder="Your name" onChange={handleChange} />
                </div>
                <small className="has-text-danger">{alert && alert.name && alert.name}</small>
              </div>

              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input className="input" type="email" name="email" placeholder="Your email" onChange={handleChange} />
                </div>
                <small className="has-text-danger">{alert && alert.email && alert.email}</small>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    name="password"
                    placeholder="********"
                    onChange={handleChange}
                  />
                </div>
                <small className="has-text-danger">{alert && alert.password && alert.password}</small>
              </div>

              <div className="field">
                <label className="label">Confirm Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    name="cf_password"
                    placeholder="********"
                    onChange={handleChange}
                  />
                </div>
                <small className="has-text-danger">{alert && alert.cf_password && alert.cf_password}</small>
              </div>

              <button className={`button is-primary is-fullwidth ${loading ? 'is-loading' : ''}`}>Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
