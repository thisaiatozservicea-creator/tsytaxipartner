
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// MIDDLEWARE
// ============================================

app.use(cors());
app.use(express.json());

// ============================================
// API ROUTES
// ============================================

// Create or update customer
app.post('/api/customer', async (req, res) => {
  try {
    const { name, phone, email, address } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Name and phone are required'
      });
    }

    // Frontend handles Firestore storage
    return res.json({
      success: true,
      customer: {
        name,
        phone,
        email: email || '',
        address: address || ''
      }
    });

  } catch (error) {
    console.error('Customer API error:', error);

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Create booking
app.post('/api/booking', async (req, res) => {
  try {
    const bookingData = req.body;

    if (
      !bookingData.pickup ||
      !bookingData.destination ||
      !bookingData.passenger
    ) {
      return res.status(400).json({
        success: false,
        error: 'Invalid booking data'
      });
    }

    const bookingId = 'TSY' + Date.now();

    // Frontend handles Firestore storage
    return res.json({
      success: true,
      bookingId
    });

  } catch (error) {
    console.error('Booking API error:', error);

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============================================
// HTML PAGE ROUTES
// ============================================

// MAIN HOMEPAGE - PARTNER LOGIN
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// LOGIN URL - USE THE SAME INDEX PAGE
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// PARTNER DASHBOARD
app.get('/partner-dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'partner-dashboard.html'));
});

// Existing taxi page routes (if those files exist)
app.get('/home.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/booking.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'booking.html'));
});

app.get('/admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// ============================================
// STATIC FILES
// ============================================

app.use(express.static(__dirname));

// ============================================
// 404 HANDLER
// ============================================

app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`TSY TAXI server running on port ${PORT}`);
  console.log('Firebase Firestore is handled by the frontend.');
});
