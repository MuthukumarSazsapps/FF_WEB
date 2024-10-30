import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { actions, dispatch } from 'store';
import { RootState } from 'store/reducers';
import { User, UserFormFieldTypes } from 'utils/types/users.schema';
import { Menu } from 'utils/types';
import useLocalData from './use-localData';

type UseUserReturn = {
  allUsers: User[];
  loading: boolean;
  getLoading: boolean;
  loginUser: User;
  listLoading: boolean;
  createUserState?: string;
  deleteUserState?: string;
  updateUserState?: string;
  handleSubmit: (data: UserFormFieldTypes, menus: Menu[]) => void;
  handleDelete: (data: string) => void;
  handleUpdate: (
    id: string,
    data: UserFormFieldTypes,
    sendPassword: boolean,
    menus: Menu[],
  ) => void;
};

interface APIFlags {
  list?: boolean;
  get?: boolean;
  profile?: boolean;
  create?: boolean;
  edit?: boolean;
  remove?: boolean;
}

const defaultAPIFlags: APIFlags = {
  list: false,
  get: false,
  profile: false,
  create: false,
  edit: false,
  remove: false,
};

const useUsers = (apiFlags = defaultAPIFlags): UseUserReturn => {
  const allUsers = useSelector<RootState, User[]>(state => state.users.list);
  const loginUser = useSelector<RootState, User>(state => state.users.user);
  const getLoading = useSelector<RootState, boolean>(state => state.users.getApi.loading);
  const listLoading = useSelector<RootState, boolean>(state => state.users.listAPI.loading);
  const createLoading = useSelector<RootState, boolean>(state => state.users.createAPI.loading);
  const updateLoading = useSelector<RootState, boolean>(state => state.users.updateAPI.loading);
  const deleteLoading = useSelector<RootState, boolean>(state => state.users.deleteAPI.loading);
  const loading = listLoading || createLoading || updateLoading || deleteLoading;
  const { branch, subscriber, username } = useLocalData();
  const createUserState = useSelector<RootState, string>(
    state => state.users.createAPI.success || '',
  );
  const deleteUserState = useSelector<RootState, string>(
    state => state.users.deleteAPI.success || '',
  );
  const updateUserState = useSelector<RootState, string>(
    state => state.users.updateAPI.success || '',
  );

  useEffect(() => {
    if (apiFlags.list && subscriber) {
      dispatch(actions.listUsersRequest(subscriber));
    }
  }, [createUserState, deleteUserState, updateUserState, subscriber]);
  const handleSubmit = (formData: UserFormFieldTypes, menus: Menu[]) => {
    if (apiFlags.create) {
      dispatch(
        actions.createUserRequest({
          formData,
          SubscriberId: subscriber,
          menus,
        }),
      );
    }
  };

  const handleUpdate = (
    id: string,
    formData: UserFormFieldTypes,
    sendPassword: boolean,
    menus: Menu[],
  ) => {
    if (apiFlags.edit) {
      dispatch(
        actions.updateUserRequest({
          userId: id,
          SubscriberId: subscriber,
          updateData: formData,
          menus,
          sendPassword,
        }),
      );
    }
  };

  const handleDelete = (userId: string) => {
    if (apiFlags.remove) {
      dispatch(actions.deleteUserRequest({ userId, email: username }));
    }
  };

  useEffect(() => {
    if (createUserState) {
      setTimeout(() => {
        dispatch(actions.resetCreateUserState());
      }, 500);
    }
  }, [createUserState]);
  useEffect(() => {
    if (updateUserState) {
      setTimeout(() => {
        dispatch(actions.resetUpdateUserState());
      }, 500);
    }
  }, [updateUserState]);
  useEffect(() => {
    if (deleteUserState) {
      setTimeout(() => {
        dispatch(actions.resetDeleteUserState());
      }, 500);
    }
  }, [deleteUserState]);
  return {
    allUsers,
    loading,
    getLoading,
    listLoading,
    loginUser,
    handleDelete,
    deleteUserState,
    createUserState,
    updateUserState,
    handleSubmit,
    handleUpdate,
  };
};

export default useUsers;
