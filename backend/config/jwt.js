// JWT Configuration
const JWT_CONFIG = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRE || "30d",
  algorithm: "HS256",
};

// Validate JWT_SECRET on startup
if (!JWT_CONFIG.secret) {
  throw new Error("❌ JWT_SECRET is not defined! Please set it in .env file");
}

if (JWT_CONFIG.secret.length < 32) {
  console.warn(
    "⚠️  Warning: JWT_SECRET should be at least 32 characters long for security",
  );
}

export default JWT_CONFIG;
