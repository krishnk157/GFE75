import { useEffect } from "react";

export default function Post({ data, setPageNo }) {
  useEffect(() => {
    const images = document.querySelectorAll(".image-post");
    const lastImage = images[images.length - 1];

    if (!lastImage) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPageNo((prev) => prev + 1);
      }
    });

    observer.observe(lastImage);

    return () => observer.disconnect();
  }, [data]);

  return (
    <div className="container">
      {data.map((item) => (
        <img className="image-post" key={item.id} src={item.download_url} />
      ))}
    </div>
  );
}
