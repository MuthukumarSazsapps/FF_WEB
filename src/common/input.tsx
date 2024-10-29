import React from 'react';
import { Path, UseFormRegister } from 'react-hook-form';
import { Input as RizzuiInput, InputProps } from 'rizzui';
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
  phoneNoInput?: boolean;
  requiredfield?: string;
  register: UseFormRegister<TFormValues>;
}

const Input = <TFormValues extends Record<string, any>>({
  label,
  name,
  inputClassName,
  requiredfield = undefined,
  className = 'col-span-1',
  textonly = false,
  numberonly = false,
  phoneNoInput = false,
  labelClassName,
  register,
  ...inputProps
}: CustomInputProps<TFormValues>) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let formattedValue = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    if (formattedValue.length === 1) {
      formattedValue = formattedValue.toUpperCase();
    }
    (e.target as HTMLInputElement).value = formattedValue;
  };
  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let formattedValue = e.target.value.replace(/[^0-9]/g, '');
    (e.target as HTMLInputElement).value = formattedValue;
  };
  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let formattedValue = e.target.value.replace(/[^0-9]/g, '');
    if (formattedValue.length === 1) {
      formattedValue = formattedValue.replace(/[^6-9]/g, '');
    }
    (e.target as HTMLInputElement).value = formattedValue;
  };
  return (
    <RizzuiInput
      label={label}
      onWheel={event => event.currentTarget.blur()}
      color="primary"
      onInput={
        textonly
          ? handleInputChange
          : !textonly && numberonly
            ? handleNumberInput
            : !textonly && !numberonly && phoneNoInput
              ? handlePhoneInput
              : undefined
      }
      helperClassName="text-violet-700 font-medium"
      className={className}
      inputClassName={cn('input-box-styles dark:text-white', inputClassName)}
      labelClassName={cn('input-label-styles', labelClassName)}
      {...register(name)}
      {...inputProps}
    />
  );
};

export default Input;
