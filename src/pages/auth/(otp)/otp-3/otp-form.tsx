'use client';

import { Button } from 'rizzui';
import { SubmitHandler } from 'react-hook-form';
import { Form } from 'common/form';
import { PinCode } from 'rizzui';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Text } from 'rizzui';
import { useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import { useLocalStorage } from 'react-use';

type FormValues = {
  otp: string;
};

export default function OtpForm() {
  const navigate = useNavigate();
  const token = useSelector<RootState, string>(state => state.auth.login.token);
  const refresh_token = useSelector<RootState, string>(state => state.auth.login.refresh_token);
  const refresh_key = useSelector<RootState, string>(state => state.auth.login.refresh_key);
  const userEmail = useSelector<RootState, string>(state => state.auth.login.UserName);
  const role = useSelector<RootState, string>(state => state.auth.login.role);
  const UserId = useSelector<RootState, string>(state => state.auth.login.UserId);
  const [jwt, setjwt, removejwt] = useLocalStorage('auth');
  const [refToken, setrefToken, removerefToken] = useLocalStorage('reftoken');
  const [username, setUserName, removeUserName] = useLocalStorage('username');
  const [refKey, setRefKey, removeRefKey] = useLocalStorage('refkey');
  const [userRole, setRole, removeRole] = useLocalStorage('role');
  const [userId, setUserId, removeUserId] = useLocalStorage('UserId');

  const onSubmit: SubmitHandler<FormValues> = data => {
    if (data.otp === '9320') {
      if (token && userEmail && refresh_token) {
        setrefToken(refresh_token);
        setUserName(userEmail);
        setjwt(token);
        setUserId(UserId);
        setRefKey(refresh_key);
        setRole(role);
        navigate('/');
      }
    } else {
      toast.error(
        <Text as="b" className="font-semibold">
          Please Enter Valid OTP
        </Text>,
        { duration: 3000 },
      );
    }
  };

  return (
    <Form<FormValues> onSubmit={onSubmit} className="w-full">
      {({ setValue }) => (
        <div className="space-y-5 lg:space-y-7">
          <PinCode variant="outline" setValue={value => setValue('otp', String(value))} size="lg" />
          <div className="">
            <Button className="mt-4 w-full lg:mt-2" size="xl" rounded="pill" variant="outline">
              Resend OTP
            </Button>
          </div>
          <Button color="primary" className="w-full" type="submit" size="xl" rounded="pill">
            Verify OTP
          </Button>
        </div>
      )}
    </Form>
  );
}
