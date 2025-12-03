// Admin Panel functionality for Pokemon Cards Store
// Handles product management (CRUD operations)

let currentEditingId = null;
let currentImageData = null;

// Initialize admin panel on page load
document.addEventListener('DOMContentLoaded', function() {
    loadProductsTable();
    updateStatistics();
    updateCartCount();
});

// Load products into table
function loadProductsTable() {
    const products = dataManager.getProducts();
    const tbody = document.getElementById('products-table-body');
    
    if (products.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 2rem;">No products found. Add your first product!</td></tr>';
        return;
    }
    
    tbody.innerHTML = '';
    
    products.forEach(product => {
        const row = createProductRow(product);
        tbody.appendChild(row);
    });
}

// Create table row for product
function createProductRow(product) {
    const row = document.createElement('tr');
    
    const stockClass = product.stock === 0 ? 'stock-out' : 
                       product.stock < 5 ? 'stock-low' : 'stock-good';
    
    const savings = product.marketPrice - product.price;
    const savingsPercent = ((savings / product.marketPrice) * 100).toFixed(0);
    const savingsBadge = savings > 0 ? 
        `<span style="color: var(--success-color); font-size: 0.85rem;">(${savingsPercent}% off)</span>` : '';
    
    row.innerHTML = `
        <td>
            <div class="product-image-cell">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/80?text=No+Image'">
            </div>
        </td>
        <td class="product-name-cell">${product.name}</td>
        <td class="price-cell">$${product.price.toFixed(2)} ${savingsBadge}</td>
        <td class="market-price-cell">$${product.marketPrice.toFixed(2)}</td>
        <td class="${stockClass}">${product.stock}</td>
        <td>
            <a href="${product.marketUrl}" target="_blank" class="market-link">
                ${product.marketSource} ↗
            </a>
        </td>
        <td>
            <div class="action-buttons">
                <button class="btn-edit" onclick="editProduct(${product.id})">Edit</button>
                <button class="btn-delete" onclick="deleteProduct(${product.id})">Delete</button>
            </div>
        </td>
    `;
    
    return row;
}

// Show add product form
function showAddProductForm() {
    currentEditingId = null;
    currentImageData = null;
    document.getElementById('form-title').textContent = 'Add New Product';
    document.getElementById('product-form-element').reset();
    document.getElementById('product-id').value = '';
    document.getElementById('image-preview').innerHTML = '';
    document.getElementById('image-preview').classList.add('empty');
    document.getElementById('product-form').style.display = 'block';
    document.getElementById('product-form').scrollIntoView({ behavior: 'smooth' });
}

// Edit product
function editProduct(productId) {
    const product = dataManager.getProductById(productId);
    if (!product) return;
    
    currentEditingId = productId;
    currentImageData = product.image;
    
    document.getElementById('form-title').textContent = 'Edit Product';
    document.getElementById('product-id').value = product.id;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-stock').value = product.stock;
    document.getElementById('product-market-price').value = product.marketPrice;
    document.getElementById('product-description').value = product.description;
    document.getElementById('product-market-url').value = product.marketUrl;
    document.getElementById('product-market-source').value = product.marketSource;
    document.getElementById('product-image-url').value = product.image.startsWith('http') ? product.image : '';
    
    // Show image preview
    const preview = document.getElementById('image-preview');
    preview.innerHTML = `<img src="${product.image}" alt="Preview">`;
    preview.classList.remove('empty');
    
    document.getElementById('product-form').style.display = 'block';
    document.getElementById('product-form').scrollIntoView({ behavior: 'smooth' });
}

// Delete product
function deleteProduct(productId) {
    const product = dataManager.getProductById(productId);
    if (!product) return;
    
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
        dataManager.deleteProduct(productId);
        showToast('Product deleted successfully', 'success');
        loadProductsTable();
        updateStatistics();
    }
}

// Save product (add or update)
function saveProduct(event) {
    event.preventDefault();
    
    const productData = {
        name: document.getElementById('product-name').value,
        price: parseFloat(document.getElementById('product-price').value),
        stock: parseInt(document.getElementById('product-stock').value),
        marketPrice: parseFloat(document.getElementById('product-market-price').value),
        description: document.getElementById('product-description').value,
        marketUrl: document.getElementById('product-market-url').value,
        marketSource: document.getElementById('product-market-source').value,
        image: currentImageData || document.getElementById('product-image-url').value || 'https://via.placeholder.com/300x420?text=No+Image'
    };
    
    // Validate market price
    if (productData.marketPrice < productData.price) {
        if (!confirm('Market price is lower than your price. This means your price is above market value. Continue anyway?')) {
            return;
        }
    }
    
    if (currentEditingId) {
        // Update existing product
        dataManager.updateProduct(currentEditingId, productData);
        showToast('Product updated successfully', 'success');
    } else {
        // Add new product
        dataManager.addProduct(productData);
        showToast('Product added successfully', 'success');
    }
    
    cancelForm();
    loadProductsTable();
    updateStatistics();
}

// Cancel form
function cancelForm() {
    document.getElementById('product-form').style.display = 'none';
    document.getElementById('product-form-element').reset();
    currentEditingId = null;
    currentImageData = null;
}

// Preview image from file upload
function previewImage(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
        showToast('Image size should be less than 2MB', 'error');
        event.target.value = '';
        return;
    }
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        currentImageData = e.target.result;
        const preview = document.getElementById('image-preview');
        preview.innerHTML = `<img src="${currentImageData}" alt="Preview">`;
        preview.classList.remove('empty');
        
        // Clear URL input if file is uploaded
        document.getElementById('product-image-url').value = '';
    };
    
    reader.readAsDataURL(file);
}

// Update statistics
function updateStatistics() {
    const products = dataManager.getProducts();
    
    // Total products
    document.getElementById('stat-total-products').textContent = products.length;
    
    // Total stock value
    const stockValue = products.reduce((total, product) => {
        return total + (product.price * product.stock);
    }, 0);
    document.getElementById('stat-stock-value').textContent = `$${stockValue.toFixed(2)}`;
    
    // Low stock items (less than 5)
    const lowStock = products.filter(p => p.stock > 0 && p.stock < 5).length;
    document.getElementById('stat-low-stock').textContent = lowStock;
    
    // Out of stock
    const outOfStock = products.filter(p => p.stock === 0).length;
    document.getElementById('stat-out-stock').textContent = outOfStock;
}

// Update cart count in header
function updateCartCount() {
    const count = dataManager.getCartItemCount();
    document.getElementById('cart-count').textContent = count;
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

// Listen for image URL input changes
document.addEventListener('DOMContentLoaded', function() {
    const imageUrlInput = document.getElementById('product-image-url');
    if (imageUrlInput) {
        imageUrlInput.addEventListener('input', function(e) {
            const url = e.target.value;
            if (url && url.startsWith('http')) {
                currentImageData = url;
                const preview = document.getElementById('image-preview');
                preview.innerHTML = `<img src="${url}" alt="Preview" onerror="this.parentElement.innerHTML='<p style=color:red>Invalid image URL</p>'">`;
                preview.classList.remove('empty');
                
                // Clear file input if URL is entered
                document.getElementById('product-image-file').value = '';
            }
        });
    }
});
