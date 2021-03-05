import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useHistory } from 'react-router-dom';
import Avatar from '../images/avatar.svg';

const Dashboard = () => {
  const { albumList, state } = useContext(AppContext);
  const { userInfo } = state;
  const { loading, error } = albumList;

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [steps] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [mid, setMid] = useState(3);

  const history = useHistory();

  const showDetails = (id) => {
    history.push(`/album/${id}`);
  };

  const handleNext = (e) => {
    handleActive(e);

    const totalPage = Math.ceil(albumList.data.length / steps);

    if (end < albumList.data.length) {
      setStart(start + steps);
      setEnd(end + steps);
      setCurrentPage((page) => page + 1);

      if (mid < totalPage - 2) {
        setMid((middle) => middle + 1);
      }
    }
  };

  const handlePrev = (e) => {
    handleActive(e);

    if (start > 0) {
      setStart(start - steps);
      setEnd(end - steps);
      setCurrentPage((page) => page - 1);

      if (mid > currentPage) {
        setMid((middle) => middle - 1);
      }

      if (currentPage < 3) {
        setMid(3);
      }
    }
  };

  const goToPage = (e) => {
    handleActive(e);

    const page = e.target.dataset.page;
    setCurrentPage(Number(page))

    if (Number(page) === 1) {
      setStart(0);
      setEnd(steps);
    } else if (Number(page) === 10) {
      console.log('hello');
      setStart(albumList.data.length - steps);
      setEnd(albumList.data.length);
    } else {
      setStart(page * steps);
      setEnd(page * steps + steps);
      setCurrentPage(Number(page));
    }
  };

  const handleActive = (e) => {
    const btns = document.querySelectorAll('.pagination-list > li > span');

    btns.forEach((btn) => {
      btn.classList.remove('is-current');
    });
    e.target && e.target.classList.add('is-current');
  };

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>Something went wrong... 🤢</h1>
      ) : (
        <div className="container py-4">
          <div className="columns m-0 ">
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

            <div className="column">
              <nav className="pagination" role="navigation" aria-label="pagination">
                <span className="pagination-previous" onClick={handlePrev}>
                  Previous
                </span>
                <span className="pagination-next" onClick={handleNext}>
                  Next page
                </span>
                <ul className="pagination-list">
                  <li onClick={goToPage}>
                    <span className="pagination-link" data-page="1" aria-label="Goto page 1">
                      1
                    </span>
                  </li>
                  <li>
                    <span className="pagination-ellipsis">&hellip;</span>
                  </li>

                  <li onClick={goToPage}>
                    <span className={`pagination-link `} data-page={mid - 1} aria-label={`Goto page ${mid - 1}`}>
                      {mid - 1}
                    </span>
                  </li>
                  <li onClick={goToPage}>
                    <span
                      className={`pagination-link is-current`}
                      aria-label={`Goto page ${mid}`}
                      data-page={mid}
                      aria-current="page"
                    >
                      {mid}
                    </span>
                  </li>
                  <li onClick={goToPage}>
                    <span className={`pagination-link `} data-page={mid + 1} aria-label={`Goto page ${mid + 1}`}>
                      {mid + 1}
                    </span>
                  </li>
                  <li>
                    <span className="pagination-ellipsis">&hellip;</span>
                  </li>
                  <li onClick={goToPage}>
                    <span className="pagination-link" data-page="10" aria-label="Goto page 86">
                      {albumList.data.length / steps}
                    </span>
                  </li>
                  <span className="ml-4">
                    {currentPage} / {albumList.data.length / steps}
                  </span>
                </ul>
              </nav>

              <h1 className="title is-size-3 has-text-centered has-text-primary">Albums</h1>
              <div className="columns is-multiline">
                {albumList.data.slice(start, end).map((album) => (
                  <div className="column is-one-third" key={album.id}>
                    <div className="card mb-2 p-2 is-size-5">
                      <div className="card-body pb-2">
                        <p className="mb-2">Id: {album.id}</p>
                        <p className="is-size-6">Title: {album.title}</p>
                      </div>
                      <div className="card-footer py-2">
                        <button
                          className="button is-small is-fullwidth  is-primary"
                          onClick={() => showDetails(album.id)}
                        >
                          Details
                        </button>
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
