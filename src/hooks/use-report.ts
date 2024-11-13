import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { actions, dispatch } from 'store';
import { RootState } from 'store/reducers';
import { PendingRemarksFormFieldTypes } from 'utils/types';
import useLocalData from './use-localData';

export type UseReportReturn = {
  allPendingList: PendingRemarksFormFieldTypes[]; //or any[]
  loading: boolean;
  // pendingListLoading: boolean;
  handleUpdate: (data: any) => void;
  handleSubmit: (data: any) => void;
  updatePendingRemarks: string;
  updatePendingDocs: string;
  updateLoading: boolean;
  DocsListLoading: boolean;
  docUpdateLoanding: boolean;
  pendingDocsList: any;
  defaultList: any;
};

interface APIFlags {
  list?: boolean;
  update?: boolean;
  docsList?: boolean;
  defaultList?: boolean;
}

const defaultAPIFlags: APIFlags = {
  list: false,
};

const usePendingListState = (apiFlags = defaultAPIFlags): UseReportReturn => {
  const allPendingList = useSelector<RootState, PendingRemarksFormFieldTypes[]>(
    state => state.report.list,
  );
  const listLoading = useSelector<RootState, boolean>(state => state.report.listAPI.loading);
  const defaultListLoading = useSelector<RootState, boolean>(
    state => state.report.defaultlistAPI.loading,
  );

  const updatePendingRemarks = useSelector<RootState, string>(
    state => state.report.updateAPI.success || '',
  );
  const pendingDocsList = useSelector<RootState, PendingRemarksFormFieldTypes[]>(
    state => state.report.pendingDocsList,
  );
  const DocsListLoading = useSelector<RootState, boolean>(state => state.report.docsList.loading);
  const updateLoading = useSelector<RootState, boolean>(state => state.report.updateAPI.loading);
  const updatePendingDocs = useSelector<RootState, string>(
    state => state.report.docUpdateAPI.success || '',
  );
  const docUpdateLoanding = useSelector<RootState, boolean>(
    state => state.report.docUpdateAPI.loading,
  );
  const defaultList = useSelector<RootState, PendingRemarksFormFieldTypes[]>(
    state => state.report.defaultlist,
  );
  const loading = listLoading || defaultListLoading;
  const { username, subscriber, branch } = useLocalData();

  useEffect(() => {
    if (apiFlags.list) {
      dispatch(actions.pendingListRequest({ SubscriberId: subscriber, BranchId: branch }));
    }
  }, [updatePendingRemarks]);

  useEffect(() => {
    if (apiFlags.docsList) {
      dispatch(actions.pendingDocumentsListRequest({ SubscriberId: subscriber, BranchId: branch }));
    }
  }, [apiFlags.docsList, updatePendingDocs]);

  useEffect(() => {
    if (apiFlags.defaultList) {
      dispatch(actions.defaultListRequest({ SubscriberId: subscriber, BranchId: branch }));
    }
  }, [apiFlags.defaultList]);

  const handleUpdate = (updateData: any) => {
    if (apiFlags.update) {
      dispatch(
        actions.updatePendingRequest({
          updateData,
        }),
      );
    }
  };
  const handleSubmit = (updateData: any) => {
    dispatch(
      actions.updatePendingDocsRequest({
        updateData: {
          ...updateData,
          ModifiedBy: username,
        },
      }),
    );
  };
  useEffect(() => {
    if (updatePendingRemarks) {
      setTimeout(() => {
        dispatch(actions.resetUpdatePendingControl());
      }, 500);
    }
  }, [updatePendingRemarks]);
  useEffect(() => {
    if (updatePendingDocs) {
      setTimeout(() => {
        dispatch(actions.resetUpdatePendingDocsControl());
      }, 500);
    }
  }, [updatePendingDocs]);
  return {
    allPendingList,
    loading,
    updatePendingDocs,
    docUpdateLoanding,
    DocsListLoading,
    pendingDocsList,
    // pendingListLoading,
    updatePendingRemarks,
    defaultList,
    updateLoading,
    handleSubmit,
    handleUpdate, // Example value, replace with your logic
  };
};

export default usePendingListState;
