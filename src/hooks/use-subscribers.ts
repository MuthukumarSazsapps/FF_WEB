import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { actions, dispatch } from 'store';
import { RootState } from 'store/reducers';
import { Subscriber, SubscriberFormFieldTypes } from 'utils/types';
import useLocalData from './use-localData';

type UseSubscriberReturn = {
  allSubscribers: Subscriber[];
  allLogs: any;
  loading?: boolean;
  listLoading?: boolean;
  logsLoading?: boolean;
  createSubscriberState?: string;
  deleteSubscriberState?: string;
  updateSubscriberState?: string;
  handleSubmit: (data: SubscriberFormFieldTypes) => void;
  handleDelete: (data: string) => void;
  getLogs: (data: any) => void;
  handleUpdate: (id: string, data: SubscriberFormFieldTypes, sendPassword: boolean) => void;
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

const useSubscribers = (apiFlags = defaultAPIFlags): UseSubscriberReturn => {
  const allSubscribers = useSelector<RootState, Subscriber[]>(state => state.subscribers.list);
  const allLogs = useSelector<RootState, any[]>(state => state.subscribers.logs);
  const listLoading = useSelector<RootState, boolean>(state => state.subscribers.listAPI.loading);
  const logsLoading = useSelector<RootState, boolean>(state => state.subscribers.logsAPI.loading);
  const createLoading = useSelector<RootState, boolean>(
    state => state.subscribers.createAPI.loading,
  );
  const updateLoading = useSelector<RootState, boolean>(
    state => state.subscribers.updateAPI.loading,
  );
  const deleteLoading = useSelector<RootState, boolean>(
    state => state.subscribers.deleteAPI.loading,
  );
  const loading = listLoading || createLoading || updateLoading || deleteLoading;
  const { username } = useLocalData();
  const createSubscriberState = useSelector<RootState, string>(
    state => state.subscribers.createAPI.success || '',
  );
  const deleteSubscriberState = useSelector<RootState, string>(
    state => state.subscribers.deleteAPI.success || '',
  );
  const updateSubscriberState = useSelector<RootState, string>(
    state => state.subscribers.updateAPI.success || '',
  );

  useEffect(() => {
    if (apiFlags.list) {
      dispatch(actions.listSubscribersRequest());
    }
  }, [createSubscriberState, deleteSubscriberState, updateSubscriberState]);

  const getLogs = (data: any) => {
    dispatch(actions.listLogsRequest({ ...data }));
  };
  const handleSubmit = (formData: SubscriberFormFieldTypes) => {
    if (apiFlags.create) {
      dispatch(actions.createSubscriberRequest({ subscriberData: formData, CreatedBy: username }));
    }
  };

  const handleUpdate = (id: string, formData: SubscriberFormFieldTypes, sendPassword: boolean) => {
    if (apiFlags.edit) {
      dispatch(
        actions.updateSubscriberRequest({
          subscriberId: id,
          updateData: formData,
          sendPassword,
          ModifiedBy: username,
        }),
      );
    }
  };

  const handleDelete = (id: string) => {
    if (apiFlags.remove) {
      dispatch(actions.deleteSubscriberRequest({ subscriberId: id, ModifiedBy: username }));
    }
  };

  useEffect(() => {
    if (createSubscriberState) {
      setTimeout(() => {
        dispatch(actions.resetCreateSubscriberState());
      }, 500);
    }
  }, [createSubscriberState]);
  useEffect(() => {
    if (updateSubscriberState) {
      setTimeout(() => {
        dispatch(actions.resetUpdateSubscriberState());
      }, 500);
    }
  }, [updateSubscriberState]);
  useEffect(() => {
    if (deleteSubscriberState) {
      setTimeout(() => {
        dispatch(actions.resetDeleteSubscriberState());
      }, 500);
    }
  }, [deleteSubscriberState]);
  return {
    allSubscribers,
    allLogs,
    getLogs,
    loading,
    listLoading,
    logsLoading,
    handleDelete,
    deleteSubscriberState,
    createSubscriberState,
    updateSubscriberState,
    handleSubmit,
    handleUpdate,
  };
};

export default useSubscribers;
