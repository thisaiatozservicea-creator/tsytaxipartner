
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

// Customer API
app.post('/api/customer', async (req, res) => {
  try {
    const { name, phone, email, address } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        error: "Name and phone are required"
      });
    }

    res.json({
      success: true,
      customer: {
        name,
        phone,
        email: email || "",
        address: address || ""
      }
    });
  } catch (error) {
    console.error("Customer API error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Booking API
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
        error: "Invalid booking data"
      });
    }

    const bookingId = "TSY" + Date.now();

    res.json({
      success: true,
      bookingId
    });
  } catch (error) {
    console.error("Booking API error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Homepage - actual existing file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Login page compatibility
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ TSY TAXI server running on port ${PORT}`);
  console.log(`✓ Firebase Firestore frontend integration retained`);
});
