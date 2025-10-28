# Book Inventory Backend

This is the Node.js + Express + MongoDB backend for the Book Inventory project.

Quick start

1. Copy `.env.example` to `.env` and set `MONGO_URI` if needed.
2. Install dependencies: `npm install`
3. Run in development: `npm run dev` (requires nodemon)

API endpoints

- POST /api/books → Add a new book
- GET /api/books → Get all books (sorted newest first)
- PUT /api/books/:id → Update an existing book
- DELETE /api/books/:id → Delete a book

Model fields

{
 title, author, genre, price, stock, publishedYear, createdAt
}
