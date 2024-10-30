import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { actions, dispatch } from 'store';
import { RootState } from 'store/reducers';
import { Branch, BranchFormFieldTypes } from 'utils/types';
import useLocalData from './use-localData';

type UseBranchReturn = {
  allBranches: Branch[];
  loading?: boolean;
  listLoading?: boolean;
  createBranchState?: string;
  deleteBranchState?: string;
  updateBranchState?: string;
  handleSubmit: (data: BranchFormFieldTypes) => void;
  handleDelete: (data: string) => void;
  handleUpdate: (id: string, data: BranchFormFieldTypes) => void;
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

const useBranches = (apiFlags = defaultAPIFlags): UseBranchReturn => {
  const allBranches = useSelector<RootState, Branch[]>(state => state.branches.list);
  const listLoading = useSelector<RootState, boolean>(state => state.branches.listAPI.loading);
  const createLoading = useSelector<RootState, boolean>(state => state.branches.createAPI.loading);
  const updateLoading = useSelector<RootState, boolean>(state => state.branches.updateAPI.loading);
  const deleteLoading = useSelector<RootState, boolean>(state => state.branches.deleteAPI.loading);
  const loading = listLoading || createLoading || updateLoading || deleteLoading;
  const createBranchState = useSelector<RootState, string>(
    state => state.branches.createAPI.success || '',
  );
  const deleteBranchState = useSelector<RootState, string>(
    state => state.branches.deleteAPI.success || '',
  );
  const updateBranchState = useSelector<RootState, string>(
    state => state.branches.updateAPI.success || '',
  );
  const { subscriber } = useLocalData();

  useEffect(() => {
    if (apiFlags.list && subscriber) {
      dispatch(actions.listBranchesRequest({ SubscriberId: subscriber }));
    }
  }, [createBranchState, deleteBranchState, updateBranchState, subscriber]);
  const handleSubmit = (formData: BranchFormFieldTypes) => {
    if (apiFlags.create) {
      dispatch(actions.createBranchRequest({ SubscriberId: subscriber, branchData: formData }));
    }
  };

  const handleUpdate = (id: string, formData: BranchFormFieldTypes) => {
    if (apiFlags.edit) {
      dispatch(
        actions.updateBranchRequest({
          BranchId: id,
          updateData: { ...formData, SubscriberId: subscriber },
        }),
      );
    }
  };

  const handleDelete = (id: string) => {
    if (apiFlags.remove) {
      dispatch(actions.deleteBranchRequest({ BranchId: id, ModifiedBy: subscriber }));
    }
  };

  useEffect(() => {
    if (createBranchState) {
      setTimeout(() => {
        dispatch(actions.resetCreateBranchControl());
      }, 500);
    }
  }, [createBranchState]);
  useEffect(() => {
    if (updateBranchState) {
      setTimeout(() => {
        dispatch(actions.resetUpdateBranchControl());
      }, 500);
    }
  }, [updateBranchState]);
  useEffect(() => {
    if (deleteBranchState) {
      setTimeout(() => {
        dispatch(actions.resetDeleteBranchControl());
      }, 500);
    }
  }, [deleteBranchState]);
  return {
    allBranches,
    loading,
    listLoading,
    handleDelete,
    deleteBranchState,
    createBranchState,
    updateBranchState,
    handleSubmit,
    handleUpdate,
  };
};

export default useBranches;
