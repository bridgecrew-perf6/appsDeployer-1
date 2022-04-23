import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopNav from './components/TopNav';
import PrivateRoute from './components/PrivateRoute';
// components
import Home from './home/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import Dashboard from './user/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;