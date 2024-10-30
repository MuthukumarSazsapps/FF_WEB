import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Text } from 'rizzui';
import { cn } from 'utils';

type SelectFieldValue = { value?: string; label?: string };
interface SazsSelectProps extends React.ComponentProps<typeof Select> {
  label?: string;
  className?: string;
  divclass?: string;
  value?: SelectFieldValue;
  isClearable?: boolean;
  height?: string;
  options: SelectFieldValue[];
  onChange?: (value: any) => void;
  isMulti?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  defaultValue?: SelectFieldValue;
  errors?: string;
}

const animatedComponents = makeAnimated();

const SazsSelect: React.FC<SazsSelectProps> = ({
  label,
  defaultValue,
  value,
  className,
  divclass,
  height = '36px',
  isClearable = false,
  options,
  isDisabled = false,
  onChange,
  isMulti = false,
  placeholder = 'Select City',
  errors,
  ...rest
}) => {
  return (
    <div className={divclass}>
      <label className="input-label-styles" htmlFor="select">
        {label}
      </label>
      <Select
        defaultValue={defaultValue}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: 'grey-700',
            border: 'none',
            height: height,
          }),
        }}
        {...rest}
        {...(value?.value ? { value } : {})}
        className={cn('basic-single mt-1.5 rounded-md input-box-styles', className)}
        isDisabled={isDisabled}
        isClearable={isClearable}
        options={options}
        onChange={onChange}
        isMulti={isMulti}
        components={animatedComponents}
        placeholder={placeholder}
      />
      {errors ? <Text className="text-xs text-red">{errors}</Text> : <></>}
    </div>
  );
};

export default SazsSelect;
