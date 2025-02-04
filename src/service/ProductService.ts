import axios from "axios";
import { Product } from "../types";

export class ProductService {
  private static _instance: ProductService;
  private products: Product[] | undefined = undefined;

  private constructor() {
    this.loadProducts();
  }
  public static instance() {
    if (!this._instance) this._instance = new ProductService();
    return this._instance;
  }

  async loadProducts() {
    this.products = (await axios.get('https://x8ki-letl-twmt.n7.xano.io/api:RBbVK1Ck/game')).data;
  }
  get Products() {
    return this.products;
  }
  async getProduct(index: number) {
    if(!this.products)
      await this.loadProducts();
    console.log(index);
    console.log(this.products)
    return this.products?.[index];
  }
}
