import { useEffect, useRef } from "react";

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/

export const useInterval = (callback, delay, setIntervalId) => {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      setIntervalId(id);
      return () => clearInterval(id)
    }
  }, [delay, setIntervalId])
}

export const range = (number) => [...Array(Math.round(number)).keys()]