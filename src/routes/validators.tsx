import { useLocalStorage } from 'react-use';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/reducers';

export const PrivateRoutesValidator = () => {
  const [jwt] = useLocalStorage('auth');

  return jwt ? <Outlet /> : <Navigate to="/login" />;
};

export const AdminRoutesValidator = () => {
  const [userRole] = useLocalStorage('role'); // As for now this is a session cookie, need to discuss

  return userRole === 'Admin' ? <Outlet /> : <Navigate to="/" />;
};

export const SubscriberRoutesValidator = () => {
  const [userRole] = useLocalStorage('role'); // As for now this is a session cookie, need to discuss
  return userRole === 'Subscriber' ? <Outlet /> : <Navigate to="/" />;
};

export const OtpRouteValidator = () => {
  const [jwt] = useLocalStorage('auth');
  const token = useSelector<RootState, string>(state => state.auth.login.token);

  return !jwt && token ? <Outlet /> : <Navigate to="/" />;
};
