import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import DahsboardProfile from '../components/DahsboardProfile';
import DashboardPagination from '../components/DashboardPagination';
import DashboardAlbum from '../components/DashboardAlbum';

const Dashboard = () => {
  const { albumList } = useContext(AppContext);
  const { loading, error } = albumList;

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);


  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>Something went wrong... 🤢</h1>
      ) : (
        <div className="container py-4">
          <div className="columns m-0 ">
            <DahsboardProfile />

            <div className="column">
              <DashboardPagination albumList={albumList} start={start} setStart={setStart} end={end} setEnd={setEnd} />

              <h1 className="title is-size-3 has-text-centered has-text-primary">Albums</h1>
              <div className="columns is-multiline">
                <DashboardAlbum albumList={albumList} start={start} end={end} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
