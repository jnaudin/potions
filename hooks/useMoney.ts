import { useState, useEffect } from "react";

export const useMoney = (initialMoney: number = 5000) => {
  const [money, setMoney] = useState(initialMoney);

  useEffect(() => {
    const handleMoneyUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<{ money: number }>;
      setMoney(customEvent.detail.money);
    };

    window.addEventListener(
      "money-updated",
      handleMoneyUpdate as EventListener
    );

    return () => {
      window.removeEventListener(
        "money-updated",
        handleMoneyUpdate as EventListener
      );
    };
  }, []);

  useEffect(() => {
    setMoney(initialMoney);
  }, [initialMoney]);

  return { money, setMoney };
};
