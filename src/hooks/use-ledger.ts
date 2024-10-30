import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { actions, dispatch } from 'store';
import { RootState } from 'store/reducers';
import { Ledger, LedgerFormFieldTypes } from 'utils/types';
import useLocalData from './use-localData';

type UseLedgerReturn = {
  allLedger: Ledger[];
  loading: boolean;
  listLedgerLoading: boolean;
  createLedger?: string;
  deleteLedger?: string;
  updateLedger?: string;
  handleSubmit: (data: LedgerFormFieldTypes) => void;
  handleDelete: (id: string) => void;
  handleUpdate: (id: string, data: LedgerFormFieldTypes) => void;
};

interface APIFlags {
  list?: boolean;
  profile?: boolean;
  create?: boolean;
  edit?: boolean;
  remove?: boolean;
  report?: boolean;
}

const defaultAPIFlags: APIFlags = {
  list: false,
  profile: false,
  create: false,
  edit: false,
  remove: false,
  report: false,
};

const useLedger = (apiFlags = defaultAPIFlags): UseLedgerReturn => {
  const allLedger = useSelector<RootState, Ledger[]>(state => state.Ledger.list);
  const listLedgerLoading = useSelector<RootState, boolean>(state => state.Ledger.listAPI.loading);
  const createLoading = useSelector<RootState, boolean>(state => state.Ledger.createAPI.loading);
  const updateLoading = useSelector<RootState, boolean>(state => state.Ledger.updateAPI.loading);
  const deleteLoading = useSelector<RootState, boolean>(state => state.Ledger.deleteAPI.loading);
  const loading = listLedgerLoading || createLoading || updateLoading || deleteLoading;
  const createLedger = useSelector<RootState, string>(
    state => state.Ledger.createAPI.success || '',
  );
  const deleteLedger = useSelector<RootState, string>(
    state => state.Ledger.deleteAPI.success || '',
  );
  const updateLedger = useSelector<RootState, string>(
    state => state.Ledger.updateAPI.success || '',
  );
  const { username, subscriber, branch } = useLocalData();

  useEffect(() => {
    if (apiFlags.list) {
      dispatch(
        actions.listLedgerRequest({
          SubscriberId: subscriber,
          BranchId: branch,
        }),
      );
    }
  }, [createLedger, deleteLedger, updateLedger]);

  useEffect(() => {
    if (apiFlags.report) {
      dispatch(
        actions.listLedgerRequest({
          SubscriberId: subscriber,
          BranchId: branch,
        }),
      );
    }
  }, []);

  const handleSubmit = (formData: LedgerFormFieldTypes) => {
    if (apiFlags.create) {
      dispatch(
        actions.createLedgerRequest({ ...formData, SubscriberId: subscriber, CreatedBy: username }),
      );
    }
  };

  const handleUpdate = (LedgerId: string, formData: LedgerFormFieldTypes) => {
    if (apiFlags.edit) {
      dispatch(
        actions.updateLedgerRequest({
          LedgerId,
          updateData: { ...formData, ModifiedBy: username },
        }),
      );
    }
  };

  const handleDelete = (LedgerId: string) => {
    if (apiFlags.remove) {
      dispatch(actions.deleteLedgerRequest({ LedgerId, ModifiedBy: username }));
    }
  };

  useEffect(() => {
    if (createLedger) {
      setTimeout(() => {
        dispatch(actions.resetCreateLedgerControl());
      }, 500);
    }
  }, [createLedger]);

  useEffect(() => {
    if (deleteLedger) {
      setTimeout(() => {
        dispatch(actions.resetDeleteLedgerControl());
      }, 500);
    }
  }, [deleteLedger]);

  useEffect(() => {
    if (updateLedger) {
      setTimeout(() => {
        dispatch(actions.resetUpdateLedgerControl());
      }, 500);
    }
  }, [updateLedger]);

  return {
    allLedger,
    loading,
    listLedgerLoading,
    handleDelete,
    deleteLedger,
    createLedger,
    updateLedger,
    handleSubmit,
    handleUpdate,
  };
};

export default useLedger;
