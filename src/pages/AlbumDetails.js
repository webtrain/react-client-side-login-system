import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link, useParams } from 'react-router-dom';

const AlbumDetails = () => {
  const { albumList, loading, error } = useContext(AppContext);
  const { id } = useParams();

  const album = albumList.data.find((album) => album.id === parseInt(id));

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>Error... 🤢</h1>
      ) : (
        <div className="container">
          <div className="section">
            <Link to="/dashboard" className="button is-light">
              <i className="fas fa-angle-left mr-2"></i>
              Back
            </Link>
          </div>
          <section className="section">
            <div className="columns is-centered">
              <div className="column is-half">
                <div className="card">
                  <div className="card-header">
                    <div className="card-header-icon">
                      <i className="fas fa-bookmark has-text-primary is-size-3"></i>
                    </div>
                    <div className="card-header-title">
                      <h1 className="title is-2">{album.title}</h1>
                    </div>
                  </div>
                  <div className="card-content">
                    <p className="is-size-4">Id: {album.id}</p>
                    <p className="is-size-4">User Id: {album.userId}</p>
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

export default AlbumDetails;
