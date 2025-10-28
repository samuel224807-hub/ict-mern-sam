import { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { BookList } from './components/BookList';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import * as api from './api/books';

export type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  stock: number;
  publishedYear: number;
};

export default function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const data = await api.getBooks();
        // map _id to id if backend returns _id
        const mapped = data.map((b: any) => ({
          id: b._id || b.id,
          title: b.title,
          author: b.author,
          genre: b.genre,
          price: b.price,
          stock: b.stock,
          publishedYear: b.publishedYear
        }));
        setBooks(mapped);
      } catch (err: any) {
        toast.error(err?.message || 'Failed to load books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const addBook = async (book: Omit<Book, 'id'>) => {
    try {
      const created = await api.addBook(book);
      const newBook = {
        id: created._id || created.id || Date.now().toString(),
        ...book
      };
      setBooks(prev => [...prev, newBook]);
      toast.success('Book added');
    } catch (err: any) {
      toast.error(err?.response?.data?.error || err?.message || 'Failed to add book');
    }
  };

  const updateBook = async (id: string, updatedBook: Omit<Book, 'id'>) => {
    try {
      const res = await api.updateBook(id, updatedBook);
      setBooks(prev => prev.map(b => (b.id === id ? { ...updatedBook, id } : b)));
      toast.success('Book updated');
    } catch (err: any) {
      toast.error(err?.response?.data?.error || err?.message || 'Failed to update book');
    }
  };

  const deleteBook = async (id: string) => {
    try {
      await api.deleteBook(id);
      setBooks(prev => prev.filter(b => b.id !== id));
      toast.success('Book deleted');
    } catch (err: any) {
      toast.error(err?.response?.data?.error || err?.message || 'Failed to delete book');
    }
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#1a2332] transition-colors">
        <Dashboard 
          totalBooks={books.length}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        />
        <BookList
          books={books}
          onAddBook={addBook}
          onUpdateBook={updateBook}
          onDeleteBook={deleteBook}
        />
        <Toaster position="top-right" />
      </div>
    </div>
  );
}
