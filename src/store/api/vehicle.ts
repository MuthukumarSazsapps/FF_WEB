import axiosInstance from './axios';
import { APIRoutes } from 'utils';
import { Vehicle, VehicleFormFieldTypes } from 'utils/types';

const listAllVehicles = async (SubscriberId: string, BranchId: string) => {
  const response = await axiosInstance
    .post(APIRoutes.vehicleList, { SubscriberId, BranchId })
    .then(result => result.data)
    .catch(err => {
      console.log('List Api error', err);
    });
  return response ?? [];
};

const createVehicle = async (VehicleData: VehicleFormFieldTypes): Promise<Vehicle> => {
  const response = await axiosInstance
    .post(APIRoutes.vehicleCreate, VehicleData)
    .then(result => result.data)
    .catch(err => {
      console.log('Create Api error', err);
      return;
    });
  return response.message;
};

const updateVehicle = async (
  VehicleTypeId: string,
  updateData: VehicleFormFieldTypes,
): Promise<Vehicle> => {
  const response = await axiosInstance
    .put(`${APIRoutes.vehicleUpdate}/${VehicleTypeId}`, updateData)
    .then(result => result.data)
    .catch(err => {
      console.log('Update Api error', err);
      return;
    });
  return response?.message;
};

const deleteVehicle = async (VehicleTypeId: string, ModifiedBy: string) => {
  const response = await axiosInstance
    .delete(`${APIRoutes.vehicleDelete}/${VehicleTypeId}`, {
      data: {
        ModifiedBy: ModifiedBy,
      },
    })
    .then(result => result.data)
    .catch(err => {
      console.log('Delete Api error', err);
      return;
    });
  return response?.message;
};

export default {
  listAllVehicles,
  createVehicle,
  deleteVehicle,
  updateVehicle,
};
