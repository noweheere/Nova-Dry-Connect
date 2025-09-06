
import React from 'react';

// Fix: Extend React.HTMLAttributes<HTMLDivElement> to allow passing standard div props like onClick.
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    // Fix: Spread the rest of the props (...props) onto the div to apply them.
    <div className={`bg-gray-800 shadow-lg rounded-xl p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;