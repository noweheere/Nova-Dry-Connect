
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/50',
    secondary: 'bg-gray-600 text-gray-200 hover:bg-gray-500 focus:ring-4 focus:ring-gray-500/50',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:ring-red-500/50',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;