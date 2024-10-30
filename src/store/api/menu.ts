import axiosInstance from './axios';
import { APIRoutes } from 'utils';
import { Menu, MenuFormFieldTypes } from 'utils/types';

const createMenu = async (menuData: MenuFormFieldTypes, CreatedBy: string): Promise<Menu> => {
  const response = await axiosInstance
    .post(APIRoutes.menuCreate, { ...menuData, CreatedBy })
    .then(result => result.data)
    .catch(err => {
      console.log('Create Api error', err);
      return;
    });
  return response.message;
};

const getMenu = async (menuId: string) => {
  try {
    const response = await axiosInstance
      .post(APIRoutes.getMenu, { menuId })
      .then(result => result.data)
      .catch(err => {
        console.log('Get Menu Api error', err);
        return err;
      });
    return response;
  } catch (error) {
    console.log('Error fetching Menu:', error);
  }
};

const listAllMenus = async (userId: string) => {
  const response = await axiosInstance
    .post(APIRoutes.menuList, { userId })
    .then(result => result.data)
    .catch(err => {
      console.log('List Api error', err);
    });
  return response ?? [];
};
const deleteMenu = async (MenuId: string, ModifiedBy: string) => {
  const response = await axiosInstance
    .delete(`${APIRoutes.menuDelete}/${MenuId}`, {
      data: {
        ModifiedBy: ModifiedBy,
      },
    })
    .then(result => result.data)
    .catch(err => {
      console.log('Delete Api error', err);
      return;
    });
  return response?.message;
};
const updateMenu = async (
  MenuId: string,
  updateData: MenuFormFieldTypes,
  ModifiedBy: string,
): Promise<Menu> => {
  const response = await axiosInstance
    .put(`${APIRoutes.menuUpdate}/${MenuId}`, { ...updateData, ModifiedBy })
    .then(result => result.data)
    .catch(err => {
      console.log('Update Api error', err);
      return;
    });
  return response?.message;
};

export default {
  listAllMenus,
  createMenu,
  deleteMenu,
  updateMenu,
  getMenu,
};
