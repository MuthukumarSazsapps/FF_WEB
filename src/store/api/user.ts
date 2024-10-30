import axiosInstance from './axios';
import { APIRoutes } from 'utils';
import { User, UserFormFieldTypes } from 'utils/types/users.schema';
import { Menu } from 'utils/types';

const createUser = async (
  userData: UserFormFieldTypes,
  SubscriberId: string,
  menus: Menu[],
): Promise<User> => {
  const userMenus = JSON.stringify(menus);
  const response = await axiosInstance
    .post(APIRoutes.userCreate, {
      ...userData,
      SubscriberId,
      userMenus,
    })
    .then(result => result.data)
    .catch(err => {
      console.log('Create Api error', err);
      return;
    });
  return response.message;
};

const getUser = async (UserId: string) => {
  try {
    const response = await axiosInstance
      .post(APIRoutes.getUser, { UserId })
      .then(result => result.data)
      .catch(err => {
        console.log('Get User Api error', err);
        return err;
      });
    return response;
  } catch (error) {
    console.log('Error fetching User:', error);
  }
};

const listAllUsers = async (SubscriberId: string) => {
  const response = await axiosInstance
    .post(APIRoutes.usersList, { SubscriberId })
    .then(result => result.data)
    .catch(err => {
      console.log('List Api error', err);
    });
  return response ?? [];
};
const deleteUser = async (UserId: string, ModifiedBy: string) => {
  const response = await axiosInstance
    .delete(`${APIRoutes.userDelete}/${UserId}`, {
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
const updateUser = async (
  userId: string,
  SubscriberId: string,
  updateData: UserFormFieldTypes,
  sendPassword: boolean,
  menus: Menu[],
): Promise<User> => {
  const userMenus = JSON.stringify(menus);
  const response = await axiosInstance
    .put(`${APIRoutes.userUpdate}/${userId}`, {
      ...updateData,
      sendPassword,
      SubscriberId,
      userMenus,
    })
    .then(result => result.data)
    .catch(err => {
      console.log('Update Api error', err);
      return;
    });
  return response?.message;
};

export default {
  listAllUsers,
  createUser,
  deleteUser,
  updateUser,
  getUser,
};
