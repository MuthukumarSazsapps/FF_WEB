import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { actions, dispatch } from 'store';
import { RootState } from 'store/reducers';
import { ShowRoom, ShowRoomFormFieldTypes } from 'utils/types';
import useLocalData from './use-localData';

type UseShowRoomReturn = {
  allShowRooms: ShowRoom[];
  loading?: boolean;
  listLoading?: boolean;
  createShowRoomState?: string;
  deleteShowRoomState?: string;
  updateShowRoomState?: string;
  handleSubmit: (data: ShowRoomFormFieldTypes) => void;
  handleDelete: (data: string) => void;
  handleUpdate: (id: string, data: ShowRoomFormFieldTypes) => void;
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

const useShowRooms = (apiFlags = defaultAPIFlags): UseShowRoomReturn => {
  const allShowRooms = useSelector<RootState, ShowRoom[]>(state => state.showrooms.list);
  const listLoading = useSelector<RootState, boolean>(state => state.showrooms.listAPI.loading);
  const createLoading = useSelector<RootState, boolean>(state => state.showrooms.createAPI.loading);
  const updateLoading = useSelector<RootState, boolean>(state => state.showrooms.updateAPI.loading);
  const deleteLoading = useSelector<RootState, boolean>(state => state.showrooms.deleteAPI.loading);
  const loading = listLoading || createLoading || updateLoading || deleteLoading;
  const createShowRoomState = useSelector<RootState, string>(
    state => state.showrooms.createAPI.success || '',
  );
  const deleteShowRoomState = useSelector<RootState, string>(
    state => state.showrooms.deleteAPI.success || '',
  );
  const updateShowRoomState = useSelector<RootState, string>(
    state => state.showrooms.updateAPI.success || '',
  );
  const { subscriber, branch, username } = useLocalData();

  useEffect(() => {
    if (apiFlags.list && subscriber) {
      dispatch(
        actions.listShowRoomsRequest({
          SubscriberId: subscriber,
          BranchId: branch,
        }),
      );
    }
  }, [createShowRoomState, deleteShowRoomState, updateShowRoomState, subscriber]);
  const handleSubmit = (formData: ShowRoomFormFieldTypes) => {
    if (apiFlags.create) {
      dispatch(
        actions.createShowRoomRequest({
          ShowRoomData: {
            ...formData,
            CreatedBy: username,
            SubscriberId: subscriber,
          },
        }),
      );
    }
  };

  const handleUpdate = (id: string, formData: ShowRoomFormFieldTypes) => {
    if (apiFlags.edit) {
      dispatch(
        actions.updateShowRoomRequest({
          ShowRoomId: id,
          updateData: { ...formData, ModifiedBy: username },
        }),
      );
    }
  };

  const handleDelete = (id: string) => {
    if (apiFlags.remove) {
      dispatch(actions.deleteShowRoomRequest({ ShowRoomId: id, ModifiedBy: username }));
    }
  };

  useEffect(() => {
    if (createShowRoomState) {
      setTimeout(() => {
        dispatch(actions.resetCreateShowRoomControl());
      }, 500);
    }
  }, [createShowRoomState]);
  useEffect(() => {
    if (updateShowRoomState) {
      setTimeout(() => {
        dispatch(actions.resetUpdateShowRoomControl());
      }, 500);
    }
  }, [updateShowRoomState]);
  useEffect(() => {
    if (deleteShowRoomState) {
      setTimeout(() => {
        dispatch(actions.resetDeleteShowRoomControl());
      }, 500);
    }
  }, [deleteShowRoomState]);
  return {
    allShowRooms,
    loading,
    listLoading,
    handleDelete,
    deleteShowRoomState,
    createShowRoomState,
    updateShowRoomState,
    handleSubmit,
    handleUpdate,
  };
};

export default useShowRooms;
