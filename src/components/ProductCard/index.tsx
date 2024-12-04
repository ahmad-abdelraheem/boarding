import { Product } from "../../types";
import style from './ProductCard.module.scss';

const ProductCard = ({product, quantity}: DefaultProps) => {
    return (
        <div className={style.productCard}>
            <img src={product.imagePath} alt={`${product.name} image`} />
            <div className={style.details}>
                <h3>{product.name}</h3>
                <span className={style.price}>{product.price} د.أ</span>
            </div>
        </div>
    );
}

interface DefaultProps {
    product: Product;
    quantity: number;
}

export default ProductCard;