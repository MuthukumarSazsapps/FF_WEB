'use client';

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Password } from 'rizzui';
import { Checkbox } from 'rizzui';
import { Button } from 'rizzui';
import { Input } from 'rizzui';
import { Form } from 'common/form';
import { Text } from 'rizzui';
import { routes } from 'config/routes';
import { LoginSchema, LoginFormFieldTypes } from 'utils/types';

const initialValues: LoginFormFieldTypes = {
  username: 'admin@admin.com',
  password: 'admin',
  rememberMe: true,
};

export default function SignInForm() {
  //TODO: why we need to reset it here
  const [reset, setReset] = useState({});
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormFieldTypes> = data => {
    navigate('/');
    // signIn('credentials', {
    //   ...data,
    // });
    setReset({ email: '', password: '', isRememberMe: false });
  };

  return (
    <>
      <Form<LoginFormFieldTypes>
        validationSchema={LoginSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
          defaultValues: initialValues,
        }}>
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              type="email"
              size="lg"
              label="Email"
              placeholder="Enter your email"
              color="info"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('username')}
              error={errors.username?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              color="info"
              {...register('password')}
              error={errors.password?.message}
            />
            <div className="flex items-center justify-between pb-2">
              <Checkbox
                {...register('rememberMe')}
                label="Remember Me"
                color="info"
                variant="flat"
                className="[&>label>span]:font-medium"
              />
              <Link
                to={routes.auth.forgotPassword1}
                className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline">
                Forget Password?
              </Link>
            </div>
            <Button className="w-full" type="submit" size="lg" color="info">
              <span>Sign In</span> <PiArrowRightBold className="ms-2 mt-0.5 h-6 w-6" />
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
        Don’t have an account?{' '}
        <Link
          to={routes.auth.signUp1}
          className="font-semibold text-gray-700 transition-colors hover:text-blue">
          Sign Up
        </Link>
      </Text>
    </>
  );
}
