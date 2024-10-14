// backend/config/sessionConfig.js
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config(); // Load environment variables

const sessionConfig = () => {
  return session({
    secret: process.env.SESSION_SECRET, // Change to a strong secret
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 14 * 24 * 60 * 60 // 14 days
    }),
    cookie: {
      maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    }
  });
};

module.exports = sessionConfig;
