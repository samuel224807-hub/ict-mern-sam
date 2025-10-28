import { useState } from 'react';
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
import { toast } from 'sonner';

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (book: Omit<Book, 'id'>) => Promise<void>;
}

export function AddBookModal({ isOpen, onClose, onAdd }: AddBookModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    price: '',
    stock: '',
    publishedYear: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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

    setIsSubmitting(true);
    try {
      await onAdd({
        title: formData.title,
        author: formData.author,
        genre: formData.genre,
        price,
        stock,
        publishedYear
      });

      // Reset form only on success
      setFormData({
        title: '',
        author: '',
        genre: '',
        price: '',
        stock: '',
        publishedYear: ''
      });
      
      onClose();
    } catch (error) {
      // Error is already handled in the parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] dark:bg-[#2c3e50] dark:text-white dark:border-gray-600">
        <DialogHeader>
          <DialogTitle className="dark:text-white">Add New Book</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="dark:text-gray-300">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter book title"
                className="dark:bg-[#34495e] dark:text-white dark:border-gray-600"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="author" className="dark:text-gray-300">Author</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => handleChange('author', e.target.value)}
                placeholder="Enter author name"
                className="dark:bg-[#34495e] dark:text-white dark:border-gray-600"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="genre" className="dark:text-gray-300">Genre</Label>
              <Input
                id="genre"
                value={formData.genre}
                onChange={(e) => handleChange('genre', e.target.value)}
                placeholder="Enter genre"
                className="dark:bg-[#34495e] dark:text-white dark:border-gray-600"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price" className="dark:text-gray-300">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  placeholder="0.00"
                  className="dark:bg-[#34495e] dark:text-white dark:border-gray-600"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stock" className="dark:text-gray-300">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => handleChange('stock', e.target.value)}
                  placeholder="0"
                  className="dark:bg-[#34495e] dark:text-white dark:border-gray-600"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="publishedYear" className="dark:text-gray-300">Published Year</Label>
              <Input
                id="publishedYear"
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
              disabled={isSubmitting}
              className="bg-[#3b5998] hover:bg-[#2d4373] dark:bg-[#4a6fa5] dark:hover:bg-[#3b5998]"
            >
              {isSubmitting ? 'Adding...' : 'Add Book'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
