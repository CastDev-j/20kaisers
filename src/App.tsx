import image from "/test.webp";
import uniqueImage from "/unique.webp";
import { useEffect, useState } from "react";

function App() {
  const [imagesCount, setImagesCount] = useState(0);
  const [uniqueIndex, setUniqueIndex] = useState(0);
  const [imageSize, setImageSize] = useState<number | null>(null);

  useEffect(() => {
    if (imageSize === null) {
      const input = window.prompt(
        "Tamaño de las imágenes, mientras más grande menos imágenes habrá",
        "25"
      );
      const size = Number(input);
      setImageSize(size > 0 ? size : 25);
      return;
    }

    function calculateImagesCount() {
      const imgWidth = imageSize!;
      const imgHeight = imageSize!;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const cols = Math.floor(screenWidth / imgWidth);
      const rows = Math.floor(screenHeight / imgHeight);
      return cols * rows;
    }

    const count = calculateImagesCount();
    setImagesCount(count);
    setUniqueIndex(Math.floor(Math.random() * count));

    function handleResize() {
      const newCount = calculateImagesCount();
      setImagesCount(newCount);
      setUniqueIndex(Math.floor(Math.random() * newCount));
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [imageSize]);

  if (imageSize === null) return null;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fill, ${imageSize}px)`,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {Array.from({ length: imagesCount }).map((_, i) =>
        i === uniqueIndex ? (
          <img
            key={i}
            src={uniqueImage}
            alt="Unique"
            style={{ width: imageSize, height: imageSize, objectFit: "cover" }}
          />
        ) : (
          <img
            key={i}
            src={image}
            alt="Test"
            style={{ width: imageSize, height: imageSize, objectFit: "cover" }}
          />
        )
      )}
    </div>
  );
}

export default App;
