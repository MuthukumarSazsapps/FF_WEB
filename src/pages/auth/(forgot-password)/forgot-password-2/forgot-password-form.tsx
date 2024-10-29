'use client';

import { Title, Text } from 'rizzui';
import { Input } from 'rizzui';
import { Button } from 'rizzui';
import { SubmitHandler } from 'react-hook-form';
import { Form } from 'common/form';
import { useState } from 'react';
import { routes } from 'config/routes';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useMedia } from 'react-use';
import { forgetPasswordSchema, ForgetPasswordFormFieldTypes } from 'utils/types';

const initialValues = {
  email: '',
};

export default function ForgetPasswordForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});
  const onSubmit: SubmitHandler<ForgetPasswordFormFieldTypes> = data => {
    console.log('Forgot password form data->', data);
    toast.success(
      <Text>
        Reset link sent to this email:{' '}
        <Text as="b" className="font-semibold">
          {data.email}
        </Text>
      </Text>,
    );
    setReset(initialValues);
  };

  return (
    <>
      <Form<ForgetPasswordFormFieldTypes>
        validationSchema={forgetPasswordSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
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
              {...register('email')}
              error={errors.email?.message as string}
            />
            <Button
              className="w-full border-2 border-primary-light text-base font-medium"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
              color="info"
              rounded="pill">
              Reset Password
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-5 text-center text-[15px] leading-loose text-gray-500 lg:text-start xl:mt-7 xl:text-base">
        Don’t want to reset?{' '}
        <Link
          to={routes.auth.signIn2}
          className="font-semibold text-gray-700 transition-colors hover:text-blue">
          Sign In
        </Link>
      </Text>
    </>
  );
}
