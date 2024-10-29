import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { actions, dispatch } from 'store';
import { RootState } from 'store/reducers';
import { Vehicle, VehicleFormFieldTypes } from 'utils/types';
import useLocalData from './use-localData';

type UseVehicleReturn = {
  allVehicles: Vehicle[];
  loading?: boolean;
  listLoading?: boolean;
  createVehicleState?: string;
  deleteVehicleState?: string;
  updateVehicleState?: string;
  handleSubmit: (data: VehicleFormFieldTypes) => void;
  handleDelete: (data: string) => void;
  handleUpdate: (id: string, data: VehicleFormFieldTypes) => void;
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

const useVehicles = (apiFlags = defaultAPIFlags): UseVehicleReturn => {
  const allVehicles = useSelector<RootState, Vehicle[]>(state => state.vehicles.list);
  const listLoading = useSelector<RootState, boolean>(state => state.vehicles.listAPI.loading);
  const createLoading = useSelector<RootState, boolean>(state => state.vehicles.createAPI.loading);
  const updateLoading = useSelector<RootState, boolean>(state => state.vehicles.updateAPI.loading);
  const deleteLoading = useSelector<RootState, boolean>(state => state.vehicles.deleteAPI.loading);
  const loading = listLoading || createLoading || updateLoading || deleteLoading;
  const createVehicleState = useSelector<RootState, string>(
    state => state.vehicles.createAPI.success || '',
  );
  const deleteVehicleState = useSelector<RootState, string>(
    state => state.vehicles.deleteAPI.success || '',
  );
  const updateVehicleState = useSelector<RootState, string>(
    state => state.vehicles.updateAPI.success || '',
  );
  const { subscriber, branch, username } = useLocalData();

  useEffect(() => {
    if (apiFlags.list && subscriber) {
      dispatch(
        actions.listVehiclesRequest({
          SubscriberId: subscriber,
          BranchId: branch,
        }),
      );
    }
  }, [createVehicleState, deleteVehicleState, updateVehicleState, subscriber]);
  const handleSubmit = (formData: VehicleFormFieldTypes) => {
    if (apiFlags.create) {
      dispatch(
        actions.createVehicleRequest({
          VehicleData: {
            ...formData,
            CreatedBy: username,
            SubscriberId: subscriber,
          },
        }),
      );
    }
  };

  const handleUpdate = (id: string, formData: VehicleFormFieldTypes) => {
    if (apiFlags.edit) {
      dispatch(
        actions.updateVehicleRequest({
          VehicleTypeId: id,
          updateData: { ...formData, ModifiedBy: username },
        }),
      );
    }
  };

  const handleDelete = (id: string) => {
    if (apiFlags.remove) {
      dispatch(actions.deleteVehicleRequest({ VehicleTypeId: id, ModifiedBy: username }));
    }
  };

  useEffect(() => {
    if (createVehicleState) {
      setTimeout(() => {
        dispatch(actions.resetCreateVehicleControl());
      }, 500);
    }
  }, [createVehicleState]);
  useEffect(() => {
    if (updateVehicleState) {
      setTimeout(() => {
        dispatch(actions.resetUpdateVehicleControl());
      }, 500);
    }
  }, [updateVehicleState]);
  useEffect(() => {
    if (deleteVehicleState) {
      setTimeout(() => {
        dispatch(actions.resetDeleteVehicleControl());
      }, 500);
    }
  }, [deleteVehicleState]);
  return {
    allVehicles,
    loading,
    listLoading,
    handleDelete,
    deleteVehicleState,
    createVehicleState,
    updateVehicleState,
    handleSubmit,
    handleUpdate,
  };
};

export default useVehicles;
