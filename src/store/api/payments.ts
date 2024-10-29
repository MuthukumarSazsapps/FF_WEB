import axiosInstance from './axios';
import { APIRoutes } from 'utils';

const loanDisburse = async (paymentData: any): Promise<any> => {
  const response = await axiosInstance
    .post(APIRoutes.loanDisburse, paymentData)
    .then(result => result.data)
    .catch(err => {
      console.log('Create Api error', err);
      return;
    });
  return response.message;
};

export default {
  loanDisburse,
};
