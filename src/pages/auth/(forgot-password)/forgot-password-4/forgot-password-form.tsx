'use client';

import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Button } from 'rizzui';
import { Input } from 'rizzui';
import { useMedia } from 'react-use';
import { Form } from 'common/form';
import { Text } from 'rizzui';
import { routes } from 'config/routes';
import { forgetPasswordSchema, ForgetPasswordFormFieldTypes } from 'utils/types';

const initialValues = {
  email: '',
};

export default function ForgetPasswordForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});
  const onSubmit: SubmitHandler<ForgetPasswordFormFieldTypes> = data => {
    console.log('forgot password form', data);
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
          <div className="space-y-6">
            <Input
              type="email"
              size={isMedium ? 'lg' : 'xl'}
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              {...register('email')}
              error={errors.email?.message}
            />
            <Button className="w-full" type="submit" size={isMedium ? 'lg' : 'xl'}>
              Reset Password
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base">
        Don’t want to reset?{' '}
        <Link
          to={routes.auth.signIn4}
          className="font-semibold text-gray-700 transition-colors hover:text-primary">
          Sign In
        </Link>
      </Text>
    </>
  );
}
