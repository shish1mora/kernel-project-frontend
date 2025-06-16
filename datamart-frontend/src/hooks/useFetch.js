import { useState, useEffect } from 'react';
import { getCachedData, saveCachedData, clearOldCache } from '../components/indexedDB';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const isLogging = false;

  useEffect(() => {
      if (!url) {
      setIsPending(false);
      return; // Прерываем, если URL отсутствует
        }

    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      setIsPending(true);
      setError(null);

      // Clear old cache entries
      await clearOldCache();

      // Check if data is in IndexedDB
      const cachedData = await getCachedData(url);
      if (cachedData) {
        if (isLogging) {
          console.log("Data found in cache:", cachedData);
        }
        setData(cachedData.data);
        setIsPending(false);
        return;
      }

      try {
        if (isLogging) {
          console.log("Start fetching");
        }
        const response = await fetch(url, { signal });
        if (isLogging) {
          console.log("End fetching");
        }

        if (!response.ok) {
          throw new Error('Не удалось получить данные');
        }

        const data = await response.json();
        setData(data);
        setIsPending(false);
        if (isLogging) {
          console.log("Data fetched from API, saving to cache:", data);
        }

        // Save to IndexedDB
        await saveCachedData(url, data);
      } catch (err) {
        if (err.name !== 'AbortError') {
        if (isLogging) {
          console.error("Fetch error:", err);
        }
          setError(err.message);
          setIsPending(false);
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url, isLogging]);

  return { data, isPending, error };
};

export default useFetch;
