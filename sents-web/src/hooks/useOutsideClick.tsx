import { useEffect } from 'react';

const useOutsideClick = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
};

export default useOutsideClick;
