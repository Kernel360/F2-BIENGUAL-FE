import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

export function Button({ label, onClick }: ButtonProps) {
  // eslint-disable-next-line react/button-has-type
  return <button onClick={onClick}>{label}</button>;
}
