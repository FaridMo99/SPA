import { useEffect, useRef } from "react";

function useDebounce(callback, ms, deps = []) {
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      callback();
    }, ms);

    return () => clearTimeout(timeoutRef.current);
  }, [...deps, ms]);
}

export default useDebounce;
