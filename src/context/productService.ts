import { Product } from "../types";

/**
 * Service handle product and selection, uses singleton design pattern
 */
class ProductService {
  /**
   * The instance of the class
   */
  private static instance: ProductService;

  /**
   * Private constructor to prevent instantiation
   */
  private constructor() {}

  /**
   * Return the same instance of the class
   * @returns {ProductService}
   */
  public static _Constructor() {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  /**
   * List of products
   */
  products: Product[] = [
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
      imagePath: "",
    },
  ];

  /**
   * selected quantity of the product
   */
  quantity: number = 1;

  /**
   * The selected option
   */
  selectedProduct: Product = this.products[0];

  /**
   * Increments the quantity
   */
  incrementQuantity(): void {
    this.quantity += 1;
  }

  /**
   * Decrements the quantity
   */
  decrementQuantity(): void {
    this.quantity -= 1;
  }

  /**
   * Updates the selected option
   * @param product The option to be selected
   */
  updateSelected(product: Product): void {
    this.selectedProduct = product;
  }
}

export default ProductService;
