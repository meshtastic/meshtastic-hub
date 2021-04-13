import React from 'react';

export interface BadgeProps {
  message: string;
  variant: 'Primary' | 'Warning' | 'Danger' | 'Success' | 'Neutral';
}

const Badge = (props: BadgeProps) => {
  return (
    <span
      className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
        props.variant === 'Primary'
          ? 'text-blue-900'
          : props.variant === 'Warning'
          ? 'text-yellow-900'
          : props.variant === 'Danger'
          ? 'text-red-900'
          : props.variant === 'Success'
          ? 'text-green-900'
          : props.variant === 'Neutral'
          ? 'text-gray-900'
          : null
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 opacity-50 rounded-full ${
          props.variant === 'Primary'
            ? 'bg-blue-200'
            : props.variant === 'Warning'
            ? 'bg-yellow-200'
            : props.variant === 'Danger'
            ? 'bg-red-200'
            : props.variant === 'Success'
            ? 'bg-green-200'
            : props.variant === 'Neutral'
            ? 'bg-gray-200'
            : null
        }`}
      ></span>
      <span className="relative">{props.message}</span>
    </span>
  );
};

export default Badge;
