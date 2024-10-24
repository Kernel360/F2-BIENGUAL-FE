import React from 'react';

import { Input as ShadcnInput } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'default' | 'small' | 'large';
  error?: boolean;
  errorMessage?: string;
}

const sizeClasses = {
  default: 'h-10 px-4 py-2 text-base',
  small: 'h-8 px-3 py-1 text-sm',
  large: 'h-12 px-5 py-3 text-lg',
};

function Input({
  size = 'default',
  error,
  errorMessage,
  className,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col space-y-1">
      <ShadcnInput
        className={cn(
          'border rounded-md ',
          sizeClasses[size],
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500 ring-red-500'
            : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ring-blue-500',
          className,
        )}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
      {error && errorMessage && (
        <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
      )}
    </div>
  );
}

export default Input;
