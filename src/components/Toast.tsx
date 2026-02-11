import React from 'react';
import { useToast } from '../context/toastContext';

const Toast: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {toasts.map((toast) => {
        const bgColor = {
          success: 'bg-green-500',
          error: 'bg-red-500',
          info: 'bg-blue-500',
          warning: 'bg-yellow-500',
        }[toast.type];

        return (
          <div
            key={toast.id}
            className={`${bgColor} text-white px-4 py-3 rounded shadow-lg flex items-center justify-between animate-fade-in`}
          >
            <span className="text-sm">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 hover:opacity-80"
              aria-label="Close toast"
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;
