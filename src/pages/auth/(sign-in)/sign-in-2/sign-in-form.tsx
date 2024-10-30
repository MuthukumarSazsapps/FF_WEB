'use client';

import { Link } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { Input } from 'rizzui';
import { Button } from 'rizzui';
import { Password } from 'rizzui';
import { Checkbox } from 'rizzui';
import { useMedia } from 'react-use';
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
  const isMedium = useMedia('(max-width: 1200px)', false);
  const onSubmit: SubmitHandler<LoginFormFieldTypes> = data => {
    console.log('Sign in data', data);
  };

  return (
    <>
      <Form<LoginFormFieldTypes>
        validationSchema={LoginSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
          defaultValues: initialValues,
        }}>
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              type="email"
              size={isMedium ? 'lg' : 'xl'}
              label="Email"
              placeholder="Enter your email"
              rounded="pill"
              color="info"
              className="[&>label>span]:font-medium"
              {...register('username')}
              error={errors.username?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size={isMedium ? 'lg' : 'xl'}
              rounded="pill"
              color="info"
              className="[&>label>span]:font-medium"
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
                to={routes.auth.forgotPassword2}
                className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline">
                Forget Password?
              </Link>
            </div>
            <Button
              className="w-full border-2 border-primary-light text-base font-bold"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
              color="info"
              rounded="pill">
              Sign in
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-5 text-center text-[15px] leading-loose text-gray-500 lg:text-start xl:mt-7 xl:text-base">
        Don’t have an account?{' '}
        <Link
          to={routes.auth.signUp2}
          className="font-semibold text-gray-700 transition-colors hover:text-blue">
          Create Account
        </Link>
      </Text>
    </>
  );
}
