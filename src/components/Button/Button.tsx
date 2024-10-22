import React from 'react';

import { Button as ShadcnButton } from '@/components/ui/button';

interface ButtonProps {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

function Button({
  variant = 'default',
  size = 'default',
  disabled = false,
  onClick,
  children,
  className = '',
}: ButtonProps): JSX.Element {
  const baseStyle = `btn ${variant} ${size} ${className}`;

  return (
    // eslint-disable-next-line react/button-has-type
    <ShadcnButton className={baseStyle} onClick={onClick} disabled={disabled}>
      {children}
    </ShadcnButton>
  );
}

export default Button;
