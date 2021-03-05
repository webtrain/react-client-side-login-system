import React, { useState } from 'react';

const DashboardPagination = ({ albumList, start, setStart, end, setEnd }) => {

  const [steps] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [mid, setMid] = useState(3);


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

    const totalPage = Math.ceil(albumList.data.length / steps);
    const page = e.target.dataset.page;

    setCurrentPage(Number(page));

    if (Number(page) === 1) {
      setStart(0);
      setEnd(steps);
    } else if (Number(page) === totalPage) {
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
  );
};

export default DashboardPagination;
