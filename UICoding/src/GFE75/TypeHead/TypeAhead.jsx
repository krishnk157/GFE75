import { useEffect, useRef, useState } from "react";

const STATE = {
  LOADING: "LOADING",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
};

export default function TypeAhead() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  const [status, setStatus] = useState(STATE.LOADING);

  const cache = useRef({});

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    const fetchData = async () => {
      try {
        setStatus(STATE.LOADING);
        if (cache.current[query]) {
          setResult(cache.current[query]);
          setStatus(STATE.SUCCESS);
          return;
        }
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${query}&limit=10`,
          { signal }
        );
        const data = await res.json();
        setStatus(STATE.SUCCESS);
        cache.current[query] = data.products;
        setResult(data.products);
      } catch (error) {
        if (error.name !== "AbortError") {
          setStatus(STATE.ERROR);
        }
      }
    };
    //Debouce API call
    const timerId = setTimeout(fetchData, 1000);

    // clear timeout of previos render (cleared on unmount)
    return () => {
      clearTimeout(timerId);
      abortController.abort();
    };
  }, [query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {status === STATE.LOADING && <div> ...Loading </div>}
      {status === STATE.ERROR && <div>Error Occured </div>}
      {status === STATE.SUCCESS && (
        <ul>
          {result?.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
