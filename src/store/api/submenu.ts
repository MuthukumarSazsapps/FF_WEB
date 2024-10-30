import axiosInstance from './axios';
import { APIRoutes } from 'utils';
import { SubMenu, SubMenuFormFieldTypes } from 'utils/types';

const createSubMenu = async (
  subMenuData: SubMenuFormFieldTypes,
  CreatedBy: string,
): Promise<SubMenu> => {
  const response = await axiosInstance
    .post(APIRoutes.subMenuCreate, { ...subMenuData, CreatedBy })
    .then(result => result.data)
    .catch(err => {
      console.log('Create Api error', err);
      return;
    });
  return response.message;
};

const getSubMenu = async (subMenuId: string) => {
  try {
    const response = await axiosInstance
      .post(APIRoutes.getSubMenu, { subMenuId })
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

const listAllSubMenus = async () => {
  const response = await axiosInstance
    .get(APIRoutes.subMenuList)
    .then(result => result.data)
    .catch(err => {
      console.log('List Api error', err);
    });
  return response ?? [];
};
const deleteSubMenu = async (SubMenuId: string, ModifiedBy: string) => {
  const response = await axiosInstance
    .delete(`${APIRoutes.subMenuDelete}/${SubMenuId}`, {
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
const updateSubMenu = async (
  SubMenuId: string,
  updateData: SubMenuFormFieldTypes,
  ModifiedBy: string,
): Promise<SubMenu> => {
  const response = await axiosInstance
    .put(`${APIRoutes.subMenuUpdate}/${SubMenuId}`, { ...updateData, ModifiedBy })
    .then(result => result.data)
    .catch(err => {
      console.log('Update Api error', err);
      return;
    });
  return response?.message;
};

export default {
  listAllSubMenus,
  createSubMenu,
  deleteSubMenu,
  updateSubMenu,
  getSubMenu,
};
