import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { actions, dispatch } from 'store';
import { RootState } from 'store/reducers';
import { Location, LocationFormFieldTypes } from 'utils/types';
import useLocalData from './use-localData';

type UseStateReturn = {
  allStates: Location[];
  loading: boolean;
  listLoading: boolean;
  createState?: string;
  deleteState?: string;
  updateState?: string;
  handleSubmit: (data: LocationFormFieldTypes) => void;
  handleDelete: (id: string) => void;
  handleUpdate: (id: string, data: LocationFormFieldTypes) => void;
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

const useLocationState = (apiFlags = defaultAPIFlags): UseStateReturn => {
  const allStates = useSelector<RootState, Location[]>(state => state.locations.list);
  const listLoading = useSelector<RootState, boolean>(state => state.locations.listAPI.loading);
  const createLoading = useSelector<RootState, boolean>(state => state.locations.createAPI.loading);
  const updateLoading = useSelector<RootState, boolean>(state => state.locations.updateAPI.loading);
  const deleteLoading = useSelector<RootState, boolean>(state => state.locations.deleteAPI.loading);
  const loading = listLoading || createLoading || updateLoading || deleteLoading;
  const { username } = useLocalData();
  const createState = useSelector<RootState, string>(
    state => state.locations.createAPI.success || '',
  );
  const deleteState = useSelector<RootState, string>(
    state => state.locations.deleteAPI.success || '',
  );
  const updateState = useSelector<RootState, string>(
    state => state.locations.updateAPI.success || '',
  );

  useEffect(() => {
    if (apiFlags.list) {
      dispatch(actions.listLocationsRequest());
    }
  }, [createState, deleteState, updateState]);

  const handleSubmit = (formData: LocationFormFieldTypes) => {
    if (apiFlags.create) {
      dispatch(actions.createLocationRequest({ ...formData, CreatedBy: username }));
    }
  };

  const handleUpdate = (StateId: string, formData: LocationFormFieldTypes) => {
    if (apiFlags.edit) {
      dispatch(
        actions.updateLocationRequest({
          StateId,
          updateData: { ...formData, ModifiedBy: username },
        }),
      );
    }
  };

  const handleDelete = (StateId: string) => {
    if (apiFlags.remove) {
      dispatch(actions.deleteLocationRequest({ StateId, ModifiedBy: username }));
    }
  };

  useEffect(() => {
    if (createState) {
      setTimeout(() => {
        dispatch(actions.resetCreateLocationControl());
      }, 500);
    }
  }, [createState]);

  useEffect(() => {
    if (updateState) {
      setTimeout(() => {
        dispatch(actions.resetUpdateLocationControl());
      }, 500);
    }
  }, [updateState]);

  useEffect(() => {
    if (deleteState) {
      setTimeout(() => {
        dispatch(actions.resetDeleteLocationControl());
      }, 500);
    }
  }, [deleteState]);

  return {
    allStates,
    loading,
    listLoading,
    handleDelete,
    deleteState,
    createState,
    updateState,
    handleSubmit,
    handleUpdate,
  };
};

export default useLocationState;
