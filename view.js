export class view {
    constructor() {
        // Refererar till våra custom elements
        this.categoriescomponent = document.getElementById('categories');
        this.productscomponent = document.getElementById('products');
        this.productDetailsComponent = document.getElementById('productDetails');
        this.shoppingCartComponent = document.getElementById('shoppingCart');


    }
    // Skickas till vårat custom element för rendering av kategorier
    renderCategories(categories) {
        this.categoriescomponent.setCategories(categories);
    }
    // Skickas till vårat custom element för rendering av produkterna i vald kategori
    renderProducts(products) {
        this.productscomponent.setProducts(products);
    }
    // Skickas till vårat custom element för rendering av produktdetaljer
    showProductDetails(product) {
        this.productDetailsComponent.setProductDetails(product);
    }
    // Skickas till vårat custom element för rendering av varukorgen
    addToCart(cart) {
        this.shoppingCartComponent.setCartItems(cart);
    }
}
// Vi gör våra custom elements här
export class Categories extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    // Rendering av kategorier
    setCategories(categories) {
        // Rensa allt innehåll
        this.shadowRoot.innerHTML = '';
        // Skapa html template
        const htmlTemplate = document.createElement('template');
        htmlTemplate.innerHTML = `
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

            <div class="container">
                <h2 class="text-center">Product Categories</h2>
                <div class="row justify-content-center d-flex">
                <!-- Använd map för att skapa en kort för varje kategori -->
                    ${categories.map(c => `<div class= "card col-md-2 m-2">
                        <h5 class="text-center">${c}</h5>
                        <button class="btn btn-primary d-block mb-2" data-id="${c}">Show products</button>
                        </div>`).join('')}
                </div>
            </div>
        `;
        // Lägg till templaten i shadow DOM
        this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true));
        // Lägg till event listeners på knapparna
        const buttons = this.shadowRoot.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // Hämta kategori från data-id
                const category = button.dataset.id;
                // Skicka custom event med vald kategori
                this.dispatchEvent(new CustomEvent('show-products',
                    {
                        bubbles: true, composed: true, detail: { category }
                    }));
            });
        });
    }
}
// Registrera custom element
customElements.define('categories-component', Categories);

// Custom element för att visa produkter
export class Products extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    // Rendering av produkter
    setProducts(products) {
        this.shadowRoot.innerHTML = '';
        const htmlTemplate = document.createElement('template');
        htmlTemplate.innerHTML = `
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <div class="container">
            <h2 class="text-center">Products</h2>
            <div class="row justify-content-center d-flex">
                ${products.map(p => `<div class="card col-md-2 m-2">
                    <!-- Visa produktbild, titel, pris för varje produkt -->
                    <img src="${p.image}" class="card-img-top mt-2" alt="${p.title}">
                    <div class="card-body">
                        <h5 class="card-title">${p.title}</h5> 
                        <p class="card-text">Price: $${p.price}</p>
                        <!-- Knappar för att visa mer info och öppna modal för rätt produkt -->
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target = "productModal" data-id="${p.id}">Show more</button>
                    </div>
                </div>`).join('')}
            </div>
        </div>
        `;
        this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true));
        // Lägg till event listeners på knapparna för att öppna modalen
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

// Custom element för att visa produktdetaljer i våran modal
export class productDetails extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    setProductDetails(product) {
        this.shadowRoot.innerHTML = '';
        const htmlTemplate = document.createElement('template');
        // Mall till modalen från w3schools
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
        // Lägg till event listener på knappen för att lägga till produkten i varukorgen
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
        // Skapar och visar modalen
        const modal = new bootstrap.Modal(this.shadowRoot.getElementById('productModal'));
        modal.show();
    }

}
customElements.define('product-details', productDetails);

// Custom element för att visa varukorgen
export class ShoppingCart extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = '';
        const htmlTemplate = document.createElement('template');
        // Här använder vi Handlebars för att visa varukorgens innehåll
        htmlTemplate.innerHTML = `
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <div class="container">
        <div class="p-3">
            <h2 class="text-center">Shopping Cart</h2>
            <div id="cart-items"></div>
        </div>
            <template id="cart-template">
            <!-- Each loop för att visa varje produkt i varukorgen -->
                {{#each cart}}
                <div class="card mb-2">
                    <div class="card-body">
                        <h5 class="card-title">{{this.title}}</h5>
                        <p class="card-text">Price: $ {{this.price}}</p>
                        <p class="card-text">Quantity: {{this.quantity}}</p>
                    </div>
                    <span class="actions">
                        <button class="btn btn-primary mb-2 ms-3 btn-increase" size="small" data-index="{{@index}}">+</button>
                        <button class="btn btn-danger mb-2 btn-decrease" size="small" data-index="{{@index}}">-</button>
                        <button class="btn btn-warning mb-2 btn-remove" size="small" data-index="{{@index}}">Remove All</button>
                    </span>
                </div>
                
                {{/each}}
                <p><strong>Total: $ <span id="cart-total">{{this.total}}</span></strong></p>
                </template>
        </div>
        `;
        this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true));

    }
    // Rendering av varukorgens innehåll
    setCartItems(cartItems) {
        // Om Handlebars inte är laddat, ladda det
        if (!window.Handlebars) {
            console.error('Handlebars is not loaded.');
            const handlebarsScript = document.createElement('script');
            // Länk till Handlebars
            handlebarsScript.src = 'https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.min.js';
            // Lägg till script
            document.head.appendChild(handlebarsScript);
        }
        // Beräkna totalpris
        let total = 0;
        // Pris gånger antal för varje produkt
        cartItems.forEach(item => {
            total += item.price * item.quantity;
        });

        // Källa till templaten
        const source = this.shadowRoot.querySelector('#cart-template').innerHTML;
        // Kompilera templaten med Handlebars
        const template = Handlebars.compile(source);
        // Generera html med cartItems och totalpris
        const html = template({ cart: cartItems, total });

        // Sätt html i våran varukorgscontainer
        const cartItemsContainer = this.shadowRoot.querySelector('#cart-items');
        cartItemsContainer.innerHTML = html;

        // Lägg till event listeners på knapparna för att öka antal
        cartItemsContainer.querySelectorAll('button.btn-increase').forEach(button => {
            button.addEventListener('click', () => {
                const index = button.dataset.index;
                cartItems[index].quantity += 1;
                this.setCartItems(cartItems);
            });
        });

        // Lägg till event listeners på knapparna för att ta bort alla av en produkt
        cartItemsContainer.querySelectorAll('button.btn-remove').forEach(button => {
            button.addEventListener('click', () => {
                const index = button.dataset.index;
                cartItems.splice(index, 1);
                this.setCartItems(cartItems);
            });
        });

        // Lägg till event listeners på knapparna för att minska antalet av en produkt
        cartItemsContainer.querySelectorAll('button.btn-decrease').forEach(button => {
            button.addEventListener('click', () => {
                const index = button.dataset.index;
                if (cartItems[index].quantity > 1) {
                    cartItems[index].quantity -= 1;
                } else {
                    cartItems.splice(index, 1);
                }
                this.setCartItems(cartItems);
            });
        });
    }
    }

customElements.define('shopping-cart', ShoppingCart);
