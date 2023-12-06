import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import booksRoute from "../backend/routes/booksRoute.js";
import cors from "cors";

// Load environment variables from .env file
import { fileURLToPath } from "url";
import { dirname } from "path";
import { config } from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: __dirname + "/../.env" });

const app = express();

//Port configuration
const PORT = process.env.PORT || 3000;

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policies
app.use(cors());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome");
});

app.use("/books", booksRoute);

console.log("MongoDB URL:", process.env.mongoDBURL);

mongoose
  .connect(process.env.mongoDBURL, {})
  .then(() => {
    console.log("Connected to database");
    app.listen(PORT, () => {
      console.log(`App listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to database", error);
    process.exit(1);
  });
