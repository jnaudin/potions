import clsx from "clsx";
import { MagicCardProps } from "@/types/game";

export default function MagicCard({ children, className }: MagicCardProps) {
  return (
    <div
      className={clsx(
        "bg-background border-2 border-sky-flashy rounded-2xl p-4 shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
}
