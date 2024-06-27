import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authenticationroute from "./ROUTES/authenticationroute.js";
import adminRoute from "./ROUTES/adminRoute.js";
import productsRoute from './ROUTES/productsRoute.js'
import path from "path"
import cors from 'cors'

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))

app.use("/api/users", authenticationroute);
app.use("/api/admin", adminRoute);
app.use("/api/userproduct",productsRoute)


app.use(express.static(path.join('Public')));


app.get('/', (req, res) => {
  res.sendFile(path.join("Public","./index.html"));
});
console.log();


mongoose
  .connect(process.env.DB)
  .then(() => console.log("db connected "))
  .catch((err) => console.log(err));

  const PORT = process.env.PORT || 6788;

app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});
