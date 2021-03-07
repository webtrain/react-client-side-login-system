import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const Message = ({ variant, message, loginPage }) => {
  const { AUTH, dispatch } = useContext(AppContext);

  const { head, body } = message;

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: AUTH.RESET });
    }, 2000);
  }, [dispatch, AUTH.RESET]);

  return (
    <div className="alert-box column is-offset-8" role="message">
      <div className={`message is-${variant}`}>
        <div className="message-header">
          <p>{head}</p>
          <button className="delete" aria-label="delete" onClick={() => dispatch({ type: AUTH.RESET })}></button>
        </div>
        <div className="message-body">{loginPage ? body : (body.name, body.email, body.password)}</div>
      </div>
    </div>
  );
};

export default Message;
