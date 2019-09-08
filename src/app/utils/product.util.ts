import { Product } from '../models/product.model';

export class ProductUtil {
    static save(products: Product[]) {
        localStorage.setItem('loja.product', JSON.stringify(products));
    }

    static get(): Product[] {
        const data = localStorage.getItem('loja.product');

        if (data)
            return JSON.parse(data);
        else
            return null;
    }

    static clear() {
        localStorage.removeItem('loja.product');
    }
}