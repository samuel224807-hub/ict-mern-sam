const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Book = require('../models/Book');

// POST /api/books -> Add a new book
router.post('/', async (req, res, next) => {
  try {
    const { title, author, genre, price, stock, publishedYear } = req.body;

    if (!title || !author || !genre || price === undefined) {
      return res.status(400).json({ error: 'title, author, genre and price are required' });
    }

    const book = new Book({ title, author, genre, price, stock, publishedYear });
    const saved = await book.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});

// GET /api/books -> Get all books (sorted by createdAt desc)
router.get('/', async (req, res, next) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    next(err);
  }
});

// PUT /api/books/:id -> Update a book
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid book id' });
    }

    const updates = req.body;
    const options = { new: true, runValidators: true };

    const updated = await Book.findByIdAndUpdate(id, updates, options);
    if (!updated) return res.status(404).json({ error: 'Book not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/books/:id -> Delete a book
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid book id' });
    }

    const deleted = await Book.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted', id: deleted._id });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
