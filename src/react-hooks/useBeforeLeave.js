import { useEffect } from 'react';

const useBeforeLeave = (onBeofre) => {
  const handle = (e) => {
    const { clientY } = e;
    if (clientY <= 0) {
      onBeofre();
    }
  };

  useEffect(() => {
    document.addEventListener('mouseleave', handle);
    return () => document.removeEventListener('mouseleave', handle);
  }, []);
};

export default useBeforeLeave;
