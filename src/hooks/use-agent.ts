import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { actions, dispatch } from 'store';
import { RootState } from 'store/reducers';
import { Agent, AgentFormFieldTypes } from 'utils/types';
import useLocalData from './use-localData';

type UseAgentReturn = {
  allAgents: Agent[];
  loading?: boolean;
  listLoading?: boolean;
  createAgentState?: string;
  deleteAgentState?: string;
  updateAgentState?: string;
  handleSubmit: (data: AgentFormFieldTypes) => void;
  handleDelete: (data: string) => void;
  handleUpdate: (id: string, data: AgentFormFieldTypes) => void;
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

const useAgents = (apiFlags = defaultAPIFlags): UseAgentReturn => {
  const allAgents = useSelector<RootState, Agent[]>(state => state.agents.list);
  const listLoading = useSelector<RootState, boolean>(state => state.agents.listAPI.loading);
  const createLoading = useSelector<RootState, boolean>(state => state.agents.createAPI.loading);
  const updateLoading = useSelector<RootState, boolean>(state => state.agents.updateAPI.loading);
  const deleteLoading = useSelector<RootState, boolean>(state => state.agents.deleteAPI.loading);
  const loading = listLoading || createLoading || updateLoading || deleteLoading;
  const createAgentState = useSelector<RootState, string>(
    state => state.agents.createAPI.success || '',
  );
  const deleteAgentState = useSelector<RootState, string>(
    state => state.agents.deleteAPI.success || '',
  );
  const updateAgentState = useSelector<RootState, string>(
    state => state.agents.updateAPI.success || '',
  );
  const { subscriber, branch, username } = useLocalData();

  useEffect(() => {
    if (apiFlags.list && subscriber) {
      dispatch(
        actions.listAgentsRequest({
          SubscriberId: subscriber,
          BranchId: branch,
        }),
      );
    }
  }, [createAgentState, deleteAgentState, updateAgentState, subscriber]);
  const handleSubmit = (formData: AgentFormFieldTypes) => {
    if (apiFlags.create) {
      dispatch(
        actions.createAgentRequest({
          agentData: {
            ...formData,
            CreatedBy: username,
            SubscriberId: subscriber,
          },
        }),
      );
    }
  };

  const handleUpdate = (id: string, formData: AgentFormFieldTypes) => {
    if (apiFlags.edit) {
      dispatch(
        actions.updateAgentRequest({
          AgentId: id,
          updateData: { ...formData, ModifiedBy: username },
        }),
      );
    }
  };

  const handleDelete = (id: string) => {
    if (apiFlags.remove) {
      dispatch(actions.deleteAgentRequest({ AgentId: id, ModifiedBy: username }));
    }
  };

  useEffect(() => {
    if (createAgentState) {
      setTimeout(() => {
        dispatch(actions.resetCreateAgentControl());
      }, 500);
    }
  }, [createAgentState]);
  useEffect(() => {
    if (updateAgentState) {
      setTimeout(() => {
        dispatch(actions.resetUpdateAgentControl());
      }, 500);
    }
  }, [updateAgentState]);
  useEffect(() => {
    if (deleteAgentState) {
      setTimeout(() => {
        dispatch(actions.resetDeleteAgentControl());
      }, 500);
    }
  }, [deleteAgentState]);
  return {
    allAgents,
    loading,
    listLoading,
    handleDelete,
    deleteAgentState,
    createAgentState,
    updateAgentState,
    handleSubmit,
    handleUpdate,
  };
};

export default useAgents;
