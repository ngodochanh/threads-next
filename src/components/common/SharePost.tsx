'use client';

import { Copy, SendHorizonal } from 'lucide-react';
import { useToast } from '../ui/use-toast';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  FacebookShareButton,
  FacebookIcon,
  LineShareButton,
  LineIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  ViberShareButton,
  ViberIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'next-share';

function SharePost({ url }: { url: string }) {
  const { toast } = useToast();

  const copyUrl = () => {
    navigator.clipboard.writeText(url);
    toast({
      title: 'Copied!',
      description: 'Post Link copied successfully!',
      className: 'bg-green-500',
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <SendHorizonal width={20} height={20} className="cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Share Post</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex rounded-md border justify-between p-5 mt-5">
              <strong>{url}</strong>
              <Copy height={20} width={20} className="cursor-pointer" onClick={copyUrl} />
            </div>

            <div className="mt-5 flex items-center space-x-5">
              <FacebookShareButton url={url} quote={'Threads app post URL.'} hashtag={'#nextshare'}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>

              <LineShareButton url={url} title={'Threads app post URL.'}>
                <LineIcon size={32} round />
              </LineShareButton>

              <PinterestShareButton url={url} media={'Threads app post URL.'}>
                <PinterestIcon size={32} round />
              </PinterestShareButton>

              <RedditShareButton url={url} title={'Threads app post URL.'}>
                <RedditIcon size={32} round />
              </RedditShareButton>

              <TelegramShareButton url={url} title={'Threads app post URL.'}>
                <TelegramIcon size={32} round />
              </TelegramShareButton>

              <TwitterShareButton url={url} title={'Threads app post URL.'}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>

              <ViberShareButton url={url} title={'Threads app post URL.'}>
                <ViberIcon size={32} round />
              </ViberShareButton>

              <WhatsappShareButton url={url} title={'Threads app post URL.'} separator=":: ">
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>

              <LinkedinShareButton url={url}>
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default SharePost;
