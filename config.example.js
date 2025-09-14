// Configuration example file
// Copy this to config.js and update with your actual MongoDB URI

module.exports = {
  // MongoDB Configuration
  mongodb: {
    uri: process.env.MONGO_URI || "mongodb://localhost:27017/Manager",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },
  
  // Server Configuration
  server: {
    port: process.env.PORT || 8000,
    env: process.env.NODE_ENV || "development"
  }
};
