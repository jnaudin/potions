"use client";

import clsx from "clsx";
import { MagicButtonProps } from "@/types/game";

export default function MagicButton({
  variant = "primary",
  className,
  ...props
}: MagicButtonProps) {
  const base =
    "px-5 py-2 rounded-full font-bold transition shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const variants = {
    primary: "bg-pink-flashy text-black hover:bg-yellow-flashy",
    secondary: "bg-sky-flashy text-black hover:bg-pink-flashy",
  };

  return (
    <button className={clsx(base, variants[variant], className)} {...props} />
  );
}
