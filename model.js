export class model {
    constructor() { }
    // Hämta produktkategorier från API
    async fetchProductCategories() {
        try {
            const response = await fetch('https://fakestoreapi.com/products/categories');
            const data = await response.json();
            return data;
        }
        // Felhantering
        catch (error) {
            console.error('Error fetching product categories:', error);
            return [];
        }
    }
    // Hämta alla produkter från API
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
    // Hämta produkter baserat på kategori
    async fetchProductsByCategory(cat) {
        try {
            const response = await fetch(`https://fakestoreapi.com/products`);
            const data = await response.json();
            // Ny array för filtrerade produkter
            const filteredProducts = [];
            // Loopa genom alla produkter och filtrera efter vald kategori
            data.forEach(product => {
                if (product.category === cat) {
                    // https://www.w3schools.com/js/js_array_methods.asp
                    filteredProducts.push(product);
                }
            });
            // Returnera den filtrerade arrayen
            return filteredProducts;
        }
        catch (error) {
            console.error('Error fetching products by category:', error);
            return [];
        }
    }
    // Hämta produktdetaljer baserat på produkt-ID
    async fetchProductById(id) {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error('Error fetching product by ID:', error);
            return null;
        }
}
}