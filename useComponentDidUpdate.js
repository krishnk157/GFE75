import { useEffect, useRef } from "react";

export default function useComponentDidUpdate(callback, dependencies) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    callback();
  }, dependencies);
}
