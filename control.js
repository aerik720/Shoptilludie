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
    }

    async loadCategories() {
        const categories = await this.model.fetchProductCategories();
        this.view.renderCategories(categories);
    }
}