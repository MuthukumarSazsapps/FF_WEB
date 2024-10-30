import { useLocalStorage } from 'react-use';

type UseLocalDataReturn = {
  subscriber: any;
  branch: any;
  userId: any;
  username: any;
  role: any;
  jwt: any;
  refKey: any;
  refToken: any;
};

const useLocalData = (): UseLocalDataReturn => {
  const [username] = useLocalStorage('username');
  const [userId] = useLocalStorage('UserId');
  const [subscriber] = useLocalStorage('SubscriberId');
  const [branch] = useLocalStorage('BranchId');
  const [role] = useLocalStorage('role');
  const [jwt] = useLocalStorage('auth');
  const [refKey] = useLocalStorage('refkey');
  const [refToken] = useLocalStorage('reftoken');

  return {
    subscriber,
    branch,
    userId,
    role,
    refKey,
    refToken,
    jwt,
    username,
  };
};

export default useLocalData;
