import axiosInstance from './axios';
import { APIRoutes } from 'utils';
import { LedgerGroup, LedgerGroupFormFieldTypes } from 'utils/types';

const createLedgerGroup = async (ledgerGroupData: LedgerGroupFormFieldTypes): Promise<Location> => {
  const response = await axiosInstance
    .post(APIRoutes.LedgerGroupCreate, ledgerGroupData)
    .then(result => result.data)
    .catch(err => {
      console.log('Create Api error', err);
      return;
    });
  return response?.message;
};

const getLedgerGroup = async (LedgerGroupId: string) => {
  try {
    const response = await axiosInstance
      .post(APIRoutes.getLedgerGroup, { LedgerGroupId })
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

const listAllLedgerGroups = async () => {
  const response = await axiosInstance
    .get(APIRoutes.ledgerGroupList)
    .then(result => result.data)
    .catch(err => {
      console.log('List Api error', err);
    });
  return response ?? [];
};

const deleteLedgerGroup = async (LedgerGroupId: string, ModifiedBy: string) => {
  const response = await axiosInstance
    .delete(`${APIRoutes.ledgerGroupDelete}/${LedgerGroupId}`, {
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
const updateLedgerGroup = async (
  LedgerGroupId: string,
  updateData: LedgerGroupFormFieldTypes,
): Promise<LedgerGroup> => {
  const response = await axiosInstance
    .put(`${APIRoutes.ledgerGroupUpdate}/${LedgerGroupId}`, updateData)
    .then(result => result.data)
    .catch(err => {
      console.log('Update Api error', err);
      return;
    });
  return response?.message;
};

export default {
  listAllLedgerGroups,
  createLedgerGroup,
  deleteLedgerGroup,
  updateLedgerGroup,
  getLedgerGroup,
};
