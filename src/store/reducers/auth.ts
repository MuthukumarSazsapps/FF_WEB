import { createSlice } from '@reduxjs/toolkit';

const defaultloginState = {
  loginLoading: false,
  UserId: '',
  UserName: '',
  role: '',
  token: '',
  refresh_token: '',
  refresh_key: '',
  error: '',
};
const initialState = {
  login: defaultloginState,
  autoLogin: {
    loginLoading: false,
    token: '',
    error: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state, action) => {
      state.login.loginLoading = true;
      state.login.error = '';
    },
    loginSucess: (state, action) => {
      state.login.loginLoading = false;
      state.login.token = action.payload.token;
      state.login.UserName = action.payload.UserName;
      state.login.refresh_token = action.payload.refresh_token;
      state.login.refresh_key = action.payload.refresh_key;
      state.login.role = action.payload.role;
      state.login.error = '';
      state.login.UserId = action.payload.UserId;
    },
    loginFailed: (state, action) => {
      state.login.error = action.payload;
      state.login.loginLoading = false;
    },
    refreshTokenRequest: (state, action) => {
      state.autoLogin.loginLoading = true;
    },
    refreshTokenSuccess: (state, action) => {
      state.autoLogin.loginLoading = false;
      state.autoLogin.token = action.payload;
    },
    refreshTokenFailure: (state, action) => {
      state.autoLogin.loginLoading = false;
      state.autoLogin.error = action.payload.error;
    },
    logout: state => {
      state.login = defaultloginState;
      state.autoLogin = {
        loginLoading: false,
        token: '',
        error: '',
      };
    },
  },
});

export default authSlice;
