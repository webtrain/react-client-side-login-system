import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import Avatar from '../images/avatar.svg';

const UserDetails = () => {
  const {
    state: { userInfo },
    loading,
    error,
  } = useContext(AppContext);
  

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>Error... 🤢</h1>
      ) : (
        <div className="container">
          <div className="section pb-3">
            <Link to="/dashboard" className="button is-light">
              <i className="fas fa-angle-left mr-2"></i>
              Back
            </Link>
          </div>
          <section className="section">
            <div className="columns is-centered">
              <div className="column is-half">
                <div className="card">
                  <div className="card-image">
                    <figure className="image">
                      <img src={Avatar} alt="avatar" />
                    </figure>
                  </div>
                  <div className="card-content">
                    <p className="is-size-2 has-text-centered">{userInfo.name}</p>
                    <div className="is-flex is-justify-content-space-between mb-2">
                      <p className="is-size-4">Username:</p>
                      <p className="is-size-4">{userInfo.username}</p>
                    </div>
                    <div className="is-flex is-justify-content-space-between mb-2">
                      <p className="is-size-4">Email:</p>
                      <p className="is-size-4">{userInfo.email}:</p>
                    </div>
                    <div className="is-flex is-justify-content-space-between mb-2">
                      <p className="is-size-4">Phone:</p>
                      <p className="is-size-4">{userInfo.phone}</p>
                    </div>
                    <div className="is-flex is-justify-content-space-between mb-2">
                      <p className="is-size-4">Website:</p>
                      <p className="is-size-4">{userInfo.website}</p>
                    </div>
                    <div>
                      <p className="is-size-4">Address:</p>
                      <div className="is-flex is-justify-content-space-between pl-5 mb-1">
                        <p className="is-size-6">City:</p>
                        <p className="is-size-6">{userInfo.address.city}</p>
                      </div>
                      <div className="is-flex is-justify-content-space-between pl-5 mb-1">
                        <p className="is-size-6">Street:</p>
                        <p className="is-size-6">{userInfo.address.street}</p>
                      </div>
                      <div className="is-flex is-justify-content-space-between pl-5 mb-1">
                        <p className="is-size-6">Suite:</p>
                        <p className="is-size-6">{userInfo.address.suite}</p>
                      </div>
                      <div className="is-flex is-justify-content-space-between pl-5 mb-1">
                        <p className="is-size-6">Zip Code:</p>
                        <p className="is-size-6">{userInfo.address.zipcode}</p>
                      </div>
                    </div>

                    <div>
                      <p className="is-size-4">Company:</p>
                      <div className="is-flex is-justify-content-space-between pl-5 mb-1">
                        <p className="is-size-6">Name:</p>
                        <p className="is-size-6">{userInfo.company.name}</p>
                      </div>
                      <div className="is-flex is-justify-content-space-between pl-5 mb-1">
                        <p className="is-size-6">CatchPhrase:</p>
                        <p className="is-size-6">{userInfo.company.catchPhrase}</p>
                      </div>
                      <div className="is-flex is-justify-content-space-between pl-5 mb-1">
                        <p className="is-size-6">Bs:</p>
                        <p className="is-size-6">{userInfo.company.bs}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default UserDetails;
