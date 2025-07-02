import { useTransition, useState } from "react";

export const useServerAction = () => {
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);

  const executeAction = async (action: () => Promise<any>) => {
    setLoading(true);
    try {
      await startTransition(async () => {
        await action();
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    isPending,
    loading,
    executeAction,
  };
};
