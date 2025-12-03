// Razorpay Configuration File
// Replace these values with your actual Razorpay credentials

const RAZORPAY_CONFIG = {
    // Test Mode Credentials (Default)
    test: {
        keyId: 'rzp_test_1DP5mmOlF5G5ag',
        keySecret: 'YOUR_TEST_KEY_SECRET' // Not needed for frontend
    },
    
    // Live Mode Credentials (Replace with your actual keys)
    live: {
        keyId: 'YOUR_LIVE_KEY_ID',
        keySecret: 'YOUR_LIVE_KEY_SECRET' // Not needed for frontend
    },
    
    // Current Mode: 'test' or 'live'
    mode: 'test',
    
    // Currency
    currency: 'INR',
    
    // USD to INR conversion rate (update as needed)
    usdToInrRate: 83,
    
    // Store Information
    storeName: 'PokéCards Store',
    storeDescription: 'Pokemon Trading Cards Purchase',
    storeLogo: 'https://cdn-icons-png.flaticon.com/512/188/188918.png',
    
    // Theme Color (matches your website theme)
    themeColor: '#e74c3c'
};

// Get current Razorpay Key ID based on mode
function getRazorpayKeyId() {
    return RAZORPAY_CONFIG.mode === 'live' 
        ? RAZORPAY_CONFIG.live.keyId 
        : RAZORPAY_CONFIG.test.keyId;
}

// Instructions for updating to Live Mode:
// 1. Get your Razorpay credentials from: https://dashboard.razorpay.com/app/keys
// 2. Replace 'YOUR_LIVE_KEY_ID' with your actual live key
// 3. Change mode from 'test' to 'live'
// 4. Save this file
