import React from 'react';

type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';
type CardShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl';
type CardAlign = 'left' | 'center';
type CardBg = 'white' | 'gray' | 'blue' | 'custom';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: CardPadding;
  shadow?: CardShadow;
  hover?: boolean;
  align?: CardAlign;
  background?: CardBg;
  customBgClass?: string;
  border?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  padding = "md",
  shadow = "md",
  hover = false,
  align = "left",
  background = "white",
  customBgClass = "",
  border = true
}) => {
  const paddingClasses: Record<CardPadding, string> = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const shadowClasses: Record<CardShadow, string> = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };

  const bgClasses: Record<CardBg, string> = {
    white: 'bg-white',
    gray: 'bg-gray-100',
    blue: 'bg-blue-50',
    custom: customBgClass
  };

  const hoverClass = hover ? 'hover:shadow-lg transition-shadow duration-200' : '';
  const borderClass = border ? 'border border-gray-200' : '';
  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={`${bgClasses[background]} ${borderClass} ${paddingClasses[padding]} ${shadowClasses[shadow]} ${hoverClass} ${alignClass} rounded-lg ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

export const CardBody: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`${className}`}>{children}</div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`mt-4 ${className}`}>{children}</div>
);

export default Card;

