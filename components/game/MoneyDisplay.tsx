"use client";

import { getMoney } from "@/app/actions/game";
import { useEffect, useState, useCallback } from "react";
import { useMoney } from "@/hooks/useMoney";

export default function MoneyDisplay() {
  const { money, setMoney } = useMoney(5000);
  const [loading, setLoading] = useState(true);

  const loadMoney = useCallback(async () => {
    try {
      const result = await getMoney();
      if (result.success && result.money !== undefined) {
        setMoney(result.money);
      }
    } catch (error) {
      console.error("Erreur lors du chargement de l'argent:", error);
    } finally {
      setLoading(false);
    }
  }, [setMoney]);

  useEffect(() => {
    loadMoney();
  }, [loadMoney]);

  if (loading) {
    return (
      <div className="mt-2 font-bold text-pink-400 text-lg flex items-center gap-2 justify-center">
        <span className="text-2xl">💎</span> ...
      </div>
    );
  }

  return (
    <div className="mt-2 font-bold text-pink-400 text-lg flex items-center gap-2 justify-center">
      <span className="text-2xl">💎</span> {money}
    </div>
  );
}
