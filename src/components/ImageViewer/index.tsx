import { useEffect, useState } from "react";
import style from "./ImageViewer.module.scss";

const ImageCarousel = ({
  items,
  interval = 5000,
  activeIndex = 0,
}: DefaultProps) => {
  const [currentIndex, setCurrentIndex] = useState(activeIndex ?? 0);
  let intervalFunction: number;

  useEffect(() => {
    !intervalFunction &&
      (intervalFunction = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }, interval));
  }, []);

  return (
    <div className={style.carousel}>
      <div className={style.carouselItem}>
        <img src={items[currentIndex]} />
      </div>
    </div>
  );
};

interface DefaultProps {
  items: any[];
  interval: number;
  activeIndex: number;
}

export default ImageCarousel;
