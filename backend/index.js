import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "../backend/models/bookModel.js";

const app = express();

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome");
});

// Middleware for parsing request body
app.use(express.json());

// Route to Save a new Book
app.post("/books", async (request, response) => {
  try {
    console.log("Request body:", request.body);
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message:
          "Fill all required fields: title, author, publisher, publishYear",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (err) {
    console.log(err.message);
    response.status(500).send({ message: err.message });
  }
});

// Route for Get All books from the database
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route for get One Book from database by Id
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Rout for update Book
app.put("/book/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Fill all required fields: title, author, publishYear",
      });
    }

    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for delete a book

app.delete("/books/:id", async (req, req) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "book not found" });
    }
    return response.status(200).send({ message: "book deleted succesfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected to database");
    app.listen(PORT, () => {
      console.log(`App listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
