import { useEffect, useRef, useState } from 'react';

const MIN_TABLE_LOADING_MS = 1000;

/**
 * Keeps loading true for at least minMs to avoid skeleton flicker.
 */
export const useMinLoading = (isLoading, minMs = MIN_TABLE_LOADING_MS) => {
  const [showLoading, setShowLoading] = useState(isLoading);
  const startedAt = useRef(null);

  useEffect(() => {
    if (isLoading) {
      startedAt.current = Date.now();
      setShowLoading(true);
      return undefined;
    }

    if (!startedAt.current) {
      setShowLoading(false);
      return undefined;
    }

    const elapsed = Date.now() - startedAt.current;
    const remaining = Math.max(0, minMs - elapsed);
    const timer = setTimeout(() => {
      setShowLoading(false);
      startedAt.current = null;
    }, remaining);

    return () => clearTimeout(timer);
  }, [isLoading, minMs]);

  return showLoading;
};

export default useMinLoading;
