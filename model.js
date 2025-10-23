export class model {
    constructor() { }

    async fetchProductCategories() {
        try {
            const response = await fetch('https://fakestoreapi.com/products/categories');
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error('Error fetching product categories:', error);
            return [];
        }
    }

    async fetchProducts() {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    }
}