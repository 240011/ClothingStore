import express from "express";
import bodyParser from "body-parser";
import { db } from "./database/index.js"; // Ensure this function connects to your database
import { userRouter, authRouter, contactRouter, cartRouter,productRouter } from "./route/index.js";
import dotenv from "dotenv";
import { authenticateToken } from "./middleware/token-middleware.js";
import uploadRoutes from "./route/uploadRoutes.js";
import { createUploadsFolder } from "./security/helper.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// ES module-safe way to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config();

const app = express();

// Enable CORS
app.use(cors());

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Use the port from environment variables or default to 5000
const port = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Apply authentication middleware to specific routes
app.use("/api/users", userRouter); // Public route
app.use("/api/auth", authRouter); // Public route
app.use("/api/contact", contactRouter); // Contact routes
app.use("/api/cart", cartRouter); // Cart routes
app.use("/api/upload", uploadRoutes); // Upload routes
app.use("/api/product",productRouter);

app.use(authenticateToken); // Apply to routes that need authentication
app.use("/api/file", uploadRoutes);

// Create uploads folder if it doesn't exist
createUploadsFolder();

if (process.env.NODE_ENV !== 'test') {
  // Start the server and connect to the database
  app.listen(3000, function () {
    console.log(`Project running on port 3000`);
    db();
  });
}

export default app;
