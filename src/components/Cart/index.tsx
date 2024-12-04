import { Product } from "../../types";
import ProductCard from "../ProductCard";

const Cart = ({ products }: DefaultProps) => {
  return (
    <>
      {products.map((product: Product, index: number) => (
        <ProductCard product={product} key={`product-${index}`} quantity={1} />
      ))}
    </>
  );
};

interface DefaultProps {
  products: Product[];
}

export default Cart;
