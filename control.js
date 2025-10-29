export class control {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.initCustomEventListeners();
        this.loadCategories();
    }

    initCustomEventListeners() {
        document.addEventListener('show-products', async (event) => {
        const category = event.detail.category;
        console.log('Category selected:', category);
        const products = await this.model.fetchProductsByCategory(category);
        this.view.renderProducts(products);
        });

        document.addEventListener('view-product', async (event) => {
        const productModal = event.detail.productId;
        console.log('View product ID:', productModal);
        const productDetails = await this.model.fetchProductById(productModal);
        this.view.showProductDetails(productDetails);
        });    
        document.addEventListener('add-to-cart', async (event) => {
            const producttocart = event.detail.productId;
            console.log('Add to cart product ID:', producttocart);
            const productDetails = await this.model.fetchProductById(producttocart);
            this.view.addToCart(productDetails);
        });

}

    async loadCategories() {
        const categories = await this.model.fetchProductCategories();
        this.view.renderCategories(categories);
    }

}