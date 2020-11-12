import React, { ButtonHTMLAttributes } from 'react';

import './style.css';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function PrimaryButton({ children, ...props }: PrimaryButtonProps) {
  return (
    <button className="primary-button" {...props}>
      {children}
    </button>
  );
}