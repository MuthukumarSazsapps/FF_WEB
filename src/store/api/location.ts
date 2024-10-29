import axiosInstance from './axios';
import { APIRoutes } from 'utils';
import { Location, LocationFormFieldTypes } from 'utils/types';

const createLocation = async (locationData: LocationFormFieldTypes): Promise<Location> => {
  const response = await axiosInstance
    .post(APIRoutes.stateCreate, locationData)
    .then(result => result.data)
    .catch(err => {
      console.log('Create Api error', err);
      return;
    });
  return response.message;
};

const getLocation = async (stateId: string) => {
  try {
    const response = await axiosInstance
      .post(APIRoutes.getState, { stateId })
      .then(result => result.data)
      .catch(err => {
        console.log('Get Menu Api error', err);
        return err;
      });
    return response;
  } catch (error) {
    console.log('Error fetching Menu:', error);
  }
};

const listAllLocations = async () => {
  const response = await axiosInstance
    .get(APIRoutes.stateList)
    .then(result => result.data)
    .catch(err => {
      console.log('List Api error', err);
    });
  return response ?? [];
};
const deleteLocation = async (StateId: string, ModifiedBy: string) => {
  const response = await axiosInstance
    .delete(`${APIRoutes.stateDelete}/${StateId}`, { data: { ModifiedBy: ModifiedBy } })
    .then(result => result.data)
    .catch(err => {
      console.log('Delete Api error', err);
      return;
    });
  return response?.message;
};
const updateLocation = async (
  StateId: string,
  updateData: LocationFormFieldTypes,
): Promise<Location> => {
  const response = await axiosInstance
    .put(`${APIRoutes.stateUpdate}/${StateId}`, updateData)
    .then(result => result.data)
    .catch(err => {
      console.log('Update Api error', err);
      return;
    });
  return response?.message;
};

export default {
  listAllLocations,
  createLocation,
  deleteLocation,
  updateLocation,
  getLocation,
};
