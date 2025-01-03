import axiosInstance from './axios';
import { APIRoutes } from 'utils';
import { DueEntry, DueEntryFormFieldTypes } from 'utils/types';

const getDue = async (LoanId: string) => {
  try {
    const response = await axiosInstance
      .post(APIRoutes.currentDue, { LoanId })
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

const updateDue = async (LoanId: string, formData: DueEntryFormFieldTypes): Promise<DueEntry> => {
  const response = await axiosInstance

    .post(`${APIRoutes.dueEntry}/${LoanId}`, formData)
    .then(result => result.data)
    .catch(err => {
      console.log('Update Api error', err);
      return;
    });
  return response?.message;
};
const deleteDue = async (LoanId: string, Installment: string, ModifiedBy: String) => {
  const response = await axiosInstance
    .post(APIRoutes.dueDelete, { LoanId, Installment, ModifiedBy })
    .then(result => result.data)
    .catch(err => {
      console.log('Update Api error', err);
      return;
    });
  return response?.message;
};

const listPendingDues = async (SubscriberId: string, BranchId: string) => {
  const response = await axiosInstance
    .post(APIRoutes.pendingdueList, { SubscriberId, BranchId })
    .then(result => result.data)
    .catch(err => {
      console.log('List Api error', err);
    });
  return response ?? [];
};
const getDayReport = async (data: any) => {
  const response = await axiosInstance
    .post(APIRoutes.dayReport, data)
    .then(result => result.data)
    .catch(err => {
      console.log('List Api error', err);
    });
  return response ?? [];
};

export const getPrecloseAmount = async (LoanId: string, Interest: string) => {
  const response = await axiosInstance
    .post(APIRoutes.preclosecal, { LoanId, Interest })
    .then(result => result.data)
    .catch(err => {
      console.log('List Api error', err);
    });
  return response ?? [];
};
export const precloseLoan = async (formData: DueEntryFormFieldTypes) => {
  const response = await axiosInstance
    .post(APIRoutes.preclose, formData)
    .then(result => result.data)
    .catch(err => {
      console.log('List Api error', err);
    });
  return response?.message;
};
export default {
  getDue,
  getDayReport,
  updateDue,
  deleteDue,
  listPendingDues,
  getPrecloseAmount,
  precloseLoan,
};
