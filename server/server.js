import express from "express";
import productRoutes from "./routes/product-route.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from "./routes/auth-route.js";
import cartRoute from './routes/cart-route.js';
import dns from "dns";

dns.setServers(["1.1.1.1", "1.0.0.1"]);

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoute);
app.use('/api/cart', cartRoute);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`ShopSphere server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error.message);
  }
};

startServer();
