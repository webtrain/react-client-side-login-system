import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useHistory } from 'react-router-dom';
import Avatar from '../images/avatar.svg';

const Dashboard = () => {
  const { albumList, state } = useContext(AppContext);
  const { userInfo, loading, error } = state;
  
  const [num, setNum] = useState(10);
  
  const history = useHistory()

  const showDetails = (id) => {
    history.push(`/album/${id}`)
  }

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>Something went wrong... 🤢</h1>
      ) : (
        <div className="container py-4">
          <div className="columns">
            <div className="column is-4 p-3">
              <h1 className="title is-size-3 has-text-primary">Welcome</h1>
              <h2 className="subtitle pl-4 is-size-4">{userInfo.name}</h2>
              <figure className="image">
                <img className="is-rounded" src={Avatar} alt="avatar" />
              </figure>
              <div className="has-text-centered py-2">
                <p className="is-size-5">Username: {userInfo.username}</p>
                <p className="is-size-5">Email: {userInfo.email}</p>
                <p className="is-size-5">Phone: {userInfo.phone}</p>
              </div>
            </div>
            <div className="column">
              <h1 className="title is-size-3 has-text-centered has-text-primary">Albums</h1>
              <div className="columns is-multiline">
                {albumList.data.slice(0, num).map((album) => (
                  <div className="column is-one-third" key={album.id}>
                    <div className="card mb-2 p-2 is-size-5">
                      <div className="card-body pb-2">
                        <p className="mb-2">Id: {album.id}</p>
                        <p className="is-size-6">Title: {album.title}</p>
                      </div>
                      <div className="card-footer py-2">
                        <button className="button is-small is-fullwidth  is-primary" onClick={() => showDetails(album.id)}>Details</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
