import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { actions, dispatch } from 'store';
import { RootState } from 'store/reducers';
import { Customer, CustomerFormFieldTypes } from 'utils/types';
import useLocalData from './use-localData';

type UseCustomerReturn = {
  allCustomers: Customer[];
  customerProfile: Customer;
  loading?: boolean;
  listLoading?: boolean;
  getCustomerLoading?: boolean;
  createCustomerState?: string;
  deleteCustomerState?: string;
  updateCustomerState?: string;
  getCustomer: (CustomerId: string) => void;
  handleSubmit: (data: CustomerFormFieldTypes) => void;
  handleDelete: (data: string) => void;
  handleUpdate: (id: string, data: CustomerFormFieldTypes) => void;
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

const useCustomers = (apiFlags = defaultAPIFlags): UseCustomerReturn => {
  const allCustomers = useSelector<RootState, Customer[]>(state => state.customers.list);
  const customerProfile = useSelector<RootState, Customer>(state => state.customers.customer);
  const listLoading = useSelector<RootState, boolean>(state => state.customers.listAPI.loading);
  const createLoading = useSelector<RootState, boolean>(state => state.customers.createAPI.loading);
  const updateLoading = useSelector<RootState, boolean>(state => state.customers.updateAPI.loading);
  const deleteLoading = useSelector<RootState, boolean>(state => state.customers.deleteAPI.loading);
  const getCustomerLoading = useSelector<RootState, boolean>(
    state => state.customers.getApi.loading,
  );
  const loading = listLoading || createLoading || updateLoading || deleteLoading;
  const createCustomerState = useSelector<RootState, string>(
    state => state.customers.createAPI.success || '',
  );
  const deleteCustomerState = useSelector<RootState, string>(
    state => state.customers.deleteAPI.success || '',
  );
  const updateCustomerState = useSelector<RootState, string>(
    state => state.customers.updateAPI.success || '',
  );
  const { subscriber, branch, username } = useLocalData();

  useEffect(() => {
    if (apiFlags.list && subscriber) {
      dispatch(
        actions.listCustomersRequest({
          SubscriberId: subscriber,
          BranchId: branch,
        }),
      );
    }
  }, [createCustomerState, deleteCustomerState, updateCustomerState, subscriber]);
  const handleSubmit = (formData: CustomerFormFieldTypes) => {
    if (apiFlags.create) {
      dispatch(
        actions.createCustomerRequest({
          CreatedBy: username,
          SubscriberId: subscriber,
          CustomerData: formData,
        }),
      );
    }
  };
  const getCustomer = (CustomerId: string) => {
    if (apiFlags.profile) {
      dispatch(actions.getCustomersRequest(CustomerId));
    }
  };
  const handleUpdate = (id: string, formData: CustomerFormFieldTypes) => {
    if (apiFlags.edit) {
      dispatch(
        actions.updateCustomerRequest({
          ModifiedBy: username,
          CustomerId: id,
          updateData: formData,
        }),
      );
    }
  };

  const handleDelete = (id: string) => {
    if (apiFlags.remove) {
      dispatch(actions.deleteCustomerRequest({ CustomerId: id, ModifiedBy: username }));
    }
  };

  useEffect(() => {
    if (createCustomerState) {
      setTimeout(() => {
        dispatch(actions.resetCreateCustomerControl());
      }, 500);
    }
  }, [createCustomerState]);
  useEffect(() => {
    if (updateCustomerState) {
      setTimeout(() => {
        dispatch(actions.resetUpdateCustomerControl());
      }, 500);
    }
  }, [updateCustomerState]);
  useEffect(() => {
    if (deleteCustomerState) {
      setTimeout(() => {
        dispatch(actions.resetDeleteCustomerControl());
      }, 500);
    }
  }, [deleteCustomerState]);
  return {
    allCustomers,
    loading,
    customerProfile,
    getCustomer,
    getCustomerLoading,
    listLoading,
    handleDelete,
    deleteCustomerState,
    createCustomerState,
    updateCustomerState,
    handleSubmit,
    handleUpdate,
  };
};

export default useCustomers;
