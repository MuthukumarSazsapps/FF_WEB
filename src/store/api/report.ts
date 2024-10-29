import { APIRoutes } from 'utils';
import axiosInstance from './axios';

const alllistpending = async (SubscriberId: String, BranchId: String) => {
  const response = await axiosInstance
    .post(APIRoutes.pendingReport, { SubscriberId, BranchId })
    .then(result => result.data)
    .catch(err => {
      console.log('pending list api error', err);
    });

  return response ?? [];
};

const alldefaultlist = async (SubscriberId: String, BranchId: String) => {
  const response = await axiosInstance
    .post(APIRoutes.defaultReport, { SubscriberId, BranchId })
    .then(result => result.data)
    .catch(err => {
      console.log('pending list api error', err);
    });

  return response ?? [];
};

const updatePendingRemarks = async (updateData: any) => {
  const response = await axiosInstance
    .put(APIRoutes.updatePending, updateData)
    .then(result => result.data)
    .catch(err => {
      console.log('Update Api error', err);
      return;
    });
  return response?.message;
};

const pendingDocuments = async (SubscriberId: String, BranchId: String) => {
  const response = await axiosInstance
    .post(APIRoutes.documentPendings, { SubscriberId, BranchId })
    .then(result => result.data)
    .catch(err => {
      console.log('pending list api error', err);
    });

  return response ?? [];
};
const pendingDocUpdate = async (updateData: any) => {
  const response = await axiosInstance
    .post(APIRoutes.pendingDocsUpdate, updateData)
    .then(result => result.data)
    .catch(err => {
      console.log('pending list api error', err);
    });

  return response?.message;
};
export default {
  alllistpending,
  pendingDocUpdate,
  pendingDocuments,
  updatePendingRemarks,
  alldefaultlist,
};
