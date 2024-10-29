import axiosInstance from './axios';

const login = async (payload: { username: string; password: string }) => {
  const response = await axiosInstance
    .post('/login', { username: payload.username, password: payload.password })
    .then(result => result.data)
    .catch(err => {
      console.log(err);
      return err;
    });
  return response.token ? response : '';
};
const refreshTokenLogin = async (payload: {
  username: string;
  refresh_token: string;
  refresh_key: string;
}) => {
  const response = await axiosInstance
    .post('/refresh-token', {
      username: payload.username,
      refresh_token: payload.refresh_token,
      refresh_key: payload.refresh_key,
    })
    .then(result => result.data)
    .catch(err => {
      console.log(err);
    });
  return response.token;
};

export default { login, refreshTokenLogin };
