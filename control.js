export class control {
    constructor(model, view) {
        // Ger tillgång till model och view
        this.model = model;
        this.view = view;
        // Array för kundvagnen
        this.cart = [];
        // Kör custom eventlyssnare
        this.initCustomEventListeners();
        // Ladda produktkategorier vid start
        this.loadCategories();
    }

    initCustomEventListeners() {
        // Lyssnar efter show-products
        document.addEventListener('show-products', async (event) => {
        // Vald kategori från eventdetaljer
        const category = event.detail.category;
        // Felsökning i konsolen
        console.log('Category selected:', category);
        // Hämta produkter från modellen baserat på vald kategori
        const products = await this.model.fetchProductsByCategory(category);
        // Skicka produkterna till vyn för rendering
        this.view.renderProducts(products);
        });

        // Lyssnar efter view-product
        document.addEventListener('view-product', async (event) => {
        // Vald produkt från eventdetaljer
        const productModal = event.detail.productId;
        console.log('View product ID:', productModal);
        const productDetails = await this.model.fetchProductById(productModal);
        this.view.showProductDetails(productDetails);
        });

        // Lyssnar efter add-to-cart
        document.addEventListener('add-to-cart', async (event) => {
            const producttocart = event.detail.productId;
            console.log('Add to cart product ID:', producttocart);
            // Hämta produktdetaljer från modellen
            const productDetails = await this.model.fetchProductById(producttocart);
            // Kollar om produkten redan finns i kundvagnen
            const existingItem = this.cart.find(item => item.id === productDetails.id);
            // Om den finns ökar vi antalet, annars lägger vi till den i kundvagnen
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                productDetails.quantity = 1;
                this.cart.push(productDetails);
            }
            // Skickar uppdaterad kundvagn till vyn
            this.view.addToCart(this.cart);
        });

}
    // Laddar kategorierna vid start
    async loadCategories() {
        // Hämtar alla kategorier från modellen
        const categories = await this.model.fetchProductCategories();
        // Skickar kategorierna till vyn
        this.view.renderCategories(categories);
    }
}