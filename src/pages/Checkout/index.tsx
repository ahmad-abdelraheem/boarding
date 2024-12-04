import Cart from "../../components/Cart";
import { useProductContext } from "../../context/ProductContext";
import { Product } from "../../types";

const Checkout = () => {
  const product: Product[] = [
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
      imagePath: "",
    },
  ];
  const {quantity} = useProductContext();

  return (
    <div>
      {/* <Cart products={product} /> */}
      {quantity}
    </div>
  );
};

export default Checkout;
