import { useState } from "react";

const images = [
  {
    src: "https://picsum.photos/id/600/600/400",
    alt: "Forest",
  },
  {
    src: "https://picsum.photos/id/100/600/400",
    alt: "Beach",
  },
  {
    src: "https://picsum.photos/id/200/600/400",
    alt: "Yak",
  },
  {
    src: "https://picsum.photos/id/300/600/400",
    alt: "Hay",
  },
  {
    src: "https://picsum.photos/id/400/600/400",
    alt: "Plants",
  },
  {
    src: "https://picsum.photos/id/500/600/400",
    alt: "Building",
  },
];

function clsx(...classnames) {
  return classnames.filter(Boolean).join(" ");
}

export default function ImageCarousel() {
  const [currIndex, setCurrIndex] = useState(0);
  const currImage = images[currIndex];
  return (
    <div className="image-carousel">
      <img
        alt={currImage.alt}
        src={currImage.src}
        key={currImage.src}
        className="image-carousel--img"
      />
      <button
        aria-label="Previous Image"
        className="image-carousel-btn prev-btn"
        onClick={() => {
          const nextIndex = (currIndex - 1 + images.length) % images.length;
          setCurrIndex(nextIndex);
        }}
      >
        &#10094;
      </button>
      <div className="image-carousel-pages">
        {images.map(({ alt, src }, index) => (
          <button
            className={clsx(
              "image-carousel-pages-btn",
              index === currIndex && "image-carousel-pages-btn--active"
            )}
            onClick={() => {
              setCurrIndex(index);
            }}
            key={src}
            aria-label={`Navigate to${alt}`}
          />
        ))}
      </div>
      <button
        aria-label="Next Image"
        className="image-carousel-btn next-btn"
        onClick={() => {
          const nextIndex = (currIndex + 1) % images.length;
          setCurrIndex(nextIndex);
        }}
      >
        &#10095;
      </button>
    </div>
  );
}
