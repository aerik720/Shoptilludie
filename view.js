export class view {
    constructor() {
        this.categoriescomponent = document.getElementById('categories');
        this.productscomponent = document.getElementById('products');
        this.productDetailsComponent = document.getElementById('productDetails');
        this.shoppingCartComponent = document.getElementById('shoppingCart');


    }

    renderCategories(categories) {
        this.categoriescomponent.setCategories(categories);
    }

    renderProducts(products) {
        this.productscomponent.setProducts(products);
    }
    showProductDetails(product) {
        this.productDetailsComponent.setProductDetails(product);
    }
    addToCart(cart) {
        this.shoppingCartComponent.setCartItems(cart);}
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
                    {
                        bubbles: true, composed: true, detail: { category }
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
                    <img src="${p.image}" class="card-img-top mt-2" alt="${p.title}">
                    <div class="card-body">
                        <h5 class="card-title">${p.title}</h5>   
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target = "productModal" data-id="${p.id}">Show more</button>
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
    setProductDetails(product) {
        this.shadowRoot.innerHTML = '';
        const htmlTemplate = document.createElement('template');
        htmlTemplate.innerHTML = `
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <div class="modal" id="productModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">

                
                <div class="modal-header">
                    <h5 class = "modal-title">${product.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                
                <div class="modal-body">
                    <img src="${product.image}" class="card-img-top mb-2" alt="${product.title}" style="max-width: 200px;">
                    
                    <p>${product.description}</p>
                  
                    <p><strong>Price:</strong> $${product.price}</p>
                </div>

                
                <div class="modal-footer">
                    <button type="button" data-id=${product.id} class="btn btn-success">Lägg i Varukorg</button>
                </div>

                </div>
            </div>
        </div>`;
        

        this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true));

        const buttons = this.shadowRoot.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.dataset.id;
                this.dispatchEvent(new CustomEvent('add-to-cart', {
                    bubbles: true,
                    composed: true,
                    detail: { productId }
                }));
            });
        });
        const modal = new bootstrap.Modal(this.shadowRoot.getElementById('productModal'));
        
        modal.show();
        

        

    }

}
customElements.define('product-details', productDetails);


export class ShoppingCart extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        this.cart = [];
        this.shadowRoot.innerHTML = '';
        const htmlTemplate = document.createElement('template');
        htmlTemplate.innerHTML = `
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <div class="container">
            <template id="cart-template">
            <h2>Shopping Cart</h2>
            <div id="cart-items">
                {{#each cart}}
                <div class="card mb-2">
                    <div class="card-body">
                        <h5 class="card-title">{{this.title}}</h5>
                        <p class="card-text">Price: {{this.price}}</p>
                        <p class="card-text">Quantity: {{this.quantity}}</p>
                    </div>
            </template>
                </div>
                {{/each}}
        `;
        
        

        this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true));
        
    }
    loadHandlebars(){
    if (!window.Handlebars) {
                    const handlebarsScript = document.createElement('script');
                    handlebarsScript.src = 'https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.min.js';
                    document.head.appendChild(handlebarsScript);
                }
    }
    setCartItems(cartItems) {
        if (!window.Handlebars) {
            console.error('Handlebars is not loaded.');
            const handlebarsScript = document.createElement('script');
            handlebarsScript.src = 'https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.min.js';
            document.head.appendChild(handlebarsScript);
        }

        const source = this.shadowRoot.querySelector('cart-template').innerHTML;
        const template = Handlebars.compile(source);
        const html = template({ cart: cartItems });

        const cartItemsContainer = this.shadowRoot.querySelector('cart-items');
        cartItemsContainer.innerHTML = html;

    }
   

}
customElements.define('shopping-cart', ShoppingCart);
