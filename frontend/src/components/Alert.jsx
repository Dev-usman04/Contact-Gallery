import React from 'react';

const Alert = ({ alert }) => {
  if (!alert) return null;

  const alertStyles = {
    success: {
      bg: 'bg-gradient-to-r from-green-50 to-green-100',
      text: 'text-green-800',
      border: 'border-green-200',
      icon: '✅'
    },
    error: {
      bg: 'bg-gradient-to-r from-red-50 to-red-100',
      text: 'text-red-800',
      border: 'border-red-200',
      icon: '❌'
    }
  };

  const style = alertStyles[alert.type];

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm animate-slideInRight`}>
      <div className={`${style.bg} ${style.text} ${style.border} border p-4 rounded-lg shadow-lg flex items-center space-x-3`}>
        <span className="text-xl">{style.icon}</span>
        <div className="flex-1">
          <p className="font-medium">{alert.msg}</p>
        </div>
        <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default Alert;