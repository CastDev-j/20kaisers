import image from "/test.webp";
import { useEffect, useState } from "react";

function App() {
  const [imagesCount, setImagesCount] = useState(0);

  const imageSize = 25;

  useEffect(() => {
    function calculateImagesCount() {
      const imgWidth = imageSize;
      const imgHeight = imageSize;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const cols = Math.ceil(screenWidth / imgWidth);
      const rows = Math.ceil(screenHeight / imgHeight);
      return cols * rows;
    }

    setImagesCount(calculateImagesCount());

    function handleResize() {
      setImagesCount(calculateImagesCount());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      {Array.from({ length: imagesCount }).map((_, i) => (
        <img
          key={i}
          src={image}
          alt="Test"
          style={{ width: imageSize, height: imageSize, objectFit: "cover" }}
        />
      ))}
    </div>
  );
}

export default App;
