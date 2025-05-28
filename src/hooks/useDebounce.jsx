import { useEffect, useRef } from "react";

function useDebounce(callback, ms, dependencys = []) {
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      callback();
    }, ms);

    return () => clearTimeout(timeoutRef.current);
  }, [...dependencys, ms]);
}

export default useDebounce;
