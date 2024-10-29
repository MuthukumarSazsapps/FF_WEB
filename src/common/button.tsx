import React from 'react';
import { Button as RizzuiButton, type ButtonProps } from 'rizzui';
import { cn } from 'utils';

interface ButtonPropsExtended extends ButtonProps {
  className?: string;
  label?: React.ReactNode;
  ref?: React.ForwardedRef<HTMLButtonElement>;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonPropsExtended>(
  (
    {
      label,
      color = 'info',
      variant = 'solid',
      type = 'button',
      isLoading,
      className,
      onClick,
      onChange,
      ...restProps
    },
    ref,
  ) => {
    return (
      <RizzuiButton
        onChange={onChange}
        variant={variant}
        isLoading={isLoading}
        color={color}
        type={type}
        onClick={onClick}
        className={cn(
          'w-full @xl:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100',
          className,
        )}
        {...restProps}>
        {label}
      </RizzuiButton>
    );
  },
);

export default Button;
