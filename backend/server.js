const express = require("express");
// const FAST2SMS_API_KEY = "vJ7T5iPoMVJd1bv5VDD11DdIcbhiyg8CiAGC3ykhkFFWWZtvMpr5DmT5WKKL"; // apni Fast2SMS key env me 
const axios = require("axios");
   // Recipient normal phone number for call


   const SECRET_KEY = process.env.SECRET_KEY;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER;
const myWhatsappNumber = process.env.MY_WHATSAPP_NUMBER;

const twilioNumber = process.env.TWILIO_CALL_NUMBER;
const myPhoneNumber = process.env.MY_PHONE_NUMBER;

const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client("816034896121-8a43uj414jr74aiies1l5tekjmsla1gn.apps.googleusercontent.com");

const generateJWTAndSetCookie = (email, res) => {
  const token = jwt.sign({ email }, "faiz123", { expiresIn: "1d" });
  res.json({ success: true, token, email });
};

const app = express();
const port = 5000;

// ✅ Middleware
app.use(cors({
  origin: "http://localhost:5173", // React Vite dev server
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// server.js
const session = require('express-session');

app.use(
  session({
    secret: "faiz123",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true if HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// ✅ MySQL Connection
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "chicken",
// });

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting DB:", err);
    return;
  }
  console.log("MySQL connected");
});

// ✅ Register
app.post("/register", (req, res) => {
  const { name, phone, email, password } = req.body;
  const sql = "INSERT INTO register (name, phone, email, password) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, phone, email, password], (err, result) => {
    if (err) {
      console.error("Register error:", err);
      return res.status(500).json({ success: false, message: "Registration failed" });
    }
    res.json({ success: true, message: "Registration successful" });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM register WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (results.length > 0) {
      const user = results[0];

      // ✅ Create JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        "faiz123",
        { expiresIn: "7d" }
      );

      // ✅ Set cookie (optional, you already store in localStorage)
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // set to true in production with HTTPS
        sameSite: "Lax",
        // maxAge: 60 * 60 * 1000 // 1 hour
          maxAge: 7 * 24 * 60 * 60 * 1000 // 7 din


      });

      // ✅ Send token in JSON so frontend can store it
      res.json({
        success: true,
        message: "Login successful",
        token, // <-- IMPORTANT
        user: {
          id: user.id,
          username: user.name,
          phone_number: user.phone,
          email: user.email
        }
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  });
});


app.get("/verify-token", (req, res) => {
  try {
    let token = null;

    // Check Authorization header
    const authHeader = req.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // If not found, check cookie
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ valid: false, message: "No token provided" });
    }

    jwt.verify(token, "faiz123", (err, decoded) => {
      if (err) {
        return res.status(401).json({ valid: false, message: "Invalid or expired token" });
      }

      res.json({ valid: true, user: decoded });
    });
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(500).json({ valid: false, message: "Server error" });
  }
});

// ✅ Logout
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  });
});

app.post("/auth/google", async (req, res) => {
  const { credential } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: "816034896121-8a43uj414jr74aiies1l5tekjmsla1gn.apps.googleusercontent.com", // Replace with your 
      // Google client ID
      
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    // Check if user already exists
    const sqlCheck = "SELECT * FROM register WHERE email = ?";
    db.query(sqlCheck, [email], (err, results) => {
      if (err) return res.status(500).json({ success: false, message: "DB error" });

      if (results.length === 0) {
        // Insert new user from Google
        const insertSQL = "INSERT INTO register (name, email, phone, password, pincode) VALUES (?, ?, '', '', '')";
        db.query(insertSQL, [name, email], (err2) => {
          if (err2) return res.status(500).json({ success: false, message: "Failed to register Google user" });
          generateJWTAndSetCookie(email, res);
        });
      } else {
        generateJWTAndSetCookie(email, res);
      }
    });

  } catch (err) {
    console.error("OAuth error", err);
    res.status(401).json({ success: false, message: "Invalid Google token" });
  }
});

app.post("/api/order", (req, res) => {
  const {
    username,
    phone_number,
    productName,
    quantity,
    price,
    totalAmount,
    payment_method,
    deliveryLocation  // ✅ Added this field
  } = req.body;

  // Updated validation to include deliveryLocation
  if (!username || !phone_number || !productName || !quantity || !deliveryLocation) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Updated SQL to include delivery_location
  const sql = `INSERT INTO orders 
    (username, phone_number, product_name, quantity, price, total_amount, payment_method, delivery_location)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  // Updated values array to include deliveryLocation
  const values = [username, phone_number, productName, quantity, price, totalAmount, payment_method, deliveryLocation];

  db.query(sql, values, async (err, result) => {
    if (err) {
      console.error("DB error:", err.sqlMessage || err.message);
      return res.status(500).json({ error: "Database error" });
    }

    try {
      // ✅ Updated message format with better formatting and delivery location
      const orderDetailsMessage = `🚨 *NEW ORDER RECEIVED!* 🚨

👤 *Customer:* ${username}
📱 *Phone:* ${phone_number}
🍗 *Product:* ${productName}
⚖️ *Quantity:* ${quantity} kg
💰 *Unit Price:* ₹${price}
💵 *Total Amount:* ₹${totalAmount}
💳 *Payment:* ${payment_method}
📍 *Delivery Area:* ${deliveryLocation}
🕒 *Order Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Please prepare and deliver ASAP! 🚀`;

      // 1️⃣ Send WhatsApp message - ✅ Fixed format
      try {
        await twilioClient.messages.create({
          from: `whatsapp:${twilioWhatsAppNumber}`,  // ✅ Added whatsapp: prefix
          to: `whatsapp:${myWhatsappNumber}`,         // ✅ Added whatsapp: prefix
          body: orderDetailsMessage.trim(),
        });
        console.log("✅ WhatsApp message sent successfully!");
      } catch (whatsAppError) {
        console.error("❌ WhatsApp message failed:", whatsAppError.message || whatsAppError);
      }

      // 2️⃣ Send SMS message (backup notification)
      try {
        const smsMessage = `NEW ORDER: ${username} (${phone_number}) ordered ${quantity}kg ${productName} for ₹${totalAmount}. Delivery: ${deliveryLocation}. Payment: ${payment_method}`;
        
        await twilioClient.messages.create({
          body: smsMessage,
          from: twilioNumber,
          to: myPhoneNumber,
        });
        console.log("✅ SMS sent successfully!");
      } catch (smsErr) {
        console.error("❌ SMS failed:", smsErr.message || smsErr);
      }

      // 3️⃣ Voice call with TTS - ✅ Updated with delivery location
      try {
        const voiceMessage = `
Hello, you have received a new order.
Customer name: ${username}.
Phone number: ${phone_number}.
Product: ${productName}.
Quantity: ${quantity} kilograms.
Unit price: ${price} rupees.
Total amount: ${totalAmount} rupees.
Payment method: ${payment_method}.
Delivery location: ${deliveryLocation}.
Order time: ${new Date().toLocaleTimeString()}.
Please prepare the order immediately.
Thank you.
        `;

        await twilioClient.calls.create({
          twiml: `<Response><Say voice="alice" rate="0.9">${voiceMessage.trim()}</Say></Response>`,
          to: myPhoneNumber,
          from: twilioNumber,
        });
        console.log("✅ Voice call initiated successfully!");
      } catch (callError) {
        console.error("❌ Voice call failed:", callError.message || callError);
      }

      // ✅ Success response
      res.json({ 
        success: true, 
        orderId: result.insertId,
        message: "Order placed successfully and notifications sent!"
      });

    } catch (twilioError) {
      console.error("❌ Twilio error:", twilioError);
      res.json({ 
        success: true, 
        orderId: result.insertId, 
        warning: "Order placed but notification failed" 
      });
    }
  });
});

app.get("/me", (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ user: null });
  }
});



app.get("/api/order/status", (req, res) => {
    // Here you can fetch status from DB or return a sample response
    const status = "pending"; // or fetched from your database
    res.json({ status });
});


function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Please login first" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}
// Get orders by phone number
app.get("/api/orders/:phone", (req, res) => {
  const phone = req.params.phone;

  const query = `
    SELECT id, username, product_name, total_amount, payment_method, ordered_at
    FROM orders
    WHERE phone_number = ?
    ORDER BY ordered_at DESC
  `;

  db.query(query, [phone], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});



app.post("/api/order", (req, res) => {
  const {
    username,
    phone_number,
    productName,
    quantity,
    price,
    totalAmount,
    payment_method,
    deliveryLocation
  } = req.body;

  if (!username || !phone_number || !productName || !quantity || !deliveryLocation) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = `INSERT INTO orders 
    (username, phone_number, product_name, quantity, price, total_amount, payment_method, delivery_location)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [username, phone_number, productName, quantity, price, totalAmount, payment_method, deliveryLocation];

  db.query(sql, values, async (err, result) => {
    if (err) {
      console.error("DB error:", err.sqlMessage || err.message);
      return res.status(500).json({ error: "Database error" });
    }

    // 🔧 STEP 3: Better formatted WhatsApp message (avoid special characters that might cause issues)
    const orderDetailsMessage = `NEW ORDER ALERT!

Customer: ${username}
Phone: ${phone_number}
Product: ${productName}
Quantity: ${quantity} kg
Unit Price: Rs ${price}
Total Amount: Rs ${totalAmount}
Payment: ${payment_method}
Delivery Area: ${deliveryLocation}
Order Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Please prepare and deliver ASAP!`;

    try {
      // 🔧 STEP 4: Enhanced WhatsApp sending with detailed logging
      console.log("🔍 Attempting to send WhatsApp message...");
      console.log("📱 From:", process.env.TWILIO_WHATSAPP_NUMBER || "whatsapp:+14155238886");
      console.log("📱 To:", process.env.MY_WHATSAPP_NUMBER);
      console.log("📝 Message length:", orderDetailsMessage.length);

      const whatsappMessage = await twilioClient.messages.create({
        from: process.env.TWILIO_WHATSAPP_NUMBER || "whatsapp:+14155238886", // Sandbox number
        to: process.env.MY_WHATSAPP_NUMBER, // Your WhatsApp number with whatsapp: prefix
        body: orderDetailsMessage.trim(),
      });

      console.log("✅ WhatsApp message sent successfully!");
      console.log("📧 Message SID:", whatsappMessage.sid);
      console.log("📊 Message Status:", whatsappMessage.status);

    } catch (whatsAppError) {
      console.error("❌ WhatsApp Error Details:");
      console.error("Error Code:", whatsAppError.code);
      console.error("Error Message:", whatsAppError.message);
      console.error("Error Status:", whatsAppError.status);
      console.error("Full Error:", whatsAppError);
    }

    // SMS as backup (working fine)
    try {
      const smsMessage = `NEW ORDER: ${username} (${phone_number}) ordered ${quantity}kg ${productName} for Rs${totalAmount}. Delivery: ${deliveryLocation}. Payment: ${payment_method}`;
      
      await twilioClient.messages.create({
        body: smsMessage,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.MY_PHONE_NUMBER,
      });
      console.log("✅ SMS sent successfully!");
    } catch (smsErr) {
      console.error("❌ SMS failed:", smsErr.message);
    }

    // Voice call
    try {
      const voiceMessage = `Hello, you have received a new order. Customer name: ${username}. Phone number: ${phone_number}. Product: ${productName}. Quantity: ${quantity} kilograms. Total amount: ${totalAmount} rupees. Delivery location: ${deliveryLocation}. Please prepare the order immediately.`;

      await twilioClient.calls.create({
        twiml: `<Response><Say voice="alice" rate="0.8">${voiceMessage}</Say></Response>`,
        to: process.env.MY_PHONE_NUMBER,
        from: process.env.TWILIO_PHONE_NUMBER,
      });
      console.log("✅ Voice call initiated!");
    } catch (callError) {
      console.error("❌ Voice call failed:", callError.message);
    }

    res.json({ 
      success: true, 
      orderId: result.insertId,
      message: "Order placed successfully!"
    });
  });
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
