export class view {
    constructor() {

    }
}

export class Categories extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
}

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

export class Products extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
}