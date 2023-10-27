'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';

function DeleteCommentBtn({ id }: { id: number }) {
  const { toast } = useToast();
  const router = useRouter();
  
  const deleteComment = () => {
    axios
      .delete(`/api/comment/${id}`)
      .then((res) => {
        const response = res.data;

        if (response.status == 200) {
          router.refresh();
          toast({
            title: 'Deleted',
            description: response.message,
            className: 'bg-green-500',
          });
        }
      })
      .catch((err) => console.log('The error is ', err));
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2 height={22} width={22} className="text-red-400 cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your comment and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteComment}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteCommentBtn;
