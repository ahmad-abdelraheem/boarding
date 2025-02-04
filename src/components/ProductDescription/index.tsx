import { useEffect } from "react";
import { Product } from "../../types";
import style from "./ProductDescription.module.scss"
const ProductDescription = ({ product }: DefaultProps) => {

  useEffect(() => {
    console.log('product from ProductDescription: ', product)
  }, [product])

  return (
    <div className={style.productDescription}>
      <h2>وصف المنتج</h2>
      <ul className={style.description}>
        {product?.description?.map((item, index) => (
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
