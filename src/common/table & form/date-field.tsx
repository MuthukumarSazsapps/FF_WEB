import React from 'react';
import { DatePicker, DatePickerProps } from 'common/datepicker';
import { Text } from 'rizzui';

export default function DateFiled({
  onClear,
  placeholderText = 'Select date',
  inputProps,
  label,
  ...props
}: DatePickerProps<any> & { onClear?: () => void }) {
  return (
    <div>
      {label && <Text className="font-medium mb-2">{label}</Text>}
      <DatePicker
        monthsShown={1}
        placeholderText={placeholderText}
        selectsRange
        inputProps={{
          inputClassName: 'h-9 [&_input]:text-ellipsis input-box-styles',
          ...inputProps,
        }}
        className="w-72"
        {...props}
      />
    </div>
  );
}
