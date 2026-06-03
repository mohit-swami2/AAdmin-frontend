import { useState, useCallback } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  const open = useCallback((item = null) => {
    setData(item);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setData(null);
  }, []);

  return { isOpen, open, close, data };
};
