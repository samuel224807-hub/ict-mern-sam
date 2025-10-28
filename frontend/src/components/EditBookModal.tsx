import { useState, useEffect } from 'react';
import { Book } from '../App';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

interface EditBookModalProps {
  isOpen: boolean;
  book: Book;
  onClose: () => void;
  onSave: (id: string, book: Omit<Book, 'id'>) => Promise<void>;
}

export function EditBookModal({ isOpen, book, onClose, onSave }: EditBookModalProps) {
  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author,
    genre: book.genre,
    price: book.price.toString(),
    stock: book.stock.toString(),
    publishedYear: book.publishedYear.toString()
  });

  useEffect(() => {
    setFormData({
      title: book.title,
      author: book.author,
      genre: book.genre,
      price: book.price.toString(),
      stock: book.stock.toString(),
      publishedYear: book.publishedYear.toString()
    });
  }, [book]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.author || !formData.genre || 
        !formData.price || !formData.stock || !formData.publishedYear) {
      toast.error('Please fill in all fields');
      return;
    }

    const price = parseFloat(formData.price);
    const stock = parseInt(formData.stock);
    const publishedYear = parseInt(formData.publishedYear);

    if (isNaN(price) || price <= 0) {
      toast.error('Please enter a valid price');
      return;
    }

    if (isNaN(stock) || stock < 0) {
      toast.error('Please enter a valid stock quantity');
      return;
    }

    if (isNaN(publishedYear) || publishedYear < 1000 || publishedYear > new Date().getFullYear()) {
      toast.error('Please enter a valid published year');
      return;
    }

    onSave(book.id, {
      title: formData.title,
      author: formData.author,
      genre: formData.genre,
      price,
      stock,
      publishedYear
    });

    toast.success('Book updated successfully!');
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] dark:bg-[#2c3e50] dark:text-white dark:border-gray-600">
        <DialogHeader>
          <DialogTitle className="dark:text-white">Edit Book</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title" className="dark:text-gray-300">Title</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter book title"
                className="dark:bg-[#34495e] dark:text-white dark:border-gray-600"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-author" className="dark:text-gray-300">Author</Label>
              <Input
                id="edit-author"
                value={formData.author}
                onChange={(e) => handleChange('author', e.target.value)}
                placeholder="Enter author name"
                className="dark:bg-[#34495e] dark:text-white dark:border-gray-600"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-genre" className="dark:text-gray-300">Genre</Label>
              <Input
                id="edit-genre"
                value={formData.genre}
                onChange={(e) => handleChange('genre', e.target.value)}
                placeholder="Enter genre"
                className="dark:bg-[#34495e] dark:text-white dark:border-gray-600"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-price" className="dark:text-gray-300">Price (₹)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  placeholder="0.00"
                  className="dark:bg-[#34495e] dark:text-white dark:border-gray-600"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-stock" className="dark:text-gray-300">Stock</Label>
                <Input
                  id="edit-stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => handleChange('stock', e.target.value)}
                  placeholder="0"
                  className="dark:bg-[#34495e] dark:text-white dark:border-gray-600"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-publishedYear" className="dark:text-gray-300">Published Year</Label>
              <Input
                id="edit-publishedYear"
                type="number"
                value={formData.publishedYear}
                onChange={(e) => handleChange('publishedYear', e.target.value)}
                placeholder="2024"
                className="dark:bg-[#34495e] dark:text-white dark:border-gray-600"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="dark:bg-[#34495e] dark:text-white dark:border-gray-600 dark:hover:bg-[#3d566e]"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-[#3b5998] hover:bg-[#2d4373] dark:bg-[#4a6fa5] dark:hover:bg-[#3b5998]"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
