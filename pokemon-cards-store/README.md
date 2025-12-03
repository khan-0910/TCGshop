# Pokemon Cards Ecommerce Store

A dynamic, user-friendly ecommerce website for Pokemon trading cards with comprehensive product management, shopping cart functionality, and market price integration.

## Features

### Customer Features
- **Browse Products**: View all available Pokemon cards in a responsive grid layout
- **Product Details**: Click on any card to see detailed information including:
  - High-quality product images
  - Store price vs. market price comparison
  - Stock availability
  - Direct links to view cards on external marketplaces (TCGPlayer, etc.)
  - Savings percentage display
- **Search & Filter**: Search products by name/description and sort by various criteria
- **Shopping Cart**: 
  - Add products to cart with quantity selection
  - Update quantities or remove items
  - Real-time stock validation
  - View order summary with tax calculation
- **Checkout**: Simple checkout process with automatic stock updates

### Admin Features
- **Product Management**:
  - Add new Pokemon cards with all details
  - Edit existing products (price, stock, images, market info)
  - Delete products
  - Upload product images (file upload or URL)
  - Set market prices and external marketplace links
- **Inventory Tracking**:
  - View all products in a comprehensive table
  - Monitor stock levels with color-coded indicators
  - Track low stock and out-of-stock items
- **Statistics Dashboard**:
  - Total products count
  - Total stock value
  - Low stock alerts
  - Out of stock count

### Market Price Integration
- Display real-time market prices from external sources
- Show price comparison (store price vs. market price)
- Calculate and display savings percentage
- Direct links to view products on external marketplaces (TCGPlayer, eBay, etc.)
- Visual indicators for competitive pricing

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Data Storage**: localStorage (browser-based)
- **Styling**: Custom CSS with responsive design
- **No Backend Required**: Fully client-side application

## File Structure

```
pokemon-cards-store/
├── index.html              # Main store page
├── cart.html               # Shopping cart page
├── admin.html              # Admin panel
├── css/
│   ├── style.css          # Main styles
│   └── admin.css          # Admin panel styles
├── js/
│   ├── data.js            # Data management & localStorage
│   ├── store.js           # Store functionality
│   ├── cart.js            # Cart management
│   └── admin.js           # Admin panel functionality
├── images/                 # Product images directory
└── README.md              # This file
```

## Getting Started

### Installation

1. Download or clone the project to your computer
2. No installation required - it's a static website!

### Running the Application

Simply open `index.html` in any modern web browser:
- Double-click `index.html`, or
- Right-click and select "Open with" your preferred browser

### Initial Setup

The application comes pre-loaded with 8 sample Pokemon cards including:
- Charizard VMAX
- Pikachu VMAX
- Mewtwo & Mew GX
- Umbreon VMAX
- Rayquaza VMAX
- Lugia V
- Booster Box - Scarlet & Violet
- Mew ex

## Usage Guide

### For Customers

1. **Browse Products**: 
   - Visit the main store page (index.html)
   - Use the search bar to find specific cards
   - Sort products by name, price, or stock

2. **View Product Details**:
   - Click "View Details" on any card
   - See full product information and market price comparison
   - Click "View on [Market Source]" to see the card on external sites

3. **Add to Cart**:
   - Click "Add to Cart" from the product card, or
   - Use the modal to select quantity before adding

4. **Checkout**:
   - Navigate to the cart page
   - Review your items and adjust quantities
   - Click "Proceed to Checkout"
   - Enter your name and email
   - Stock is automatically updated after purchase

### For Administrators

1. **Access Admin Panel**:
   - Click "Admin" in the navigation menu
   - Navigate to admin.html

2. **Add New Product**:
   - Click "+ Add New Product"
   - Fill in all required fields:
     - Product name
     - Price
     - Stock quantity
     - Market price
     - Description
     - Market URL (link to TCGPlayer, eBay, etc.)
     - Market source name
     - Product image (upload file or enter URL)
   - Click "Save Product"

3. **Edit Product**:
   - Click "Edit" button on any product in the table
   - Modify the desired fields
   - Click "Save Product"

4. **Delete Product**:
   - Click "Delete" button on any product
   - Confirm the deletion

5. **Monitor Inventory**:
   - View statistics dashboard for quick insights
   - Check color-coded stock levels in the table:
     - Green: Good stock (5+)
     - Orange: Low stock (1-4)
     - Red: Out of stock (0)

## Features in Detail

### Automatic Stock Management
- Stock levels are validated before adding to cart
- Stock automatically decreases when orders are placed
- Out-of-stock items cannot be added to cart
- Real-time stock updates across all pages

### Market Price Integration
- Each product can have a market price and external link
- Automatic calculation of savings percentage
- Visual badges showing discounts
- Direct links to view products on external marketplaces
- Supports multiple market sources (TCGPlayer, eBay, etc.)

### Data Persistence
- All data is stored in browser's localStorage
- Products, cart, and orders persist between sessions
- Data remains until browser cache is cleared

### Responsive Design
- Fully responsive layout works on desktop, tablet, and mobile
- Touch-friendly interface
- Optimized for all screen sizes

## Browser Compatibility

Works on all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## Customization

### Adding Your Own Products
1. Go to the Admin panel
2. Click "+ Add New Product"
3. Enter product details and image
4. Add market price information and external link

### Changing Styles
- Edit `css/style.css` for main store styles
- Edit `css/admin.css` for admin panel styles
- Modify CSS variables in `:root` for color scheme

### Sample Data
- Sample products are defined in `js/data.js`
- Modify the `sampleProducts` array to change initial data

## Data Storage

All data is stored in browser localStorage:
- **products**: Array of all products
- **cart**: Current shopping cart items
- **orders**: Order history

To reset all data:
1. Open browser console (F12)
2. Run: `localStorage.clear()`
3. Refresh the page

## Limitations

- Client-side only (no server/database)
- Data is browser-specific (not synced across devices)
- No real payment processing
- Image uploads are converted to base64 (limited size)
- No user authentication (admin panel is publicly accessible)

## Future Enhancements

Potential features for future versions:
- User authentication and accounts
- Real payment gateway integration
- Backend database for data persistence
- Order tracking and history
- Email notifications
- Product reviews and ratings
- Wishlist functionality
- Advanced search and filtering
- Multi-currency support
- Real-time market price API integration

## Support

For issues or questions:
1. Check the browser console for errors (F12)
2. Ensure JavaScript is enabled
3. Try clearing browser cache and localStorage
4. Use a modern, updated browser

## License

This project is open source and available for personal and commercial use.

## Credits

- Pokemon card images from Pokemon TCG API
- Market price data from TCGPlayer and other sources
- Built with vanilla JavaScript, HTML, and CSS

---

**Enjoy managing your Pokemon card store!** ⚡🎴
