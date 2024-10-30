import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { actions, dispatch } from 'store';
import { RootState } from 'store/reducers';
import { Loan, LoanFormFieldTypes } from 'utils/types';
import useLocalData from './use-localData';

type UseLoanReturn = {
  allLoans: Loan[];
  loading?: boolean;
  listLoading?: boolean;
  createLoanState?: string;
  deleteLoanState?: string;
  updateLoanState?: string;
  handleSubmit: (data: LoanFormFieldTypes) => void;
  handleDelete: (data: string) => void;
  handleUpdate: (id: string, data: LoanFormFieldTypes) => void;
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

const useLoans = (apiFlags = defaultAPIFlags): UseLoanReturn => {
  const allLoans = useSelector<RootState, Loan[]>(state => state.loans.list);
  const listLoading = useSelector<RootState, boolean>(state => state.loans.listAPI.loading);
  const createLoading = useSelector<RootState, boolean>(state => state.loans.createAPI.loading);
  const updateLoading = useSelector<RootState, boolean>(state => state.loans.updateAPI.loading);
  const deleteLoading = useSelector<RootState, boolean>(state => state.loans.deleteAPI.loading);
  const loading = listLoading || createLoading || updateLoading || deleteLoading;
  const createLoanState = useSelector<RootState, string>(
    state => state.loans.createAPI.success || '',
  );
  const deleteLoanState = useSelector<RootState, string>(
    state => state.loans.deleteAPI.success || '',
  );
  const updateLoanState = useSelector<RootState, string>(
    state => state.loans.updateAPI.success || '',
  );
  const { subscriber, branch, username } = useLocalData();

  useEffect(() => {
    if (apiFlags.list && subscriber) {
      dispatch(
        actions.listLoansRequest({
          SubscriberId: subscriber,
          BranchId: branch,
        }),
      );
    }
  }, [createLoanState, deleteLoanState, updateLoanState, subscriber]);
  const handleSubmit = (formData: LoanFormFieldTypes) => {
    if (apiFlags.create) {
      dispatch(
        actions.createLoanRequest({
          LoanData: {
            ...formData,
            CreatedBy: username,
            SubscriberId: subscriber,
          },
        }),
      );
    }
  };

  const handleUpdate = (id: string, formData: LoanFormFieldTypes) => {
    if (apiFlags.edit) {
      dispatch(
        actions.updateLoanRequest({
          LoanId: id,
          updateData: { ...formData, ModifiedBy: username },
        }),
      );
    }
  };

  const handleDelete = (id: string) => {
    if (apiFlags.remove) {
      dispatch(actions.deleteLoanRequest({ LoanId: id, ModifiedBy: username }));
    }
  };

  useEffect(() => {
    if (createLoanState) {
      setTimeout(() => {
        dispatch(actions.resetCreateLoanControl());
      }, 500);
    }
  }, [createLoanState]);
  useEffect(() => {
    if (updateLoanState) {
      setTimeout(() => {
        dispatch(actions.resetUpdateLoanControl());
      }, 500);
    }
  }, [updateLoanState]);
  useEffect(() => {
    if (deleteLoanState) {
      setTimeout(() => {
        dispatch(actions.resetDeleteLoanControl());
      }, 500);
    }
  }, [deleteLoanState]);
  return {
    allLoans,
    loading,
    listLoading,
    handleDelete,
    deleteLoanState,
    createLoanState,
    updateLoanState,
    handleSubmit,
    handleUpdate,
  };
};

export default useLoans;
