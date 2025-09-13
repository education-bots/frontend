"use client";

import React from "react";
import { ToastType } from "./use-toast";

export default function Toast({
  toast,
  onClose,
}: {
  toast: ToastType;
  onClose: (id: string) => void;
}) {
  const variantStyles =
    toast.variant === "destructive"
      ? "bg-red-50 border-red-200 text-red-900"
      : "bg-white border-gray-200 text-gray-900";

  return (
    <div
      role="status"
      className={`max-w-sm w-full border ${variantStyles} rounded-md shadow-md p-3 flex gap-3 items-start transition transform duration-150`}
    >
      <div className="flex-1">
        {toast.title && <div className="font-semibold text-sm">{toast.title}</div>}
        {toast.description && (
          <div className="text-xs text-gray-600 mt-1">{toast.description}</div>
        )}
      </div>

      <div className="flex items-start">
        <button
          onClick={() => onClose(toast.id)}
          aria-label="Close"
          className="text-gray-400 hover:text-gray-600 ml-2"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
