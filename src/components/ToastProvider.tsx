import type { IToastContext, IToast, Type } from '@/@types/toast';
import React, { createContext, Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Toast from './Toast';

type Props = {
  children: React.ReactNode;
};

export const ToastContext = createContext<IToastContext>({
  toast: function (message: string): void {
    throw new Error('Function not implemented.');
  },
});

export const ToastProvider = ({ children }: Props) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const deleteToast = (id: string) => {
    setToasts((currentToasts) => {
      const index = currentToasts.findIndex((toast) => toast.id === id);
      const copyToasts = [...currentToasts];
      copyToasts.splice(index, 1);
      return copyToasts;
    });
  };

  const toast = (message: string, type: Type) => {
    setToasts((currentToasts) => {
      const id = uuidv4();
      setTimeout(() => deleteToast(id), 5000);
      return [...currentToasts, { text: message, id, type }];
    });
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 z-20 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {toasts.map((toast) => (
            <Toast type={toast.type} key={toast.id}>
              {toast.text}
            </Toast>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
};
