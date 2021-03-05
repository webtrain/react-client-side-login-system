import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Avatar from '../images/avatar.svg';

const DahsboardProfile = () => {
  const { state: { userInfo } } = useContext(AppContext)
  

  return (
    <div className="column is-4 p-3 is-half-tablet">
      <h1 className="title is-size-3 has-text-primary">Welcome</h1>
      <h2 className="subtitle pl-4 is-size-4">{userInfo.name}</h2>
      <figure className="image">
        <img className="is-rounded" src={Avatar} alt="avatar" />
      </figure>
      <div className="has-text-centered py-2 ">
        <p className="is-size-5">Username: {userInfo.username}</p>
        <p className="is-size-5">Email: {userInfo.email}</p>
        <p className="is-size-5">Phone: {userInfo.phone}</p>
      </div>
    </div>
  );
};

export default DahsboardProfile;
