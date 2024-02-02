import express from "express";
import form1 from "./routers/form.js";
import errorHandling from "./middlewares/errorHandling.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
express(express.static("public"));
// middlewares
app.use(express.json());

// routers
app.use(form1);

// error handling
app.use(errorHandling);

export default app;
