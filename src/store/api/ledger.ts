import axiosInstance from './axios';
import { APIRoutes } from 'utils';
import { Ledger, LedgerFormFieldTypes } from 'utils/types';

const createLedger = async (ledgerData: LedgerFormFieldTypes): Promise<Location> => {
  const response = await axiosInstance
    .post(APIRoutes.LedgerCreate, ledgerData)
    .then(result => result.data)
    .catch(err => {
      console.log('Create Api error', err);
      return;
    });

  return response.message;
};

const getLedger = async (LedgerId: string) => {
  try {
    const response = await axiosInstance
      .post(APIRoutes.getLedger, { LedgerId })
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

const listAllLedger = async (SubscriberId: string, BranchId: string) => {
  const response = await axiosInstance
    .post(APIRoutes.ledgerList, { SubscriberId, BranchId })
    .then(result => result.data)
    .catch(err => {
      console.log('List Api error', err);
    });
  return response ?? [];
};
const deleteLedger = async (LedgerGroupId: string, ModifiedBy: string) => {
  const response = await axiosInstance
    .delete(`${APIRoutes.ledgerDelete}/${LedgerGroupId}`, {
      data: {
        ModifiedBy,
      },
    })
    .then(result => result.data)
    .catch(err => {
      console.log('Delete Api error', err);
      return;
    });
  return response?.message;
};
const updateLedger = async (
  LedgerId: string,
  updateData: LedgerFormFieldTypes,
): Promise<Ledger> => {
  const response = await axiosInstance
    .put(`${APIRoutes.ledgerUpdate}/${LedgerId}`, updateData)
    .then(result => result.data)
    .catch(err => {
      console.log('Update Api error', err);
      return;
    });
  return response?.message;
};

export default {
  listAllLedger,
  createLedger,
  deleteLedger,
  updateLedger,
  getLedger,
};
