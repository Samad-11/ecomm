import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConnect.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";

//config env
dotenv.config();

//db conn
connectDB();

//rest obj
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use("/product", express.static("public/productImage"));

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);

//rest api
app.get("/hello", (req, res) => {
  res.json({ message: "Hello Word" });
});

//PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});
