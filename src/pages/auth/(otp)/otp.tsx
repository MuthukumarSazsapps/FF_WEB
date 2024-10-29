import { useOtp } from 'hooks/use-layout';
import { OTP_OPTIONS } from 'config/enums';
import Otp1 from './otp-1/page';
import Otp2 from './otp-2/page';
import Otp3 from './otp-3/page';
import Otp4 from './otp-4/page';
import Otp5 from './otp-5/page';

const DefaultOtp = () => {
  const { otp } = useOtp();

  if (otp === OTP_OPTIONS.Otp2) {
    return <Otp3 />;
  }
  if (otp === OTP_OPTIONS.Otp3) {
    return <Otp3 />;
  }
  if (otp === OTP_OPTIONS.Otp4) {
    return <Otp3 />;
  }
  if (otp === OTP_OPTIONS.Otp5) {
    return <Otp3 />;
  } else {
    return <Otp3 />;
  }
};

const OtpPage = () => {
  return <DefaultOtp />;
};

export default OtpPage;
