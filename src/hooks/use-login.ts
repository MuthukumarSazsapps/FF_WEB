import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actions, dispatch } from 'store';
import { RootState } from 'store/reducers';
import { LoginFormFieldTypes } from 'utils/types';

type UseLoginReturn = {
  handleSubmit: (data: LoginFormFieldTypes) => void;
  loading: boolean;
  autoLoginLoading: boolean;
};

const useLogin = <T>(): UseLoginReturn => {
  const token = useSelector<RootState, string>(state => state.auth.login.token);
  const loading = useSelector<RootState, boolean>(state => state.auth.login.loginLoading);
  const autoLoginLoading = useSelector<RootState, boolean>(
    state => state.auth.autoLogin.loginLoading,
  );
  const userEmail = useSelector<RootState, string>(state => state.auth.login.UserName);
  const navigate = useNavigate();
  const COOKIE_EXPIRY_HOURS = 24;
  const EXPIRY_DATE = new Date(Date.now() + COOKIE_EXPIRY_HOURS * 60 * 60 * 1000);
  const handleSubmit = (data: LoginFormFieldTypes) => {
    dispatch(actions.loginRequest(data));
  };
  useEffect(() => {
    if (token && userEmail) {
      navigate('/otp-page');
    }
  }, [token]);

  return { loading, autoLoginLoading, handleSubmit };
};

export default useLogin;
