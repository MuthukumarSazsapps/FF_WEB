'use client';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Password } from 'rizzui';
import { Switch } from 'rizzui';
import { useMedia } from 'react-use';
import { Text } from 'rizzui';
import { routes } from 'config/routes';
import { Form } from 'common/form';
import useLogin from 'hooks/use-login';
import { LoginFormFieldTypes, LoginSchema, loginFormDefaultValues } from 'utils/types';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import { useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import { actions, dispatch } from 'store';
import toast from 'react-hot-toast';
import CenterSpinner from 'common/center-spinner';
import Button from 'common/button';
import Input from 'common/input';
import useLocalData from 'hooks/use-localData';

const LoginForm = () => {
  const { handleSubmit } = useLogin<LoginFormFieldTypes>();
  const { loading, autoLoginLoading } = useLogin<LoginFormFieldTypes>();
  const isMedium = useMedia('(max-width: 1200px)', false);
  const token = useSelector<RootState, string>(state => state.auth.autoLogin.token);
  const error = useSelector<RootState, string>(state => state.auth.login.error);
  const { username, refKey, refToken } = useLocalData();
  const [jwt, setjwt, removejwt] = useLocalStorage('auth');
  const navigate = useNavigate();

  useEffect(() => {
    if (error === 'Invalid credentials') {
      toast.error(
        <Text as="b" className="font-semibold">
          Incorrect Email Address or Password
        </Text>,
        { duration: 3000 },
      );
    }
  }, [error]);

  useEffect(() => {
    if (!jwt && refToken && refKey) {
      dispatch(
        actions.refreshTokenRequest({
          username: username,
          refresh_token: refToken,
          refresh_key: refKey,
        }),
      );
    }
  }, [refToken]);
  useEffect(() => {
    if (token) {
      setjwt(token);
      navigate('/');
    }
  }, [token]);
  return (
    <>
      <Form<LoginFormFieldTypes>
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
        useFormProps={{
          mode: 'onChange',
          defaultValues: loginFormDefaultValues,
        }}>
        {({ register, formState: { errors } }) => (
          <div className="space-y-5 lg:space-y-6">
            <Input<LoginFormFieldTypes>
              type="email"
              register={register}
              size={isMedium ? 'lg' : 'xl'}
              label="UserName"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              name="username"
              error={errors.username?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size={isMedium ? 'lg' : 'xl'}
              className="[&>label>span]:font-medium"
              {...register('password')}
              error={errors.password?.message}
            />
            <div className="flex items-center justify-between lg:pb-2">
              <Switch variant="active" label="Remember Me" {...register('rememberMe')} />
              <Link
                to={'/forgotPassword'}
                className="h-auto p-0 text-sm font-semibold text-gray-600 underline transition-colors hover:text-primary hover:no-underline">
                Forget Password?
              </Link>
            </div>
            <Button
              label="Sign In"
              color="primary"
              className="w-full"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
            />
          </div>
        )}
      </Form>
      <Text className="mt-5 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base">
        Don’t have an account?{' '}
        <Link
          to={routes.auth.signUp3}
          className="font-semibold text-gray-700 transition-colors hover:text-gray-1000">
          Sign Up
        </Link>
      </Text>
      {(loading || autoLoginLoading) && <CenterSpinner />}
    </>
  );
};
export default LoginForm;
