import { useState, useEffect } from 'react';

export const useData = <T>(dataFetcher: (id?: string) => Promise<T>, id: string) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setError(null);
    setData(null);
    (async () => {
      setIsLoading(true);
      try {
        const response = await dataFetcher(id);
        if (mounted) {
          setData(response);
        }
      } catch (e) {
        setError(e);
      }
      setIsLoading(false);
    })();
    const cleanup = () => {
      mounted = false;
    };
    return cleanup;
  }, [id]);

  return { data, setData, isLoading, error, setError };
};
