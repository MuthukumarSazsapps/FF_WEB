import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { actions, dispatch } from 'store';
import { RootState } from 'store/reducers';
import { Menu, MenuFormFieldTypes } from 'utils/types';
import useLocalData from './use-localData';

type UseMenuReturn = {
  allMenus: Menu[];
  loading: boolean;
  listLoading: boolean;
  createMenuState?: string;
  deleteMenuState?: string;
  updateMenuState?: string;
  handleSubmit: (data: MenuFormFieldTypes) => void;
  handleDelete: (id: string) => void;
  handleUpdate: (id: string, data: MenuFormFieldTypes) => void;
};

interface useMenuProps {
  list?: boolean;
  profile?: boolean;
  create?: boolean;
  edit?: boolean;
  remove?: boolean;
  userId?: string;
  role?: string;
}

const defaultAPIFlags: useMenuProps = {
  list: false,
  profile: false,
  create: false,
  edit: false,
  remove: false,
};

const useMenus = ({
  list = false,
  create = false,
  edit = false,
  remove = false,
  profile = false,
  userId,
  role,
}: useMenuProps): UseMenuReturn => {
  const allMenus = useSelector<RootState, Menu[]>(state => state.menus.list);
  const listLoading = useSelector<RootState, boolean>(state => state.menus.listAPI.loading);
  const createLoading = useSelector<RootState, boolean>(state => state.menus.createAPI.loading);
  const updateLoading = useSelector<RootState, boolean>(state => state.menus.updateAPI.loading);
  const deleteLoading = useSelector<RootState, boolean>(state => state.menus.deleteAPI.loading);
  const loading = listLoading || createLoading || updateLoading || deleteLoading;
  const { username } = useLocalData();
  const createMenuState = useSelector<RootState, string>(
    state => state.menus.createAPI.success || '',
  );
  const deleteMenuState = useSelector<RootState, string>(
    state => state.menus.deleteAPI.success || '',
  );
  const updateMenuState = useSelector<RootState, string>(
    state => state.menus.updateAPI.success || '',
  );

  useEffect(() => {
    if (list) {
      dispatch(actions.listMenusRequest({ userId }));
    }
  }, [createMenuState, deleteMenuState, updateMenuState]);

  const handleSubmit = (formData: MenuFormFieldTypes) => {
    if (create) {
      dispatch(actions.createMenuRequest({ menuData: formData, CreatedBy: username }));
    }
  };

  const handleUpdate = (MenuId: string, formData: MenuFormFieldTypes) => {
    if (edit) {
      dispatch(
        actions.updateMenuRequest({
          MenuId: MenuId,
          updateData: formData,
          ModifiedBy: username,
        }),
      );
    }
  };

  const handleDelete = (MenuId: string) => {
    if (remove) {
      dispatch(actions.deleteMenuRequest({ MenuId: MenuId, ModifiedBy: username }));
    }
  };

  useEffect(() => {
    if (createMenuState) {
      setTimeout(() => {
        dispatch(actions.resetCreateMenuState());
      }, 500);
    }
  }, [createMenuState]);

  useEffect(() => {
    if (updateMenuState) {
      setTimeout(() => {
        dispatch(actions.resetUpdateMenuState());
      }, 500);
    }
  }, [updateMenuState]);

  useEffect(() => {
    if (deleteMenuState) {
      setTimeout(() => {
        dispatch(actions.resetDeleteMenuState());
      }, 500);
    }
  }, [deleteMenuState]);

  return {
    allMenus,
    loading,
    listLoading,
    handleDelete,
    deleteMenuState,
    createMenuState,
    updateMenuState,
    handleSubmit,
    handleUpdate,
  };
};

export default useMenus;
