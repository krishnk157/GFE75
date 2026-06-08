import { useEffect, useState } from "react";
import Post from "./Post";

export default function InfiniteScroll() {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://picsum.photos/v2/list?page=${pageNo}&limit=3`
      );
      const data = await res.json();
      setData((prev) => [...prev, ...data]);
    };
    fetchData();
  }, [pageNo]);

  return <Post data={data} setPageNo={setPageNo} />;
}
