import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Header from './components/Header';
import AlbumDetails from './pages/AlbumDetails';
import PrivateRoute from './customRouter/PrivateRoute'
import './app.css';

function App() {
  const session = sessionStorage.getItem('loggedIn');
  
  useEffect(() => {
    if(!session) {
      sessionStorage.getItem('loggedIn');
    }
  }, [session]);

  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={session ? Home : Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />

          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/album/:id" component={AlbumDetails} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
