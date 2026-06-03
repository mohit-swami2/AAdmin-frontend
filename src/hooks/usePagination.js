import { useState, useCallback } from 'react';

export const usePagination = (initialPage = 1) => {
  const [page, setPage] = useState(initialPage);
  const [total, setTotal] = useState(0);

  const totalPages = Math.max(1, Math.ceil(total / 10));

  const resetPage = useCallback(() => setPage(1), []);

  return {
    page,
    setPage,
    total,
    setTotal,
    totalPages,
    resetPage,
  };
};
