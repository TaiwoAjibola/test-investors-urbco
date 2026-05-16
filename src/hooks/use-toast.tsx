"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { Toast, ToastProvider, ToastViewport, ToastTitle, ToastDescription, ToastAction, ToastClose } from "@/components/ui/toast";
import type { ToastProps } from "@/components/ui/toast";

type ToastData = {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastProps["variant"];
  action?: React.ReactNode;
};

interface ToastContextType {
  toast: (data: Omit<ToastData, "id">) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProviderWrapper({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const toast = useCallback(({ title, description, variant = "default", action }: Omit<ToastData, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, title, description, variant, action }]);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const success = useCallback((title: string, description?: string) => {
    toast({ title, description, variant: "success" });
  }, [toast]);

  const error = useCallback((title: string, description?: string) => {
    toast({ title, description, variant: "destructive" });
  }, [toast]);

  const info = useCallback((title: string, description?: string) => {
    toast({ title, description, variant: "default" });
  }, [toast]);

  return (
    <ToastContext.Provider value={{ toast, success, error, info, dismiss }}>
      <ToastProvider>
        {children}
        {toasts.map((toastData) => (
          <Toast
            key={toastData.id}
            variant={toastData.variant}
            onOpenChange={(open) => {
              if (!open) dismiss(toastData.id);
            }}
          >
            <div className="grid gap-1">
              {toastData.title && <ToastTitle>{toastData.title}</ToastTitle>}
              {toastData.description && <ToastDescription>{toastData.description}</ToastDescription>}
            </div>
            {toastData.action}
            <ToastClose />
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProviderWrapper");
  }
  return context;
}
