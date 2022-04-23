import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ ...rest }) => {
    
    const auth = JSON.parse(window.localStorage.getItem('auth'));
    
    //console.log(window.localStorage.getItem('auth'));
    // console.log(auth);
    // console.log(auth.token);
    return ((auth && auth.token) ? <Route {...rest} /> : <Redirect to='/login' />);
};

export default PrivateRoute;