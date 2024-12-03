import { useEffect, useState } from "react";
import ImageCarousel from "../../components/ImageViewer";
import InfoBlock from "../../components/InfoBlock";
import OptionGroup from "../../components/OptionGroup";
import style from "./Home.module.scss";
import ProductDescription from "../../components/ProductDescription";
import { Product } from "../../types";
import NumericInput from "../../components/NumricInput";

const Home = () => {
  const items = [
    "https://storage.googleapis.com/bosta-files/products_images/NTcwNjEyX18yMDI0LTExLTA0VDE0OjE5OjIyLjYzN1pfMTAuanBn.jpg",
    "https://storage.googleapis.com/bosta-files/products_images/NjIyOTQzX18yMDI0LTExLTA0VDE0OjE5OjI3LjY2NVpfMi5qcGc=.jpg",
    "https://storage.googleapis.com/bosta-files/products_images/OTQyMjZfXzIwMjQtMDgtMTdUMTc6NDI6MTUuNDMyWl8oMikuanBn.jpg",
  ];
  const products: Product[] = [
    {
      name: "نسخة الجيب",
      price: 8,
      features: ["66 كرت", "علبة بحجم الجيب"],
      description: [
        "النسخة الشاملة ( الكلاسيك - الحرامي - صاحب صاحبة",
        "علبة جديدة بحجم الجيب علشان تكون معاك في كل مكان.",
        "تقدر تلعبها فردي او اتنين ضد اتنين.",
        "تحتوي على ٦٦ كارت.",
      ],
    },
    {
      name: "صاحب صاحبه",
      price: 10,
      features: ["66 كرت", "بكج مميز", "3 كروت جديدة"],
      description: [
        "بتقدر تلعبها 2 ضد 2 أو بشكل فردي",
        "3 كروت جديدة",
        "66 كرت",
        "علبة جديدة بتصميم مرتب",
      ],
    },
  ];
  const [selection, setSelection] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {}, [selection]);
  const selectionHandler = (index: number) => {
    setSelection(index);
  };

  const quantityIncrement = () => {
    setQuantity(quantity + 1);
  };
  const quantityDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      <div>
        <ImageCarousel items={items} interval={3000} activeIndex={0} />
      </div>
      <h1>سكرو ({products[selection].name})</h1>
      <span className="price">{products[selection].price} د.أ</span>
      <InfoBlock>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-truck"
            viewBox="0 0 16 16"
          >
            <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
          </svg>
          <span>توصيل خلال 48 ساعة.</span>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-cash-stack"
            viewBox="0 0 16 16"
          >
            <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
            <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z" />
          </svg>
          <span>الدفع عند الاستلام.</span>
        </div>
      </InfoBlock>
      <OptionGroup
        selectedOption={selection}
        options={products}
        selectHandler={selectionHandler}
      >
        <h2>اكثر من خيار، شو بناسبك؟</h2>
      </OptionGroup>
      <ProductDescription product={products[selection]} />
      <NumericInput value={quantity} increment={quantityIncrement} decrement={quantityDecrement}/>
    </div>
  );
};

export default Home;
