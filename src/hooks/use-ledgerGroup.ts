import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { actions, dispatch } from 'store';
import { RootState } from 'store/reducers';
import { LedgerGroup, LedgerGroupFormFieldTypes } from 'utils/types';
import useLocalData from './use-localData';

type UseLedgerGroupReturn = {
  allLedgerGroup: LedgerGroup[];
  loading: boolean;
  listLoading: boolean;
  createLedgerGroup?: string;
  deleteLedgerGroup?: string;
  updateLedgerGroup?: string;
  handleSubmit: (data: LedgerGroupFormFieldTypes) => void;
  handleDelete: (id: string) => void;
  handleUpdate: (id: string, data: LedgerGroupFormFieldTypes) => void;
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

const useLedgerGroup = (apiFlags = defaultAPIFlags): UseLedgerGroupReturn => {
  const allLedgerGroup = useSelector<RootState, LedgerGroup[]>(state => state.LedgerGroups.list);
  const listLoading = useSelector<RootState, boolean>(state => state.LedgerGroups.listAPI.loading);
  const createLoading = useSelector<RootState, boolean>(
    state => state.LedgerGroups.createAPI.loading,
  );
  const updateLoading = useSelector<RootState, boolean>(
    state => state.LedgerGroups.updateAPI.loading,
  );
  const deleteLoading = useSelector<RootState, boolean>(
    state => state.LedgerGroups.deleteAPI.loading,
  );
  const loading = listLoading || createLoading || updateLoading || deleteLoading;

  const createLedgerGroup = useSelector<RootState, string>(
    state => state.LedgerGroups.createAPI.success || '',
  );
  const deleteLedgerGroup = useSelector<RootState, string>(
    state => state.LedgerGroups.deleteAPI.success || '',
  );
  const updateLedgerGroup = useSelector<RootState, string>(
    state => state.LedgerGroups.updateAPI.success || '',
  );
  const { username, subscriber, branch } = useLocalData();

  useEffect(() => {
    if (apiFlags.list) {
      dispatch(
        actions.listLedgerRequest({
          SubscriberId: subscriber,
          BranchId: branch,
        }),
      );
    }
  }, [createLedgerGroup, deleteLedgerGroup, updateLedgerGroup]);

  const handleSubmit = (formData: LedgerGroupFormFieldTypes) => {
    if (apiFlags.create) {
      dispatch(
        actions.createLedgerGroupRequest({
          ...formData,
          SubscriberId: subscriber,
          CreatedBy: username,
        }),
      );
    }
  };

  const handleUpdate = (LedgerGroupId: string, formData: LedgerGroupFormFieldTypes) => {
    if (apiFlags.edit) {
      dispatch(
        actions.updateLedgerGroupRequest({
          LedgerGroupId,
          updateData: { ...formData, ModifiedBy: username },
        }),
      );
    }
  };

  const handleDelete = (LedgerGroupId: string) => {
    if (apiFlags.remove) {
      dispatch(actions.deleteLedgerGroupRequest({ LedgerGroupId, ModifiedBy: username }));
    }
  };

  useEffect(() => {
    if (createLedgerGroup) {
      setTimeout(() => {
        dispatch(actions.resetCreateLedgerGroupControl());
      }, 500);
    }
  }, [createLedgerGroup]);

  useEffect(() => {
    if (deleteLedgerGroup) {
      setTimeout(() => {
        dispatch(actions.resetDeleteLedgerGroupControl());
      }, 500);
    }
  }, [deleteLedgerGroup]);

  useEffect(() => {
    if (updateLedgerGroup) {
      setTimeout(() => {
        dispatch(actions.resetUpdateLedgerGroupControl());
      }, 500);
    }
  }, [updateLedgerGroup]);

  return {
    allLedgerGroup,
    loading,
    listLoading,
    handleDelete,
    deleteLedgerGroup,
    createLedgerGroup,
    updateLedgerGroup,
    handleSubmit,
    handleUpdate,
  };
};

export default useLedgerGroup;
