import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = (props) => {
  const session = sessionStorage.getItem('loggedIn')

  return session ? <Route path="/dashboard" {...props} /> : <Redirect to="/" />
}

export default PrivateRoute;
