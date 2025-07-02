"use client";

import { useEffect, useState } from "react";
import { MagicToastProps } from "@/types/game";

const bgMap = {
  success: "bg-green-600 text-white",
  error: "bg-red-600 text-white",
  info: "bg-blue-600 text-white",
};

export default function MagicToast({
  message,
  type = "info",
  duration = 3000,
}: MagicToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center pointer-events-none">
      <div
        role="alert"
        aria-live="assertive"
        className={`px-6 py-3 rounded-lg shadow-lg font-semibold text-base pointer-events-auto transition-all ${bgMap[type]}`}
      >
        {message}
      </div>
    </div>
  );
}
