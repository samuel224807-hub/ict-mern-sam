import { useState } from 'react';
import { Pencil, Trash2, Plus, Search } from 'lucide-react';
import { Book } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { AddBookModal } from './AddBookModal';
import { EditBookModal } from './EditBookModal';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';

interface BookListProps {
  books: Book[];
  onAddBook: (book: Omit<Book, 'id'>) => Promise<void>;
  onUpdateBook: (id: string, book: Omit<Book, 'id'>) => Promise<void>;
  onDeleteBook: (id: string) => Promise<void>;
}

export function BookList({ books, onAddBook, onUpdateBook, onDeleteBook }: BookListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'author' | 'genre'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deletingBookId, setDeletingBookId] = useState<string | null>(null);

  const filteredBooks = books.filter(book => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    
    if (filterType === 'author') {
      return book.author.toLowerCase().includes(query);
    } else if (filterType === 'genre') {
      return book.genre.toLowerCase().includes(query);
    } else {
      return (
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.genre.toLowerCase().includes(query)
      );
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Search and Filter Bar */}
      <div className="bg-white dark:bg-[#2c3e50] rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 dark:bg-[#34495e] dark:text-white dark:border-gray-600"
            />
          </div>
          <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
            <SelectTrigger className="w-full md:w-[180px] dark:bg-[#34495e] dark:text-white dark:border-gray-600">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Fields</SelectItem>
              <SelectItem value="author">By Author</SelectItem>
              <SelectItem value="genre">By Genre</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Books Table */}
      <div className="bg-white dark:bg-[#2c3e50] rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="dark:border-gray-600">
                <TableHead className="dark:text-gray-300">Title</TableHead>
                <TableHead className="dark:text-gray-300">Author</TableHead>
                <TableHead className="dark:text-gray-300">Genre</TableHead>
                <TableHead className="dark:text-gray-300">Price</TableHead>
                <TableHead className="dark:text-gray-300">Stock</TableHead>
                <TableHead className="dark:text-gray-300">Published Year</TableHead>
                <TableHead className="text-right dark:text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBooks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No books found
                  </TableCell>
                </TableRow>
              ) : (
                filteredBooks.map((book) => (
                  <TableRow key={book.id} className="dark:border-gray-600">
                    <TableCell className="dark:text-white">{book.title}</TableCell>
                    <TableCell className="text-[#8b9dc3] dark:text-[#a8b8d8]">{book.author}</TableCell>
                    <TableCell className="dark:text-gray-300">{book.genre}</TableCell>
                    <TableCell className="dark:text-gray-300">₹{book.price.toFixed(2)}</TableCell>
                    <TableCell className="dark:text-gray-300">{book.stock}</TableCell>
                    <TableCell className="dark:text-gray-300">{book.publishedYear}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingBook(book)}
                          className="hover:bg-[#dfe3ee] dark:hover:bg-[#34495e] dark:text-gray-300"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeletingBookId(book.id)}
                          className="hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:text-gray-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Floating Add Button */}
      <Button
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-8 right-8 rounded-full w-14 h-14 shadow-lg bg-[#3b5998] hover:bg-[#2d4373] dark:bg-[#4a6fa5] dark:hover:bg-[#3b5998]"
        size="icon"
      >
        <Plus className="w-6 h-6" />
      </Button>

      {/* Modals */}
      <AddBookModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={onAddBook}
      />

      {editingBook && (
        <EditBookModal
          isOpen={true}
          book={editingBook}
          onClose={() => setEditingBook(null)}
          onSave={onUpdateBook}
        />
      )}

      {deletingBookId && (
        <DeleteConfirmationDialog
          isOpen={true}
          onClose={() => setDeletingBookId(null)}
          onConfirm={() => {
            onDeleteBook(deletingBookId);
            setDeletingBookId(null);
          }}
        />
      )}
    </div>
  );
}
