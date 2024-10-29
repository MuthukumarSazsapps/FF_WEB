'use client';

import { Link } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { Password } from 'rizzui';
import { Checkbox } from 'rizzui';
import { useMedia } from 'react-use';
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
  const isMedium = useMedia('(max-width: 1200px)', false);
  const onSubmit: SubmitHandler<LoginFormFieldTypes> = data => {
    console.log(data);
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
          <div className="space-y-5 lg:space-y-6">
            <Input
              type="email"
              size={isMedium ? 'lg' : 'xl'}
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              {...register('username')}
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
            <div className="flex items-center justify-between pb-1">
              <Checkbox
                {...register('rememberMe')}
                label="Remember Me"
                className="[&>label>span]:font-medium"
              />
              <Link
                to={routes.auth.forgotPassword4}
                className="h-auto p-0 text-sm font-semibold text-gray-700 underline transition-colors hover:text-primary hover:no-underline">
                Forgot Password?
              </Link>
            </div>

            <Button className="w-full" type="submit" size={isMedium ? 'lg' : 'xl'}>
              Sign In
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base">
        Don’t have an account?{' '}
        <Link
          to={routes.auth.signUp4}
          className="font-semibold text-gray-700 transition-colors hover:text-primary">
          Sign Up
        </Link>
      </Text>
    </>
  );
}
