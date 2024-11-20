import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { actions, dispatch } from 'store';
import { RootState } from 'store/reducers';
import { EnumMaster, EnumMasterFormFieldTypes } from 'utils/types';
import useLocalData from './use-localData';

type UseVehicleReturn = {
 
  loading?: boolean;
  createEnumMasterState?: string;
  handleSubmit: (data: EnumMasterFormFieldTypes) => void;
  
};
interface APIFlags {
  create?: boolean;
}

const defaultAPIFlags: APIFlags = {
  create: false,
};

const useEnumMaster = (apiFlags = defaultAPIFlags): UseVehicleReturn => {
  
  const createLoading = useSelector<RootState, boolean>(state => state.EnumMaster.createAPI.loading);
  
  const loading = createLoading;
  const createEnumMasterState = useSelector<RootState, string>(
    state => state.EnumMaster.createAPI.success || '',
  );

  const { subscriber, branch, username } = useLocalData();

//   useEffect(() => {
//     if (apiFlags.list && subscriber) {
//       dispatch(
//         actions.listVehiclesRequest({
//           SubscriberId: subscriber,
//           BranchId: branch,
//         }),
//       );
//     }
//   }, [createEnumMasterState, subscriber]);
  const handleSubmit = (formData: EnumMasterFormFieldTypes) => {

    if (apiFlags.create) {
      dispatch(
        actions.createEnumMasterRequest({
          EnumMasterData: {
            ...formData,
            CreatedBy: username,
            SubscriberId: subscriber,
            BranchId:branch
          },
        }),
      );
    }
  };

  useEffect(() => {
    if (createEnumMasterState) {
      setTimeout(() => {
        dispatch(actions.resetCreateEnumMasterControl());
      }, 500);
    }
  }, [createEnumMasterState]);
 
  return {
    
    loading,
    
    createEnumMasterState,
   
    handleSubmit,
   
  };
};

export default useEnumMaster;
