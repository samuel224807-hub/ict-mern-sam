const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import the Book model
const Book = require('./models/Book');

const books = [
  {
    title: "The Silent Algorithm",
    author: "Mira K. Singh",
    genre: "Computer Science",
    price: 499.00,
    stock: 12,
    publishedYear: 2024
  },
  {
    title: "Whispers of the Wind",
    author: "Arjun Patel",
    genre: "Fiction",
    price: 299.50,
    stock: 5,
    publishedYear: 2021
  },
  {
    title: "Design Patterns Simplified",
    author: "Priya Reddy",
    genre: "Software Engineering",
    price: 799.99,
    stock: 8,
    publishedYear: 2023
  },
  {
    title: "Quantum Horizons",
    author: "Dr. S. Mehta",
    genre: "Science",
    price: 649.00,
    stock: 0,
    publishedYear: 2020
  },
  {
    title: "The Minimalist Coder",
    author: "Rohan Das",
    genre: "Programming",
    price: 399.00,
    stock: 20,
    publishedYear: 2022
  },
  {
    title: "Gardens of Kerala",
    author: "Leena Varma",
    genre: "Travel",
    price: 249.00,
    stock: 3,
    publishedYear: 2019
  },
  {
    title: "AI and the Human Mind",
    author: "Dr. Kavya Nair",
    genre: "Artificial Intelligence",
    price: 899.00,
    stock: 10,
    publishedYear: 2024
  },
  {
    title: "Ocean of Dreams",
    author: "Asha Thomas",
    genre: "Romance",
    price: 199.00,
    stock: 15,
    publishedYear: 2021
  },
  {
    title: "The Art of Debugging",
    author: "Sandeep Kumar",
    genre: "Programming",
    price: 549.00,
    stock: 6,
    publishedYear: 2023
  },
  {
    title: "Hidden Figures of History",
    author: "Meera Chacko",
    genre: "Biography",
    price: 350.00,
    stock: 9,
    publishedYear: 2018
  },
  {
    title: "Learning with Data",
    author: "Vikram Singh",
    genre: "Data Science",
    price: 999.00,
    stock: 7,
    publishedYear: 2022
  },
  {
    title: "The Forgotten Planet",
    author: "Ananya Rao",
    genre: "Science Fiction",
    price: 450.00,
    stock: 11,
    publishedYear: 2020
  },
  {
    title: "Cloud Chronicles",
    author: "Neha Gupta",
    genre: "Technology",
    price: 675.00,
    stock: 4,
    publishedYear: 2023
  },
  {
    title: "Mastering Node.js",
    author: "Rahul Iyer",
    genre: "Web Development",
    price: 820.00,
    stock: 13,
    publishedYear: 2024
  },
  {
    title: "The Data Whisperer",
    author: "Sneha Pillai",
    genre: "Machine Learning",
    price: 1050.00,
    stock: 2,
    publishedYear: 2023
  },
  {
    title: "Wildlife Wonders",
    author: "Arvind Nair",
    genre: "Nature",
    price: 275.00,
    stock: 6,
    publishedYear: 2019
  },
  {
    title: "The Logic of Love",
    author: "Ritika Sharma",
    genre: "Romance",
    price: 180.00,
    stock: 9,
    publishedYear: 2021
  },
  {
    title: "Digital Dreams",
    author: "Kiran Babu",
    genre: "Technology",
    price: 700.00,
    stock: 5,
    publishedYear: 2020
  },
  {
    title: "Cyber Chronicles",
    author: "Nisha George",
    genre: "Cybersecurity",
    price: 950.00,
    stock: 3,
    publishedYear: 2024
  },
  {
    title: "The Book of Algorithms",
    author: "Aditya Menon",
    genre: "Computer Science",
    price: 880.00,
    stock: 10,
    publishedYear: 2022
  }
];

const seedDatabase = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/book_inventory';
    
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing books (optional - comment out if you want to keep existing data)
    // await Book.deleteMany({});
    // console.log('Cleared existing books');

    // Insert new books
    const insertedBooks = await Book.insertMany(books);
    console.log(`Successfully inserted ${insertedBooks.length} books`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();