import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmationDialog({ isOpen, onClose, onConfirm }: DeleteConfirmationDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    toast.success('Book deleted successfully!');
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="dark:bg-[#2c3e50] dark:border-gray-600">
        <AlertDialogHeader>
          <AlertDialogTitle className="dark:text-white">Are you sure?</AlertDialogTitle>
          <AlertDialogDescription className="dark:text-gray-300">
            Are you sure you want to delete this book? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="dark:bg-[#34495e] dark:text-white dark:border-gray-600 dark:hover:bg-[#3d566e]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
