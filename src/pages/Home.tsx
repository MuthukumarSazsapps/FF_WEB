import { useEffect } from 'react';
import { useLayout } from 'hooks/use-layout';
import HydrogenLayout from 'layouts/hydrogen/layout';
import { LAYOUT_OPTIONS } from '../config/enums';
import HeliumLayout from 'layouts/Helium/helium-layout';
import LithiumLayout from 'layouts/Lithium/lithium-layout';
import BerylliumLayout from 'layouts/BeryLlium/beryllium-layout';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import { actions, dispatch } from 'store';
import useUsers from 'hooks/use-users';
import useLocalData from 'hooks/use-localData';
import CenterSpinner from 'common/center-spinner';

const Home = () => {
  const { layout } = useLayout();
  const navigate = useNavigate();
  const { jwt, userId } = useLocalData();
  const { loginUser, getLoading } = useUsers();
  const [subscriber, setSubscriber, removeSubscriber] = useLocalStorage('SubscriberId');
  const [branch, setBranch, removeBranch] = useLocalStorage('BranchId');

  useEffect(() => {
    if (jwt && userId) {
      dispatch(actions.getUserRequest(userId));
    }
    if (!jwt) {
      navigate('login');
    }
  }, [jwt]);
  useEffect(() => {
    if (loginUser.SubscriberId) {
      setSubscriber(loginUser.SubscriberId);
      setBranch(loginUser.BranchId);
    }
  }, [loginUser]);
  if (getLoading) {
    return <CenterSpinner />;
  }
  if (layout === LAYOUT_OPTIONS.HELIUM) {
    return <HeliumLayout />;
  }
  if (layout === LAYOUT_OPTIONS.LITHIUM) {
    return <LithiumLayout />;
  }
  if (layout === LAYOUT_OPTIONS.BERYLLIUM) {
    return <BerylliumLayout />;
  } else {
    return <HydrogenLayout />;
  }
};

export default Home;
