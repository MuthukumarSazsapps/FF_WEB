import axiosInstance from './axios';
import { APIRoutes } from 'utils';
import { Branch, BranchFormFieldTypes } from 'utils/types';

const createBranch = async (
  SubscriberId: string,
  branchData: BranchFormFieldTypes,
): Promise<Branch> => {
  const response = await axiosInstance
    .post(APIRoutes.branchCreate, {
      ...branchData,
      SubscriberId,
    })
    .then(result => result.data)
    .catch(err => {
      console.log('Create Api error', err);
      return;
    });
  return response.message;
};

const listAllBranches = async (SubscriberId: string) => {
  const response = await axiosInstance
    .post(APIRoutes.branchList, { SubscriberId })
    .then(result => result.data)
    .catch(err => {
      console.log('List Api error', err);
    });
  return response ?? [];
};
const deleteBranch = async (BranchId: string, ModifiedBy: string) => {
  const response = await axiosInstance
    .delete(`${APIRoutes.branchDelete}/${BranchId}`, {
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
const updateBranch = async (
  BranchId: string,
  updateData: BranchFormFieldTypes,
): Promise<Branch> => {
  const response = await axiosInstance
    .put(`${APIRoutes.branchUpdate}/${BranchId}`, updateData)
    .then(result => result.data)
    .catch(err => {
      console.log('Update Api error', err);
      return;
    });
  return response?.message;
};

export default {
  listAllBranches,
  createBranch,
  deleteBranch,
  updateBranch,
};
