export type Type = 'success' | 'error';
export type IToast = { id: string; text: string; type: Type };
export type IToastContext = { toast: (message: string, type: Type) => void };
