import { useState, useEffect } from 'react';

const useNetwork = (onChange) => {
  const [status, setStatus] = useState(navigator.onLine || true);
  const handleChange = () => {
    onChange(navigator.onLine);
    setStatus(navigator.onLine);
  };
  useEffect(() => {
    window.addEventListener('online', handleChange);
    window.addEventListener('offline', handleChange);
    return () => {
      window.removeEventListener('online', handleChange);
      window.removeEventListener('offline', handleChange);
    };
  }, []);
  return status;
};

export default useNetwork;
