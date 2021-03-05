import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { register } from '../app/actions/authActions';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const {
    state: { alert, loading, userInfo },
    dispatch,
    users,
  } = useContext(AppContext);

  const [registerInput, setRegisterInput] = useState({ name: '', email: '', password: '', cf_password: '' });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegisterInput({ ...registerInput, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(registerInput, users, dispatch);
  };

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
                <small>{alert && alert.name && alert.name}</small>
              </div>

              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input className="input" type="email" name="email" placeholder="Your email" onChange={handleChange} />
                </div>
                <small>{alert && alert.email && alert.email}</small>
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
                <small>{alert && alert.password && alert.password}</small>
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
                <small>{alert && alert.cf_password && alert.cf_password}</small>
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
