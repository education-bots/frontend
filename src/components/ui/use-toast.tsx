"use client";

import { useCallback } from "react";

/** Toast type */
export type ToastType = {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number; // ms
};

/** Simple in-memory store with subscribers */
class ToastStore {
  toasts: ToastType[] = [];
  subs: ((t: ToastType[]) => void)[] = [];

  add(toast: Omit<ToastType, "id">) {
    const id = String(Date.now()) + Math.random().toString(36).slice(2, 8);
    const t = { id, duration: 5000, ...toast } as ToastType;
    this.toasts = [t, ...this.toasts];
    this.emit();
    // auto remove after duration
    setTimeout(() => this.remove(id), t.duration);
    return id;
  }

  remove(id: string) {
    this.toasts = this.toasts.filter((x) => x.id !== id);
    this.emit();
  }

  subscribe(fn: (t: ToastType[]) => void) {
    this.subs.push(fn);
    fn(this.toasts);
    return () => {
      this.subs = this.subs.filter((s) => s !== fn);
    };
  }

  emit() {
    this.subs.forEach((s) => s(this.toasts));
  }
}

const store = new ToastStore();

/** Hook consumer uses this to fire toasts */
export function useToast() {
  const toast = useCallback(
    (opts: Omit<ToastType, "id">) => {
      return store.add(opts);
    },
    []
  );

  const dismiss = useCallback((id: string) => store.remove(id), []);
  return { toast, dismiss };
}

/** Consumer internal access to store for the Toaster container */
export function _getToastStore() {
  return store;
}
