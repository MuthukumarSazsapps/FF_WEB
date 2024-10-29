import axiosInstance from './axios';
import { APIRoutes } from 'utils';
import { Agent, AgentFormFieldTypes } from 'utils/types';

const listAllAgents = async (SubscriberId: string, BranchId: string) => {
  const response = await axiosInstance
    .post(APIRoutes.agentList, { SubscriberId, BranchId })
    .then(result => result.data)
    .catch(err => {
      console.log('List Api error', err);
    });
  return response ?? [];
};

const createAgent = async (AgentData: AgentFormFieldTypes): Promise<Agent> => {
  const response = await axiosInstance
    .post(APIRoutes.agentCreate, AgentData)
    .then(result => result.data)
    .catch(err => {
      console.log('Create Api error', err);
      return;
    });
  return response.message;
};

const updateAgent = async (AgentId: string, updateData: AgentFormFieldTypes): Promise<Agent> => {
  const response = await axiosInstance
    .put(`${APIRoutes.agentUpdate}/${AgentId}`, updateData)
    .then(result => result.data)
    .catch(err => {
      console.log('Update Api error', err);
      return;
    });
  return response?.message;
};

const deleteAgent = async (AgentId: string, ModifiedBy: string) => {
  const response = await axiosInstance
    .delete(`${APIRoutes.agentDelete}/${AgentId}`, {
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
  listAllAgents,
  createAgent,
  deleteAgent,
  updateAgent,
};
