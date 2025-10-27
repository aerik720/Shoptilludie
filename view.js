export class view {
    constructor() {
        this.categoriescomponent = document.getElementById('categories');
        this.productscomponent = document.getElementById('products');

        
    }

    renderCategories(categories) {
        this.categoriescomponent.setCategories(categories);
    }

    renderProducts(products) {
        this.productscomponent.setProducts(products);
    }
}

export class Categories extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    
    setCategories(categories) {
        this.shadowRoot.innerHTML = '';
        const htmlTemplate = document.createElement('template');
        htmlTemplate.innerHTML = `
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

            <div class="container">
                <h2>Product Categories</h2>
                <div class="row justify-content-center d-flex">
                    ${categories.map(c => `<div class= "card col-md-2 m-2">
                        <h5 class="text-center">${c}</h5>
                        <button class="btn btn-primary d-block mb-2" data-id="${c}">Show products</button>
                        </div>`).join('')}
                </div>
            </div>
        `;
        this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true));

        const buttons = this.shadowRoot.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.id;
                this.dispatchEvent(new CustomEvent('show-products', 
                    { bubbles: true, composed: true, detail: { category } 
                    }));
            });
        });
    }
}
customElements.define('categories-component', Categories);

export class Products extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    setProducts(products) {
        this.shadowRoot.innerHTML = '';
        const htmlTemplate = document.createElement('template');
        htmlTemplate.innerHTML = `
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <div class="container">
            <h2>Products</h2>
            <div class="row justify-content-center d-flex">
                ${products.map(p => `<div class="card col-md-2 m-2">
                    <img src="${p.image}" class="card-img-top" alt="${p.title}">
                    <div class="card-body">
                        <h5 class="card-title">${p.title}</h5>
                        <button class="btn btn-primary" data-id="${p.id}">Show more</button>
                    </div>
                </div>`).join('')}
            </div>
        </div>
        `;
        this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true));

        const buttons = this.shadowRoot.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.dataset.id;
                this.dispatchEvent(new CustomEvent('view-product', {
                    bubbles: true,
                    composed: true,
                    detail: { productId }
                }));
            });
        });
    }
}
customElements.define('products-component', Products);

export class productDetails extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
}

export class ShoppingCart extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.cart = [];
    }
}



