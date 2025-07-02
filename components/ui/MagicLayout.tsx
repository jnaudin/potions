"use client";

import { ReactNode } from "react";
import Link from "next/link";
import MoneyDisplay from "../game/MoneyDisplay";

export default function LayoutMagique({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-white font-comic flex flex-col">
      <header className="p-4 pb-2 flex flex-col items-center text-yellow-flashy font-bold text-lg">
        <nav className="flex flex-row gap-4 w-full justify-center">
          <Link href="/" className="hover:underline whitespace-nowrap">
            🧙 Accueil
          </Link>
          <Link href="/brew" className="hover:underline whitespace-nowrap">
            🧑‍🍳 Créer
          </Link>
          <Link href="/inventory" className="hover:underline whitespace-nowrap">
            💎 Boutique
          </Link>
          <Link href="/potions" className="hover:underline whitespace-nowrap">
            📚 Recettes
          </Link>
        </nav>
        <MoneyDisplay />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        {children}
      </main>
    </div>
  );
}
