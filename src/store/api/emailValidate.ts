import axiosInstance from './axios';
import { APIRoutes } from 'utils';

const emailVaildate = async (email: string) => {
  const response = await axiosInstance
    .post(APIRoutes.emailCheck, { email: email }) // Replace YOUR_PORT with your server port
    .then(result => result.data)
    .catch(err => {
      console.log('Email check error', err);
      return { exists: false }; // Assuming your server returns an object like this
    });
  return response;
};
export default emailVaildate;
