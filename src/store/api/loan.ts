import axiosInstance from './axios';
import { APIRoutes } from 'utils';
import { Loan, LoanFormFieldTypes } from 'utils/types';

const listAllLoans = async (SubscriberId: string, BranchId: string) => {
  const response = await axiosInstance
    .post(APIRoutes.loanList, { SubscriberId, BranchId })
    .then(result => result.data)
    .catch(err => {
      console.log('List Api error', err);
    });
  return response ?? [];
};

const createLoan = async (LoanData: LoanFormFieldTypes): Promise<Loan> => {
  const response = await axiosInstance
    .post(APIRoutes.loanCreate, LoanData)
    .then(result => result.data)
    .catch(err => {
      console.log('Create Api error', err);
      return;
    });
  return response.message;
};

const updateLoan = async (LoanId: string, updateData: LoanFormFieldTypes): Promise<Loan> => {
  const response = await axiosInstance
    .put(`${APIRoutes.loanUpdate}/${LoanId}`, updateData)
    .then(result => result.data)
    .catch(err => {
      console.log('Update Api error', err);
      return;
    });
  return response?.message;
};

const deleteLoan = async (LoanId: string, ModifiedBy: string) => {
  const response = await axiosInstance
    .delete(`${APIRoutes.loanDelete}/${LoanId}`, {
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
  listAllLoans,
  createLoan,
  deleteLoan,
  updateLoan,
};
