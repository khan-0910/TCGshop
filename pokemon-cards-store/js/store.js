// Store functionality for Pokemon Cards Store
// Handles product display, search, filtering, and add to cart

let allProducts = [];
let filteredProducts = [];

// Initialize store on page load
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartCount();
    setupEventListeners();
});

// Load and display products
function loadProducts() {
    allProducts = dataManager.getProducts();
    filteredProducts = [...allProducts];
    displayProducts(filteredProducts);
}

// Display products in grid
function displayProducts(products) {
    const grid = document.getElementById('products-grid');
    const noProducts = document.getElementById('no-products');
    
    if (products.length === 0) {
        grid.style.display = 'none';
        noProducts.style.display = 'block';
        return;
    }
    
    grid.style.display = 'grid';
    noProducts.style.display = 'none';
    grid.innerHTML = '';
    
    products.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const stockStatus = product.stock > 0 ? 'in-stock' : 'out-of-stock';
    const stockText = product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock';
    
    // Calculate savings
    const savings = product.marketPrice - product.price;
    const savingsPercent = ((savings / product.marketPrice) * 100).toFixed(0);
    
    card.innerHTML = `
        <div class="product-image" onclick="viewProduct(${product.id})" style="cursor: pointer;">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x420?text=No+Image'">
            ${savings > 0 ? `<div class="savings-badge">Save ${savingsPercent}%</div>` : ''}
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="price-container">
                <div class="price-row">
                    <span class="price-label">Our Price:</span>
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                </div>
                <div class="price-row market">
                    <span class="price-label">Market:</span>
                    <span class="market-price">$${product.marketPrice.toFixed(2)}</span>
                </div>
            </div>
            <div class="stock-status ${stockStatus}">
                <span>${stockText}</span>
            </div>
            <div class="card-actions">
                <button class="btn-add-cart" onclick="quickAddToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
                    Add to Cart
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// View product details in modal
function viewProduct(productId) {
    const product = dataManager.getProductById(productId);
    if (!product) return;
    
    const modal = document.getElementById('product-modal');
    document.getElementById('modal-img').src = product.image;
    document.getElementById('modal-name').textContent = product.name;
    document.getElementById('modal-description').textContent = product.description;
    document.getElementById('modal-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('modal-market-price').textContent = `$${product.marketPrice.toFixed(2)}`;
    
    // Calculate and display savings
    const savings = product.marketPrice - product.price;
    const savingsPercent = ((savings / product.marketPrice) * 100).toFixed(0);
    const savingsElement = document.getElementById('modal-savings');
    
    if (savings > 0) {
        savingsElement.textContent = `(Save $${savings.toFixed(2)} - ${savingsPercent}% off!)`;
        savingsElement.style.color = '#27ae60';
    } else if (savings < 0) {
        savingsElement.textContent = `(${Math.abs(savingsPercent)}% above market)`;
        savingsElement.style.color = '#e74c3c';
    } else {
        savingsElement.textContent = '(At market price)';
        savingsElement.style.color = '#95a5a6';
    }
    
    // Stock info
    const stockElement = document.getElementById('modal-stock');
    if (product.stock > 0) {
        stockElement.textContent = `${product.stock} available`;
        stockElement.className = 'stock-available';
        document.getElementById('modal-quantity').max = product.stock;
        document.getElementById('modal-add-to-cart').disabled = false;
    } else {
        stockElement.textContent = 'Out of Stock';
        stockElement.className = 'stock-unavailable';
        document.getElementById('modal-add-to-cart').disabled = true;
    }
    
    // Market link
    document.getElementById('modal-market-link').href = product.marketUrl;
    document.getElementById('modal-market-source').textContent = product.marketSource;
    
    // Reset quantity
    document.getElementById('modal-quantity').value = 1;
    
    // Store product ID for add to cart
    modal.dataset.productId = product.id;
    
    modal.style.display = 'block';
}

// Quick add to cart from product card
function quickAddToCart(productId) {
    const result = dataManager.addToCart(productId, 1);
    
    if (result.success) {
        showToast('Added to cart!', 'success');
        updateCartCount();
        loadProducts(); // Refresh to update stock display
    } else {
        showToast(result.message, 'error');
    }
}

// Add to cart from modal
function addToCartFromModal() {
    const modal = document.getElementById('product-modal');
    const productId = parseInt(modal.dataset.productId);
    const quantity = parseInt(document.getElementById('modal-quantity').value);
    
    const result = dataManager.addToCart(productId, quantity);
    
    if (result.success) {
        showToast(`Added ${quantity} item(s) to cart!`, 'success');
        updateCartCount();
        loadProducts(); // Refresh to update stock display
        modal.style.display = 'none';
    } else {
        showToast(result.message, 'error');
    }
}

// Update cart count in header
function updateCartCount() {
    const count = dataManager.getCartItemCount();
    document.getElementById('cart-count').textContent = count;
}

// Search products
function searchProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    filteredProducts = allProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    
    sortProducts();
}

// Sort products
function sortProducts() {
    const sortValue = document.getElementById('sort-select').value;
    
    switch(sortValue) {
        case 'name-asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'stock-desc':
            filteredProducts.sort((a, b) => b.stock - a.stock);
            break;
    }
    
    displayProducts(filteredProducts);
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.className = 'toast';
    }, 3000);
}

// Setup event listeners
function setupEventListeners() {
    // Search
    document.getElementById('search-btn').addEventListener('click', searchProducts);
    document.getElementById('search-input').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });
    
    // Sort
    document.getElementById('sort-select').addEventListener('change', sortProducts);
    
    // Modal
    const modal = document.getElementById('product-modal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    document.getElementById('modal-add-to-cart').addEventListener('click', addToCartFromModal);
}
