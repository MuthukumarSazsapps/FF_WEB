import axiosInstance from './axios';
import { APIRoutes } from 'utils';
import { SubCity, SubCityFormFieldTypes } from 'utils/types';

const createSubscriberCity = async (
  SubscriberId: string,
  cityData: SubCityFormFieldTypes,
): Promise<Location> => {
  const response = await axiosInstance
    .post(APIRoutes.citySubscriberCreate, { ...cityData, SubscriberId })
    .then(result => result.data)
    .catch(err => {
      console.log('Create Api error', err);
      return;
    });

  return response.message;
};

const listAllSubscriberCities = async (SubscriberId: string, BranchId: string) => {
  const response = await axiosInstance
    .post(APIRoutes.citySubscriberList, {
      SubscriberId: SubscriberId,
      BranchId: BranchId,
    })
    .then(result => result.data)
    .catch(err => {
      console.log('List Api error', err);
    });
  return response ?? [];
};
const deleteSubscriberCity = async (CityId: string, ModifiedBy: string) => {
  const response = await axiosInstance
    .delete(`${APIRoutes.citySubscriberDelete}/${CityId}`, {
      data: {
        ModifiedBy,
      },
    })
    .then(result => result.data)
    .catch(err => {
      console.log('Delete Api error', err);
      return;
    });
  return response?.message;
};
const updateSubscriberCity = async (
  CityId: string,
  updateData: SubCityFormFieldTypes,
): Promise<SubCity> => {
  const response = await axiosInstance
    .put(`${APIRoutes.citySubscriberUpdate}/${CityId}`, updateData)
    .then(result => result.data)
    .catch(err => {
      console.log('Update Api error', err);
      return;
    });
  return response?.message;
};

export default {
  listAllSubscriberCities,
  createSubscriberCity,
  deleteSubscriberCity,
  updateSubscriberCity,
};
