import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { actions, dispatch } from 'store';
import { RootState } from 'store/reducers';
import { SubMenu, SubMenuFormFieldTypes } from 'utils/types';
import useLocalData from './use-localData';

type UseSubMenuReturn = {
  allSubMenus: SubMenu[];
  listLoading: boolean;
  loading: boolean;
  createSubMenuState?: string;
  deleteSubMenuState?: string;
  updateSubMenuState?: string;
  handleSubmit: (data: SubMenuFormFieldTypes) => void;
  handleDelete: (id: string) => void;
  handleUpdate: (id: string, data: SubMenuFormFieldTypes) => void;
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

const useSubMenus = (apiFlags = defaultAPIFlags): UseSubMenuReturn => {
  const allSubMenus = useSelector<RootState, SubMenu[]>(state => state.submenus.list);
  const listLoading = useSelector<RootState, boolean>(state => state.submenus.listAPI.loading);
  const createLoading = useSelector<RootState, boolean>(state => state.submenus.createAPI.loading);
  const updateLoading = useSelector<RootState, boolean>(state => state.submenus.updateAPI.loading);
  const deleteLoading = useSelector<RootState, boolean>(state => state.submenus.deleteAPI.loading);
  const loading = listLoading || createLoading || updateLoading || deleteLoading;
  const { username } = useLocalData();

  const createSubMenuState = useSelector<RootState, string>(
    state => state.submenus.createAPI.success || '',
  );
  const deleteSubMenuState = useSelector<RootState, string>(
    state => state.submenus.deleteAPI.success || '',
  );
  const updateSubMenuState = useSelector<RootState, string>(
    state => state.submenus.updateAPI.success || '',
  );

  useEffect(() => {
    if (apiFlags.list) {
      dispatch(actions.listSubMenusRequest());
    }
  }, [createSubMenuState, deleteSubMenuState, updateSubMenuState]);

  const handleSubmit = (formData: SubMenuFormFieldTypes) => {
    if (apiFlags.create) {
      dispatch(actions.createSubMenuRequest({ subMenuData: formData, CreatedBy: username }));
    }
  };

  const handleUpdate = (SubMenuId: string, formData: SubMenuFormFieldTypes) => {
    if (apiFlags.edit) {
      dispatch(
        actions.updateSubMenuRequest({
          SubMenuId: SubMenuId,
          updateData: formData,
          ModifiedBy: username,
        }),
      );
    }
  };

  const handleDelete = (SubMenuId: string) => {
    if (apiFlags.remove) {
      dispatch(actions.deleteSubMenuRequest({ SubMenuId: SubMenuId, ModifiedBy: username }));
    }
  };

  useEffect(() => {
    if (createSubMenuState) {
      setTimeout(() => {
        dispatch(actions.resetCreateSubMenuState());
      }, 500);
    }
  }, [createSubMenuState]);

  useEffect(() => {
    if (updateSubMenuState) {
      setTimeout(() => {
        dispatch(actions.resetUpdateSubMenuState());
      }, 500);
    }
  }, [updateSubMenuState]);

  useEffect(() => {
    if (deleteSubMenuState) {
      setTimeout(() => {
        dispatch(actions.resetDeleteSubMenuState());
      }, 500);
    }
  }, [deleteSubMenuState]);

  return {
    allSubMenus,
    listLoading,
    loading,
    handleDelete,
    deleteSubMenuState,
    createSubMenuState,
    updateSubMenuState,
    handleSubmit,
    handleUpdate,
  };
};

export default useSubMenus;
