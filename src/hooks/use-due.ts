import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { actions, dispatch } from 'store';
import { RootState } from 'store/reducers';
import {
  DueEntry,
  DueEntryFormFieldTypes,
  PrecloseLoan,
  PrecloseLoanFormFieldTypes,
} from 'utils/types';
import { PrecloseFormFieldTypes } from 'utils/types/preclose.schema';
import useLocalData from './use-localData';

type UseDueReturn = {
  getLoading?: boolean;
  listLoading?: boolean;
  updateLoading?: boolean;
  deleteLoading?: boolean;
  getDayReportLoading?: boolean;
  getPrecloseLoading?: boolean;
  precloseLoanLoading?: boolean;
  dueEntryState?: string;
  precloseState?: string;
  dueDeleteState?: string;
  pendingDues?: DueEntry[];
  precloseDetails: PrecloseLoan;
  currentDue: DueEntryFormFieldTypes;
  dayReportData: any;
  getDue: (id: string) => void;
  getDayReport: (data: any) => void;
  deleteDue: (LoanId: string, Installment: string) => void;
  getPrecloseAmount: (precloseData: PrecloseFormFieldTypes) => void;
  precloseLoan: (formData: PrecloseLoanFormFieldTypes) => void;
  handleSubmit: (id: string, data: DueEntryFormFieldTypes) => void;
};
interface APIFlags {
  list?: boolean;
  edit?: boolean;
  preclose?: boolean;
  loanPreclose?: boolean;
}

const defaultAPIFlags: APIFlags = {
  edit: false,
  list: false,
  preclose: false,
  loanPreclose: false,
};

const useDue = (apiFlags = defaultAPIFlags): UseDueReturn => {
  const pendingDues = useSelector<RootState, DueEntry[]>(state => state.dues.pendingDueList);
  const updateLoading = useSelector<RootState, boolean>(state => state.dues.updateAPI.loading);
  const deleteLoading = useSelector<RootState, boolean>(state => state.dues.deleteAPI.loading);
  const getLoading = useSelector<RootState, boolean>(state => state.dues.getApi.loading);
  const getDayReportLoading = useSelector<RootState, boolean>(
    state => state.dues.dayReportAPI.loading,
  );
  const dayReportData = useSelector<RootState, boolean>(state => state.dues.dayReportData);
  const getPrecloseLoading = useSelector<RootState, boolean>(
    state => state.dues.precloseAPI.loading,
  );
  const listLoading = useSelector<RootState, boolean>(state => state.dues.listAPI.loading);
  const currentDue = useSelector<RootState, DueEntryFormFieldTypes>(state => state.dues.due);
  const precloseDetails = useSelector<RootState, PrecloseLoan>(state => state.dues.precloseData);
  const dueEntryState = useSelector<RootState, string>(state => state.dues.updateAPI.success || '');
  const dueDeleteState = useSelector<RootState, string>(
    state => state.dues.deleteAPI.success || '',
  );
  const precloseState = useSelector<RootState, string>(
    state => state.dues.precloseLoanAPI.success || '',
  );
  const precloseLoanLoading = useSelector<RootState, boolean>(
    state => state.dues.precloseLoanAPI.loading,
  );
  const { subscriber, branch, username } = useLocalData();

  const handleSubmit = (LoanId: string, formData: DueEntryFormFieldTypes) => {
    if (apiFlags.edit) {
      dispatch(
        actions.updateDueRequest({ LoanId, formData: { ...formData, ModifiedBy: username } }),
      );
    }
  };
  const getDayReport = (data: any) => {
    dispatch(actions.getDayReportRequest({ SubscriberId: subscriber, BranchId: branch, ...data }));
  };
  const getPrecloseAmount = (precloseData: PrecloseFormFieldTypes) => {
    if (apiFlags.preclose) {
      dispatch(actions.getPrecloseRequest({ ...precloseData }));
    }
  };
  const precloseLoan = (formData: PrecloseLoanFormFieldTypes) => {
    if (apiFlags.loanPreclose) {
      dispatch(actions.precloseLoanRequest({ ...formData, ModifiedBy: username }));
    }
  };

  useEffect(() => {
    if (apiFlags.list && subscriber) {
      dispatch(
        actions.listPendingDuesRequest({
          SubscriberId: subscriber,
          BranchId: branch,
        }),
      );
    }
  }, [apiFlags.list]);

  const getDue = (LoanId: string) => {
    dispatch(actions.getDueRequest(LoanId));
  };

  const deleteDue = (LoanId: string, Installment: string) => {
    dispatch(actions.deleteDueRequest({ LoanId, Installment }));
  };

  useEffect(() => {
    if (dueEntryState) {
      setTimeout(() => {
        dispatch(actions.resetUpdateDueControl());
      }, 500);
    }
  }, [dueEntryState]);

  useEffect(() => {
    if (dueDeleteState) {
      setTimeout(() => {
        dispatch(actions.resetDeleteDueControl());
      }, 500);
    }
  }, [dueDeleteState]);
  useEffect(() => {
    if (precloseState) {
      setTimeout(() => {
        dispatch(actions.resetprecloseLoanControl());
      }, 500);
    }
  }, [precloseState]);
  return {
    getLoading,
    dayReportData,
    getDue,
    deleteDue,
    dueDeleteState,
    precloseLoan,
    precloseDetails,
    getPrecloseAmount,
    getDayReportLoading,
    listLoading,
    deleteLoading,
    precloseLoanLoading,
    precloseState,
    getPrecloseLoading,
    pendingDues,
    updateLoading,
    currentDue,
    getDayReport,
    dueEntryState,
    handleSubmit,
  };
};

export default useDue;
