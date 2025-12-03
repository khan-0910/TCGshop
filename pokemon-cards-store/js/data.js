// Data Management for Pokemon Cards Store
// Handles localStorage operations for products, cart, and orders

class DataManager {
    constructor() {
        this.initializeData();
    }

    // Initialize with sample Pokemon cards if no data exists
    initializeData() {
        if (!localStorage.getItem('products')) {
            const sampleProducts = [
                {
                    id: 1,
                    name: "Charizard VMAX",
                    price: 299.99,
                    stock: 5,
                    description: "Rainbow Rare Charizard VMAX from Champion's Path",
                    image: "https://images.pokemontcg.io/swsh35/74_hires.png",
                    marketPrice: 349.99,
                    marketUrl: "https://www.tcgplayer.com/product/223194",
                    marketSource: "TCGPlayer"
                },
                {
                    id: 2,
                    name: "Pikachu VMAX",
                    price: 89.99,
                    stock: 12,
                    description: "Vivid Voltage Rainbow Rare Pikachu VMAX",
                    image: "https://images.pokemontcg.io/swsh4/188_hires.png",
                    marketPrice: 95.99,
                    marketUrl: "https://www.tcgplayer.com/product/226524",
                    marketSource: "TCGPlayer"
                },
                {
                    id: 3,
                    name: "Mewtwo & Mew GX",
                    price: 45.99,
                    stock: 8,
                    description: "Unified Minds Secret Rare",
                    image: "https://images.pokemontcg.io/sm11/222_hires.png",
                    marketPrice: 52.99,
                    marketUrl: "https://www.tcgplayer.com/product/192290",
                    marketSource: "TCGPlayer"
                },
                {
                    id: 4,
                    name: "Umbreon VMAX",
                    price: 179.99,
                    stock: 3,
                    description: "Evolving Skies Alternate Art",
                    image: "https://images.pokemontcg.io/swsh7/215_hires.png",
                    marketPrice: 199.99,
                    marketUrl: "https://www.tcgplayer.com/product/246526",
                    marketSource: "TCGPlayer"
                },
                {
                    id: 5,
                    name: "Rayquaza VMAX",
                    price: 129.99,
                    stock: 6,
                    description: "Evolving Skies Alternate Art",
                    image: "https://images.pokemontcg.io/swsh7/218_hires.png",
                    marketPrice: 145.99,
                    marketUrl: "https://www.tcgplayer.com/product/246529",
                    marketSource: "TCGPlayer"
                },
                {
                    id: 6,
                    name: "Lugia V",
                    price: 34.99,
                    stock: 15,
                    description: "Silver Tempest Full Art",
                    image: "https://images.pokemontcg.io/swsh12/186_hires.png",
                    marketPrice: 39.99,
                    marketUrl: "https://www.tcgplayer.com/product/296891",
                    marketSource: "TCGPlayer"
                },
                {
                    id: 7,
                    name: "Booster Box - Scarlet & Violet",
                    price: 119.99,
                    stock: 10,
                    description: "Sealed Booster Box - 36 Packs",
                    image: "https://images.pokemontcg.io/sv1/logo.png",
                    marketPrice: 129.99,
                    marketUrl: "https://www.tcgplayer.com/product/302156",
                    marketSource: "TCGPlayer"
                },
                {
                    id: 8,
                    name: "Mew ex",
                    price: 24.99,
                    stock: 20,
                    description: "151 Special Illustration Rare",
                    image: "https://images.pokemontcg.io/sv3pt5/151_hires.png",
                    marketPrice: 27.99,
                    marketUrl: "https://www.tcgplayer.com/product/312456",
                    marketSource: "TCGPlayer"
                }
            ];
            this.saveProducts(sampleProducts);
        }

        if (!localStorage.getItem('cart')) {
            localStorage.setItem('cart', JSON.stringify([]));
        }

        if (!localStorage.getItem('orders')) {
            localStorage.setItem('orders', JSON.stringify([]));
        }
    }

    // Product operations
    getProducts() {
        return JSON.parse(localStorage.getItem('products')) || [];
    }

    saveProducts(products) {
        localStorage.setItem('products', JSON.stringify(products));
    }

    getProductById(id) {
        const products = this.getProducts();
        return products.find(p => p.id === parseInt(id));
    }

    addProduct(product) {
        const products = this.getProducts();
        product.id = Date.now(); // Generate unique ID
        products.push(product);
        this.saveProducts(products);
        return product;
    }

    updateProduct(id, updatedProduct) {
        const products = this.getProducts();
        const index = products.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedProduct };
            this.saveProducts(products);
            return products[index];
        }
        return null;
    }

    deleteProduct(id) {
        let products = this.getProducts();
        products = products.filter(p => p.id !== parseInt(id));
        this.saveProducts(products);
    }

    updateStock(id, quantity) {
        const products = this.getProducts();
        const product = products.find(p => p.id === parseInt(id));
        if (product) {
            product.stock -= quantity;
            this.saveProducts(products);
            return true;
        }
        return false;
    }

    // Cart operations
    getCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    addToCart(productId, quantity = 1) {
        const cart = this.getCart();
        const product = this.getProductById(productId);
        
        if (!product || product.stock < quantity) {
            return { success: false, message: 'Insufficient stock' };
        }

        const existingItem = cart.find(item => item.productId === productId);
        
        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;
            if (newQuantity > product.stock) {
                return { success: false, message: 'Insufficient stock' };
            }
            existingItem.quantity = newQuantity;
        } else {
            cart.push({ productId, quantity });
        }

        this.saveCart(cart);
        return { success: true, message: 'Added to cart' };
    }

    removeFromCart(productId) {
        let cart = this.getCart();
        cart = cart.filter(item => item.productId !== productId);
        this.saveCart(cart);
    }

    updateCartQuantity(productId, quantity) {
        const cart = this.getCart();
        const product = this.getProductById(productId);
        
        if (!product || quantity > product.stock) {
            return { success: false, message: 'Insufficient stock' };
        }

        const item = cart.find(item => item.productId === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.saveCart(cart);
            }
            return { success: true };
        }
        return { success: false, message: 'Item not in cart' };
    }

    clearCart() {
        localStorage.setItem('cart', JSON.stringify([]));
    }

    getCartTotal() {
        const cart = this.getCart();
        let total = 0;
        cart.forEach(item => {
            const product = this.getProductById(item.productId);
            if (product) {
                total += product.price * item.quantity;
            }
        });
        return total;
    }

    getCartItemCount() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + item.quantity, 0);
    }

    // Order operations
    createOrder(customerInfo) {
        const cart = this.getCart();
        if (cart.length === 0) {
            return { success: false, message: 'Cart is empty' };
        }

        // Check stock availability
        for (let item of cart) {
            const product = this.getProductById(item.productId);
            if (!product || product.stock < item.quantity) {
                return { success: false, message: `Insufficient stock for ${product ? product.name : 'product'}` };
            }
        }

        // Create order
        const order = {
            id: Date.now(),
            date: new Date().toISOString(),
            customer: customerInfo,
            items: cart.map(item => {
                const product = this.getProductById(item.productId);
                return {
                    productId: item.productId,
                    name: product.name,
                    price: product.price,
                    quantity: item.quantity
                };
            }),
            total: this.getCartTotal()
        };

        // Update stock
        cart.forEach(item => {
            this.updateStock(item.productId, item.quantity);
        });

        // Save order
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Clear cart
        this.clearCart();

        return { success: true, order };
    }

    getOrders() {
        return JSON.parse(localStorage.getItem('orders')) || [];
    }
}

// Export for use in other files
const dataManager = new DataManager();
