import React from 'react';
import { Path, UseFormRegister } from 'react-hook-form';
import { Password as RizzuiPassword, InputProps } from 'rizzui';
import { cn } from 'utils';

interface CustomInputProps<TFormValues extends Record<string, any>>
  extends Omit<InputProps, 'name'> {
  name: Path<TFormValues>;
  label?: string;
  className?: string;
  labelClassName?: string;
  placeholder?: string;
  textonly?: boolean;
  numberonly?: boolean;
  requiredfield?: string;
  register: UseFormRegister<TFormValues>;
}

const Password = <TFormValues extends Record<string, any>>({
  label,
  name,
  inputClassName = 'input-box-styles',
  requiredfield = undefined,
  className = 'col-span-1',
  textonly = false,
  numberonly = false,
  labelClassName = 'input-label-styles',
  register,
  ...inputProps
}: CustomInputProps<TFormValues>) => {
  return (
    <RizzuiPassword
      label={label}
      onWheel={event => event.currentTarget.blur()}
      color="primary"
      className={className}
      inputClassName={cn(inputClassName)}
      labelClassName={labelClassName}
      {...register(name)}
      {...inputProps}
    />
  );
};

export default Password;
