const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

// MongoDB connection
let db;
let client;

async function connectToMongoDB() {
  try {
    const mongoUri = process.env.MONGO_URI;
    client = new MongoClient(mongoUri);
    await client.connect();
    db = client.db("Manager");
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ 
    message: "Server running on port " + PORT,
    mongodb: db ? "Connected" : "Not connected"
  });
});

// Health check endpoint
app.get("/health", async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ status: "error", message: "Database not connected" });
    }
    
    // Test database connection
    await db.admin().ping();
    res.json({ 
      status: "healthy", 
      mongodb: "connected",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: "error", 
      message: "Database connection failed",
      error: error.message 
    });
  }
});

// API endpoint to access database collections
app.get("/api/collections", async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: "Database not connected" });
    }
    
    const collections = await db.listCollections().toArray();
    res.json({ collections: collections.map(col => col.name) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
async function startServer() {
  await connectToMongoDB();
  
  app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
    console.log(`MongoDB URI: ${process.env.MONGO_URI || "mongodb://localhost:27017/Manager"}`);
  });
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  if (client) {
    await client.close();
  }
  process.exit(0);
});

startServer().catch(console.error);
