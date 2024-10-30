import { useForgot } from 'hooks/use-layout';
import { FORGOT_OPTIONS } from 'config/enums';
import ForgotPassword1 from './forgot-password-1/page';
import ForgotPassword2 from './forgot-password-2/page';
import ForgotPassword3 from './forgot-password-3/page';
import ForgotPassword4 from './forgot-password-4/page';
import ForgotPassword5 from './forgot-password-5/page';

const DefaultOtp = () => {
  const { forgot } = useForgot();

  if (forgot === FORGOT_OPTIONS.Forgot2) {
    return <ForgotPassword2 />;
  }
  if (forgot === FORGOT_OPTIONS.Forgot3) {
    return <ForgotPassword3 />;
  }
  if (forgot === FORGOT_OPTIONS.Forgot4) {
    return <ForgotPassword4 />;
  }
  if (forgot === FORGOT_OPTIONS.Forgot5) {
    return <ForgotPassword5 />;
  } else {
    return <ForgotPassword1 />;
  }
};

const ForgotPassword = () => {
  return <DefaultOtp />;
};

export default ForgotPassword;
