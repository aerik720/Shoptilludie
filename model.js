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

    async fetchAllProducts() {
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

    async fetchProductsByCategory(cat) {
        try {
            const response = await fetch(`https://fakestoreapi.com/products`);
            const data = await response.json();
            const filteredProducts = [];
            data.forEach(product => {
                if (product.category === cat) {
                    // https://www.w3schools.com/js/js_array_methods.asp
                    filteredProducts.push(product);
                }
            });
            return filteredProducts;
        }
        catch (error) {
            console.error('Error fetching products by category:', error);
            return [];
        }
    }
}