import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { actions, dispatch } from 'store';
import { RootState } from 'store/reducers';
import { City, CityFormFieldTypes } from 'utils/types';
import useLocalData from './use-localData';

type UseCityReturn = {
  allCities: City[];
  loading: boolean;
  listLoading: boolean;
  createCity?: string;
  deleteCity?: string;
  updateCity?: string;
  handleSubmit: (data: CityFormFieldTypes) => void;
  handleDelete: (id: string) => void;
  handleUpdate: (id: string, data: CityFormFieldTypes) => void;
};

interface APIFlags {
  list?: boolean;
  profile?: boolean;
  create?: boolean;
  edit?: boolean;
  remove?: boolean;
}

const defaultAPIFlags: APIFlags = {
  list: false,
  profile: false,
  create: false,
  edit: false,
  remove: false,
};

const useCityState = (apiFlags = defaultAPIFlags): UseCityReturn => {
  const allCities = useSelector<RootState, City[]>(state => state.cities.list);
  const listLoading = useSelector<RootState, boolean>(state => state.cities.listAPI.loading);
  const createLoading = useSelector<RootState, boolean>(state => state.cities.createAPI.loading);
  const updateLoading = useSelector<RootState, boolean>(state => state.cities.updateAPI.loading);
  const deleteLoading = useSelector<RootState, boolean>(state => state.cities.deleteAPI.loading);
  const loading = listLoading || createLoading || updateLoading || deleteLoading;
  const createCity = useSelector<RootState, string>(state => state.cities.createAPI.success || '');
  const deleteCity = useSelector<RootState, string>(state => state.cities.deleteAPI.success || '');
  const updateCity = useSelector<RootState, string>(state => state.cities.updateAPI.success || '');
  const { username } = useLocalData();

  useEffect(() => {
    if (apiFlags.list) {
      dispatch(actions.listCitiesRequest());
    }
  }, [createCity, deleteCity, updateCity]);

  const handleSubmit = (formData: CityFormFieldTypes) => {
    if (apiFlags.create) {
      dispatch(actions.createCityRequest({ ...formData, CreatedBy: username }));
    }
  };

  const handleUpdate = (CityId: string, formData: CityFormFieldTypes) => {
    if (apiFlags.edit) {
      dispatch(
        actions.updateCityRequest({
          CityId,
          updateData: { ...formData, ModifiedBy: username },
        }),
      );
    }
  };

  const handleDelete = (CityId: string) => {
    if (apiFlags.remove) {
      dispatch(actions.deleteCityRequest({ CityId, ModifiedBy: username }));
    }
  };

  useEffect(() => {
    if (createCity) {
      setTimeout(() => {
        dispatch(actions.resetCreateCityControl());
      }, 500);
    }
  }, [createCity]);

  useEffect(() => {
    if (updateCity) {
      setTimeout(() => {
        dispatch(actions.resetUpdateCityControl());
      }, 500);
    }
  }, [updateCity]);

  useEffect(() => {
    if (deleteCity) {
      setTimeout(() => {
        dispatch(actions.resetDeleteCityControl());
      }, 500);
    }
  }, [deleteCity]);

  return {
    allCities,
    loading,
    listLoading,
    handleDelete,
    deleteCity,
    createCity,
    updateCity,
    handleSubmit,
    handleUpdate,
  };
};

export default useCityState;
