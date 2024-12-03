import { Product } from "../../types";

const ProductDescription = ({ product }: DefaultProps) => {
  return (
    <div>
      <h2>وصف المنتج</h2>
      <ul>
        {product.description.map((item, index) => (
          <li key={`description-item-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

interface DefaultProps {
  product: Product;
}
export default ProductDescription;
