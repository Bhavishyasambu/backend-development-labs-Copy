
const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

const app = express();

app.use(express.json());

const dbPath = path.join(__dirname, "books-database.db");

let db = null;

const PORT = process.env.PORT || 3000;

// Initialize database and start server
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    console.log("Database connected successfully");

    // Create books table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS book (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        price INTEGER NOT NULL,
        pages INTEGER NOT NULL
      );
    `);

    console.log("Books table created successfully");

    // GET all books
    app.get("/books/", async (request, response) => {
      try {
        const books = await db.all("SELECT * FROM book");
        response.status(200).send(books);
      } catch (error) {
        response.status(500).send({ error: error.message });
      }
    });

    // GET a book by ID
    app.get("/books/:bookId/", async (request, response) => {
      try {
        const { bookId } = request.params;

        const book = await db.get(
          "SELECT * FROM book WHERE id = ?",
          [bookId]
        );

        if (book === undefined) {
          return response.status(404).send({ message: "Book not found" });
        }

        response.status(200).send(book);
      } catch (error) {
        response.status(500).send({ error: error.message });
      }
    });

    // POST a new book
    app.post("/books/", async (request, response) => {
      try {
        const { title, author, price, pages } = request.body;

        if (
          !title ||
          !author ||
          !Number.isInteger(price) ||
          !Number.isInteger(pages) ||
          price < 0 ||
          pages <= 0
        ) {
          return response.status(400).send({
            message: "Please provide valid title, author, price and pages",
          });
        }

        const query = `
          INSERT INTO book (title, author, price, pages)
          VALUES (?, ?, ?, ?);
        `;

        await db.run(query, [title, author, price, pages]);

        response.status(201).send({ message: "Book added successfully" });
      } catch (error) {
        response.status(500).send({ error: error.message });
      }
    });

    // PUT update a book
    app.put("/books/:bookId/", async (request, response) => {
      try {
        const { bookId } = request.params;
        const { title, author, price, pages } = request.body;

        if (
          !title ||
          !author ||
          !Number.isInteger(price) ||
          !Number.isInteger(pages) ||
          price < 0 ||
          pages <= 0
        ) {
          return response.status(400).send({
            message: "Please provide valid title, author, price and pages",
          });
        }

        const query = `
          UPDATE book
          SET title = ?, author = ?, price = ?, pages = ?
          WHERE id = ?;
        `;

        const result = await db.run(query, [
          title,
          author,
          price,
          pages,
          bookId,
        ]);

        if (result.changes === 0) {
          return response.status(404).send({ message: "Book not found" });
        }

        response.status(200).send({ message: "Book updated successfully" });
      } catch (error) {
        response.status(500).send({ error: error.message });
      }
    });

    // DELETE a book
    app.delete("/books/:bookId/", async (request, response) => {
      try {
        const { bookId } = request.params;

        const result = await db.run(
          "DELETE FROM book WHERE id = ?",
          [bookId]
        );

        if (result.changes === 0) {
          return response.status(404).send({ message: "Book not found" });
        }

        response.status(200).send({ message: "Book deleted successfully" });
      } catch (error) {
        response.status(500).send({ error: error.message });
      }
    });

    // Start server only after database connection succeeds
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`Database Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();
