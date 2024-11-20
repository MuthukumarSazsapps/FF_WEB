import axiosInstance from './axios';
import { APIRoutes } from 'utils';
import { EnumMaster, EnumMasterFormFieldTypes } from 'utils/types';

const createEnumMaster = async (VehicleData: EnumMasterFormFieldTypes): Promise<EnumMaster> => {
  const response = await axiosInstance
    .post(APIRoutes.enumMasterCreate, VehicleData)
    .then(result => result.data)
    .catch(err => {
      console.log('Create Api error', err);
      return;
    });
  return response.message;
};

export default {
  createEnumMaster,
};
