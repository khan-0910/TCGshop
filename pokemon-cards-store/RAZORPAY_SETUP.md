# Razorpay Payment Gateway Setup Guide

## 🎉 Razorpay Integration Complete!

Your Pokemon Cards Store now supports **UPI and Card payments** through Razorpay!

---

## 🔧 Current Configuration

**Mode:** Test Mode (Demo)  
**Test Key ID:** `rzp_test_1DP5mmOlF5G5ag`  
**Currency:** INR (Indian Rupees)  
**Conversion Rate:** 1 USD = 83 INR

---

## 💳 Supported Payment Methods

✅ **UPI** (Google Pay, PhonePe, Paytm, etc.)  
✅ **Credit/Debit Cards** (Visa, Mastercard, RuPay, Amex)  
✅ **Net Banking**  
✅ **Wallets** (Paytm, Mobikwik, etc.)

---

## 🧪 Testing in Test Mode

### Test Cards for Testing Payments:

**Successful Payment:**
- Card Number: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date
- Name: Any name

**Failed Payment:**
- Card Number: `4000 0000 0000 0002`
- CVV: Any 3 digits
- Expiry: Any future date

### Test UPI IDs:
- **Success:** `success@razorpay`
- **Failure:** `failure@razorpay`

### How to Test:
1. Add items to cart
2. Click "Proceed to Checkout"
3. Enter your details (name, email, phone)
4. Razorpay payment modal will open
5. Use test credentials above
6. Complete the payment

---

## 🚀 Switching to Live Mode (Real Payments)

### Step 1: Get Razorpay Account
1. Sign up at: https://dashboard.razorpay.com/signup
2. Complete KYC verification
3. Get your business approved

### Step 2: Get API Keys
1. Login to Razorpay Dashboard
2. Go to: **Settings → API Keys**
3. Generate Live Mode keys
4. Copy your **Key ID** (starts with `rzp_live_`)

### Step 3: Update Configuration
Open `js/razorpay-config.js` and update:

```javascript
// Replace this:
live: {
    keyId: 'YOUR_LIVE_KEY_ID',
    keySecret: 'YOUR_LIVE_KEY_SECRET'
},

// With your actual key:
live: {
    keyId: 'rzp_live_XXXXXXXXXX', // Your actual live key
    keySecret: 'YOUR_LIVE_KEY_SECRET'
},

// Change mode from 'test' to 'live':
mode: 'live',
```

### Step 4: Test Live Payments
1. Save the file
2. Refresh your website
3. Make a small test purchase with real payment
4. Verify payment in Razorpay Dashboard

---

## 📊 Payment Flow

1. **Customer adds items to cart**
2. **Clicks "Proceed to Checkout"**
3. **Enters name, email, phone number**
4. **Razorpay payment modal opens**
5. **Customer selects payment method:**
   - UPI (scan QR or enter UPI ID)
   - Card (enter card details)
   - Net Banking (select bank)
   - Wallet (select wallet)
6. **Payment processed**
7. **Success:** Order created, stock updated, confirmation shown
8. **Failure:** Error message displayed, can retry

---

## 🔐 Security Features

✅ **PCI DSS Compliant** - Card data never touches your server  
✅ **3D Secure** - Additional authentication for cards  
✅ **Encrypted Transactions** - All data encrypted in transit  
✅ **Fraud Detection** - Built-in fraud prevention  
✅ **Webhook Support** - Real-time payment notifications

---

## 💰 Pricing (Razorpay Fees)

**Domestic Payments:**
- UPI: 0% (Free up to certain limit)
- Cards: 2% + GST
- Net Banking: 2% + GST
- Wallets: 2% + GST

**International Cards:**
- 3% + GST

*Note: Fees may vary. Check Razorpay pricing page for latest rates.*

---

## 📱 Features Implemented

✅ **Multiple Payment Methods** - UPI, Cards, Net Banking, Wallets  
✅ **Currency Conversion** - Automatic USD to INR conversion  
✅ **Payment Success Handling** - Order creation and stock update  
✅ **Payment Failure Handling** - Error messages and retry option  
✅ **Payment ID Tracking** - Each order stores Razorpay payment ID  
✅ **Custom Branding** - Store name, logo, and theme color  
✅ **Mobile Responsive** - Works perfectly on all devices

---

## 🛠️ Customization Options

### Change Currency Conversion Rate
Edit `js/razorpay-config.js`:
```javascript
usdToInrRate: 83, // Update this value
```

### Change Store Information
Edit `js/razorpay-config.js`:
```javascript
storeName: 'Your Store Name',
storeDescription: 'Your Description',
storeLogo: 'https://your-logo-url.com/logo.png',
```

### Change Theme Color
Edit `js/razorpay-config.js`:
```javascript
themeColor: '#your-color-code'
```

---

## 🐛 Troubleshooting

### Payment Modal Not Opening
- Check if Razorpay script is loaded: `https://checkout.razorpay.com/v1/checkout.js`
- Check browser console for errors
- Verify Key ID is correct

### Payment Successful but Order Not Created
- Check browser console for errors
- Verify stock availability
- Check localStorage for data

### Test Payments Not Working
- Ensure you're using test mode key (`rzp_test_`)
- Use correct test card numbers
- Check internet connection

---

## 📞 Support

**Razorpay Support:**
- Email: support@razorpay.com
- Phone: +91-80-6890-6890
- Dashboard: https://dashboard.razorpay.com

**Documentation:**
- Razorpay Docs: https://razorpay.com/docs/
- Payment Methods: https://razorpay.com/docs/payments/
- Test Cards: https://razorpay.com/docs/payments/payments/test-card-details/

---

## ✅ Checklist Before Going Live

- [ ] Razorpay account created and KYC completed
- [ ] Live API keys generated
- [ ] Updated `razorpay-config.js` with live keys
- [ ] Changed mode to 'live'
- [ ] Tested with small real payment
- [ ] Verified payment in Razorpay Dashboard
- [ ] Set up webhooks (optional but recommended)
- [ ] Configured settlement account
- [ ] Reviewed pricing and fees
- [ ] Added terms and conditions
- [ ] Added refund policy

---

## 🎯 Next Steps

1. **Test the payment flow** with test credentials
2. **Get your Razorpay account** if you want real payments
3. **Update to live mode** when ready
4. **Monitor payments** in Razorpay Dashboard
5. **Handle refunds** through Razorpay Dashboard if needed

---

**Happy Selling! 🎴⚡**
