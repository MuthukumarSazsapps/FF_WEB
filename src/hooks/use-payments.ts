import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { actions, dispatch } from 'store';
import { RootState } from 'store/reducers';
import { PaymentsFormFieldTypes } from 'utils/types';
import useLocalData from './use-localData';

type UsePaymentsReturn = {
  handleSubmit: (paymentData: PaymentsFormFieldTypes) => void;
  disburseLoading: boolean;
  disburseState: string;
};

interface APIFlags {
  loanDisburse: boolean;
}

const defaultAPIFlags: APIFlags = {
  loanDisburse: false,
};

const usePayments = (apiFlags = defaultAPIFlags): UsePaymentsReturn => {
  const disburseLoading = useSelector<RootState, boolean>(
    state => state.payment.loanDisburseAPI.loading,
  );
  const disburseState = useSelector<RootState, string>(
    state => state.payment.loanDisburseAPI.success || '',
  );
  const { username } = useLocalData();
  const handleSubmit = (paymentData: PaymentsFormFieldTypes) => {
    if (apiFlags.loanDisburse) {
      dispatch(actions.loanDisburseRequest({ ...paymentData, CreatedBy: username }));
    }
  };
  useEffect(() => {
    if (disburseState) {
      setTimeout(() => {
        dispatch(actions.resetloanDisburseControl());
      }, 500);
    }
  }, [disburseState]);
  return {
    handleSubmit,
    disburseLoading,
    disburseState,
  };
};

export default usePayments;
