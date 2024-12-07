import { Product } from "../types";

export class ProductService {
  private static instance: ProductService;
  private products: Product[] = [];

  private constructor() {
    this.loadProducts();
  }
  public static _constructor() {
    if (!this.instance) this.instance = new ProductService();
    return this.instance;
  }

  loadProducts() {
    // TODO : fetch products from the API when ready
    this.products = [
      {
        id: 0,
        name: "نسخة الجيب",
        price: 8,
        features: ["66 كرت", "علبة بحجم الجيب"],
        description: [
          "النسخة الشاملة ( الكلاسيك - الحرامي - صاحب صاحبة",
          "علبة جديدة بحجم الجيب علشان تكون معاك في كل مكان.",
          "تقدر تلعبها فردي او اتنين ضد اتنين.",
          "تحتوي على ٦٦ كارت.",
        ],
        image: "https://storage.googleapis.com/bosta-files/products_images/NTcwNjEyX18yMDI0LTExLTA0VDE0OjE5OjIyLjYzN1pfMTAuanBn.jpg",
      },
      {
        id: 1,
        name: "صاحب صاحبه",
        price: 10,
        features: ["66 كرت", "بكج مميز", "3 كروت جديدة"],
        description: [
          "بتقدر تلعبها 2 ضد 2 أو بشكل فردي",
          "3 كروت جديدة",
          "66 كرت",
          "علبة جديدة بتصميم مرتب",
        ],
        image:
          "https://storage.googleapis.com/bosta-files/products_images/OTQyMjZfXzIwMjQtMDgtMTdUMTc6NDI6MTUuNDMyWl8oMikuanBn.jpg",
      },
    ];
  }
  get Products() {
    return this.products;
  }
  getProduct(id: number) {
    return this.products.find((product) => product.id === id);
  }
}
