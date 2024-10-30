import axiosInstance from './axios';
import { APIRoutes } from 'utils';
import { ShowRoom, ShowRoomFormFieldTypes } from 'utils/types';

const listAllShowRooms = async (SubscriberId: string, BranchId: string) => {
  const response = await axiosInstance
    .post(APIRoutes.showroomList, { SubscriberId, BranchId })
    .then(result => result.data)
    .catch(err => {
      console.log('List Api error', err);
    });
  return response ?? [];
};

const createShowRoom = async (ShowRoomData: ShowRoomFormFieldTypes): Promise<ShowRoom> => {
  const response = await axiosInstance
    .post(APIRoutes.showroomCreate, ShowRoomData)
    .then(result => result.data)
    .catch(err => {
      console.log('Create Api error', err);
      return;
    });
  return response.message;
};

const updateShowRoom = async (
  ShowRoomId: string,
  updateData: ShowRoomFormFieldTypes,
): Promise<ShowRoom> => {
  const response = await axiosInstance
    .put(`${APIRoutes.showroomUpdate}/${ShowRoomId}`, updateData)
    .then(result => result.data)
    .catch(err => {
      console.log('Update Api error', err);
      return;
    });
  return response?.message;
};

const deleteShowRoom = async (ShowRoomId: string, ModifiedBy: string) => {
  const response = await axiosInstance
    .delete(`${APIRoutes.showroomDelete}/${ShowRoomId}`, {
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

export default {
  listAllShowRooms,
  createShowRoom,
  deleteShowRoom,
  updateShowRoom,
};
