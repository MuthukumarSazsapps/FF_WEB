import axiosInstance from './axios';
import { APIRoutes } from 'utils';
import { City, CityFormFieldTypes } from 'utils/types';

const createCity = async (cityData: CityFormFieldTypes): Promise<Location> => {
  const response = await axiosInstance
    .post(APIRoutes.cityCreate, cityData)
    .then(result => result.data)
    .catch(err => {
      console.log('Create Api error', err);
      return;
    });

  return response.message;
};

const getCity = async (CityId: string) => {
  try {
    const response = await axiosInstance
      .post(APIRoutes.getCity, { CityId })
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

const listAllCities = async () => {
  const response = await axiosInstance
    .get(APIRoutes.cityList)
    .then(result => result.data)
    .catch(err => {
      console.log('List Api error', err);
    });
  return response ?? [];
};
const deleteCity = async (CityId: string, ModifiedBy: string) => {
  const response = await axiosInstance
    .delete(`${APIRoutes.cityDelete}/${CityId}`, {
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
const updateCity = async (CityId: string, updateData: CityFormFieldTypes): Promise<City> => {
  const response = await axiosInstance
    .put(`${APIRoutes.cityUpdate}/${CityId}`, updateData)
    .then(result => result.data)
    .catch(err => {
      console.log('Update Api error', err);
      return;
    });
  return response?.message;
};

export default {
  listAllCities,
  createCity,
  deleteCity,
  updateCity,
  getCity,
};
