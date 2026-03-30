// Environment variable validation
import dotenv from "dotenv";
dotenv.config();

const requiredEnvVars = [
    "MONGO_URI",
    "JWT_SECRET",
    "NODE_ENV",
    "PORT",
];

const missingVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingVars.length > 0) {
    console.error(
        `❌ Missing required environment variables: ${missingVars.join(", ")}`
    );
    console.error("Please check your .env file");
    process.exit(1);
}

// Validate JWT Secret strength
if (process.env.JWT_SECRET.length < 32) {
    console.warn(
        "⚠️  Warning: JWT_SECRET is less than 32 characters. Consider using a stronger secret."
    );
}

console.log("✅ All required environment variables are configured");
