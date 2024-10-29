import { takeEvery, call, put, Effect } from 'redux-saga/effects';
import api from '../api';
import { messages } from 'config/messages';
import { PayloadAction } from '@reduxjs/toolkit';
import { AgentFormFieldTypes } from 'utils/types';
import AgentSlice from 'store/reducers/agentSlice';

function* listAgentsSaga(
  action: PayloadAction<{ SubscriberId: string; BranchId: string }>,
): Generator<Effect, void, unknown> {
  try {
    const { SubscriberId, BranchId } = action.payload;
    const response = yield call(api.agent.listAllAgents, SubscriberId, BranchId);
    if (response) {
      yield put(AgentSlice.actions.listAgentsSuccess(response));
    } else {
      yield put(AgentSlice.actions.listAgentsFailed(messages.listMenuAPIFailed));
    }
  } catch (error) {
    yield put(AgentSlice.actions.listAgentsFailed(messages.listMenuSagaFailed));
  }
}

function* createAgentsaga(
  action: PayloadAction<{ agentData: AgentFormFieldTypes }>,
): Generator<Effect, void, unknown> {
  try {
    const { agentData } = action.payload;
    const response = yield call(api.agent.createAgent, agentData);
    if (response) {
      yield put(AgentSlice.actions.createAgentSuccess(response));
    } else {
      yield put(AgentSlice.actions.createAgentFailed(messages.listMenuAPIFailed));
    }
  } catch (error) {
    yield put(AgentSlice.actions.createAgentFailed(messages.listMenuSagaFailed));
  }
}
function* updateAgentsaga(
  action: PayloadAction<{
    AgentId: string;
    updateData: AgentFormFieldTypes;
  }>,
): Generator<Effect, void, unknown> {
  try {
    const { AgentId, updateData } = action.payload;
    const response = yield call(api.agent.updateAgent, AgentId, updateData);
    if (response) {
      yield put(AgentSlice.actions.updateAgentSuccess(response));
    } else {
      yield put(AgentSlice.actions.updateAgentFailed(messages.listSubscriberAPIFailed));
    }
  } catch (error) {
    yield put(AgentSlice.actions.updateAgentFailed(messages.listSubscriberSagaFailed));
  }
}
function* deleteAgentsaga(
  action: PayloadAction<{ AgentId: string; ModifiedBy: string }>,
): Generator<Effect, void, unknown> {
  try {
    const { AgentId, ModifiedBy } = action.payload;
    const response = yield call(api.agent.deleteAgent, AgentId, ModifiedBy);
    if (response) {
      yield put(AgentSlice.actions.deleteAgentSuccess(response));
    } else {
      yield put(AgentSlice.actions.deleteAgentFailed(messages.deleteMenuAPIFailed));
    }
  } catch (error) {
    yield put(AgentSlice.actions.deleteAgentFailed(messages.deleteMenuSagaFailed));
  }
}
export default function* agentsaga() {
  yield takeEvery(AgentSlice.actions.listAgentsRequest, listAgentsSaga);
  yield takeEvery(AgentSlice.actions.createAgentRequest, createAgentsaga);
  yield takeEvery(AgentSlice.actions.updateAgentRequest, updateAgentsaga);
  yield takeEvery(AgentSlice.actions.deleteAgentRequest, deleteAgentsaga);
}
