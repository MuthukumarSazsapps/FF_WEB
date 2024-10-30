import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { actions, dispatch } from 'store';
import { RootState } from 'store/reducers';
import { SubCity, SubCityFormFieldTypes } from 'utils/types';
import useLocalData from './use-localData';

type UseCityReturn = {
  allCities: SubCity[];
  loading: boolean;
  listLoading: boolean;
  createCity?: string;
  deleteCity?: string;
  updateCity?: string;
  handleSubmit: (data: SubCityFormFieldTypes) => void;
  handleDelete: (id: string) => void;
  handleUpdate: (id: string, data: SubCityFormFieldTypes) => void;
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

const useSubCity = (apiFlags = defaultAPIFlags): UseCityReturn => {
  const allCities = useSelector<RootState, SubCity[]>(state => state.subcities.list);
  const listLoading = useSelector<RootState, boolean>(state => state.subcities.listAPI.loading);
  const createLoading = useSelector<RootState, boolean>(state => state.subcities.createAPI.loading);
  const updateLoading = useSelector<RootState, boolean>(state => state.subcities.updateAPI.loading);
  const deleteLoading = useSelector<RootState, boolean>(state => state.subcities.deleteAPI.loading);
  const loading = listLoading || createLoading || updateLoading || deleteLoading;
  const { subscriber, branch, username } = useLocalData();

  const createCity = useSelector<RootState, string>(
    state => state.subcities.createAPI.success || '',
  );
  const deleteCity = useSelector<RootState, string>(
    state => state.subcities.deleteAPI.success || '',
  );
  const updateCity = useSelector<RootState, string>(
    state => state.subcities.updateAPI.success || '',
  );

  useEffect(() => {
    if (apiFlags.list && subscriber) {
      dispatch(
        actions.listSubCitiesRequest({
          SubscriberId: subscriber,
          BranchId: branch,
        }),
      );
    }
  }, [createCity, deleteCity, updateCity, subscriber]);

  const handleSubmit = (formData: SubCityFormFieldTypes) => {
    if (apiFlags.create) {
      dispatch(
        actions.createSubCityRequest({
          SubscriberId: subscriber,
          cityData: { ...formData, CreatedBy: username },
        }),
      );
    }
  };

  const handleUpdate = (CityId: string, formData: SubCityFormFieldTypes) => {
    if (apiFlags.edit) {
      dispatch(
        actions.updateSubCityRequest({
          CityId,
          updateData: {
            ...formData,
            SubscriberId: subscriber,
            ModifiedBy: username,
          },
        }),
      );
    }
  };

  const handleDelete = (CityId: string) => {
    if (apiFlags.remove) {
      dispatch(actions.deleteSubCityRequest({ CityId, ModifiedBy: username }));
    }
  };

  useEffect(() => {
    if (createCity) {
      setTimeout(() => {
        dispatch(actions.resetCreateSubCityControl());
      }, 500);
    }
  }, [createCity]);

  useEffect(() => {
    if (updateCity) {
      setTimeout(() => {
        dispatch(actions.resetUpdateSubCityControl());
      }, 500);
    }
  }, [updateCity]);

  useEffect(() => {
    if (deleteCity) {
      setTimeout(() => {
        dispatch(actions.resetDeleteSubCityControl());
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

export default useSubCity;
