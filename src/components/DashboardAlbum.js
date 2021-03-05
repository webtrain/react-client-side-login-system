import React from 'react';
import { useHistory } from 'react-router-dom';

const DashboardAlbum = ({ albumList, start, end }) => {

  const history = useHistory()


  const showDetails = (id) => {
    history.push(`/album/${id}`);
  };

  return (
    <>
      {albumList.data.slice(start, end).map((album) => (
        <div className="column is-one-third" key={album.id}>
          <div className="card mb-2 p-2 is-size-5">
            <div className="card-body pb-2">
              <p className="mb-2">Id: {album.id}</p>
              <p className="is-size-6">Title: {album.title}</p>
            </div>
            <div className="card-footer py-2">
              <button className="button is-small is-fullwidth  is-primary" onClick={() => showDetails(album.id)}>
                Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default DashboardAlbum;
