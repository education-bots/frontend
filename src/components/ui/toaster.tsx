"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { _getToastStore, ToastType } from "./use-toast";
import Toast from "./toast";

/** A lightweight Toaster container — place <Toaster /> at root (app/layout) */
export default function Toaster() {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  useEffect(() => {
    const unsub = _getToastStore().subscribe(setToasts);
    return unsub;
  }, []);

  if (typeof document === "undefined") return null;
  return createPortal(
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 w-full max-w-sm flex flex-col gap-2 px-4">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <Toast toast={t} onClose={(id) => _getToastStore().remove(id)} />
        </div>
      ))}
    </div>,
    document.body
  );
}
