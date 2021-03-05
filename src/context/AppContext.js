import React, { useReducer } from 'react';
import useFetch from '../customHooks/useFetch';
import authReducer, { AUTH, initialState } from '../app/reducers/authReducer';

export const AppContext = React.createContext();

const AppContextProvider = ({ children }) => {
  const fetchedUsers = useFetch('https://jsonplaceholder.typicode.com/users');
  const albumList = useFetch('https://jsonplaceholder.typicode.com/albums');

  const [state, dispatch] = useReducer(authReducer, initialState);

  const users = fetchedUsers.data.map((user) => ({ ...user, password: '123456' }));

  const data = { state, AUTH, dispatch, users, albumList };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export default React.memo(AppContextProvider);
