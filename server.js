const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

console.log("✓ Using Firestore for all data storage");

// API Routes - All data stored in Firestore, these are simplified endpoints

// Create or update customer (Firestore handles actual storage)
app.post('/api/customer', async (req, res) => {
  try {
    const { name, phone, email, address } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, error: "Name and phone are required" });
    }

    // Return success - frontend handles Firestore storage
    res.json({
      success: true,
      customer: { name, phone, email: email || "", address: address || "" }
    });
  } catch (error) {
    console.error("Customer API error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create booking (Firestore handles actual storage)
app.post('/api/booking', async (req, res) => {
  try {
    const bookingData = req.body;

    if (!bookingData.pickup || !bookingData.destination || !bookingData.passenger) {
      return res.status(400).json({ success: false, error: "Invalid booking data" });
    }

    const bookingId = "TSY" + Date.now();

    // Return success - frontend handles Firestore storage
    res.json({
      success: true,
      bookingId: bookingId
    });
  } catch (error) {
    console.error("Booking API error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/home.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/booking.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'booking.html'));
});

app.get('/admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ TSY TAXI server running on http://localhost:${PORT}`);
  console.log(`✓ All data stored in Firebase Firestore`);
});
