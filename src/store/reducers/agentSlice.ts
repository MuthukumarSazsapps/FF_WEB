import { createSlice } from '@reduxjs/toolkit';
import { APILoaderInformation, Agent, AgentFormDefaultValues } from 'utils/types';

interface AgentControl {
  list: Agent[];
  agent: Agent;
  listAPI: APILoaderInformation;
  getApi: APILoaderInformation;
  createAPI: APILoaderInformation;
  updateAPI: APILoaderInformation;
  deleteAPI: APILoaderInformation;
}

const initialState: AgentControl = {
  list: [],
  agent: AgentFormDefaultValues,
  listAPI: { loading: false, error: '' },
  getApi: { loading: false, error: '' },
  createAPI: { loading: false, success: '', error: '' },
  updateAPI: { loading: false, success: '', error: '' },
  deleteAPI: { loading: false, success: '', error: '' },
};

const AgentSlice = createSlice({
  name: 'Agent',
  initialState,
  reducers: {
    listAgentsRequest: (state, action) => {
      state.listAPI.loading = true;
    },
    listAgentsSuccess: (state, action) => {
      state.listAPI.loading = false;
      state.list = action.payload;
    },
    listAgentsFailed: (state, action) => {
      state.listAPI.loading = false;
      state.listAPI.error = action.payload;
    },
    createAgentRequest: (state, action) => {
      state.createAPI.loading = true;
    },
    createAgentSuccess: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
    },
    createAgentFailed: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
      state.createAPI.error = action.payload;
    },
    resetCreateAgentControl: state => {
      state.createAPI.success = '';
    },
    deleteAgentRequest: (state, action) => {
      state.deleteAPI.loading = true;
    },
    deleteAgentSuccess: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.success = action.payload;
    },
    deleteAgentFailed: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.error = action.payload;
    },
    resetDeleteAgentControl: state => {
      state.deleteAPI.success = '';
    },
    updateAgentRequest: (state, action) => {
      state.updateAPI.loading = true;
    },
    updateAgentSuccess: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.success = action.payload;
    },
    updateAgentFailed: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.error = action.payload;
    },
    resetUpdateAgentControl: state => {
      state.updateAPI.success = '';
    },
  },
});

export default AgentSlice;
