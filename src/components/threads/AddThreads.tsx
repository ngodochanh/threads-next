'use client';

import { Image } from 'lucide-react';
import UserAvatar from '../common/UserAvatar';
import { Button } from '../ui/button';
import { useRef, useState } from 'react';
import ImagePreviewCard from '../common/ImagePreviewCard';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

function AddThreads() {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<PostErrorType>({});

  const { toast } = useToast();
  const router = useRouter();
  const { data } = useSession();

  const handleClick = () => {
    imageRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImage(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(imageUrl);
    }
  };

  const removePreviewImg = () => {
    setImage(null);
    setPreviewUrl(undefined);
  };

  const submit = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('content', content);
    if (image) formData.append('image', image);
    axios
      .post('/api/post', formData)
      .then((res) => {
        setLoading(false);
        const response = res.data;
        if (response.status == 400) {
          setErrors(response.errors);
        } else if (response.status == 200) {
          setErrors({});
          setContent('');
          setImage(null);
          setPreviewUrl(undefined);
          router.refresh();
          toast({
            title: 'Success',
            description: response.message,
            className: 'bg-green-500',
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log('There is some error ', err);
      });
  };

  return (
    <div className="mt-5">
      {previewUrl ? <ImagePreviewCard image={previewUrl} callback={removePreviewImg} /> : <></>}
      <div className="flex justify-start items-start space-x-4">
        <UserAvatar name={data?.user?.name! ?? "T"} image="" />
        <textarea
          className="w-full h-24 text-md p-2 bg-muted outline-none resize-none rounded-lg placeholder:font-normal"
          placeholder='Post something amazing...'
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
      </div>
      <span className="text-red-400 font-bold ml-14">{errors.content}</span>
      <div className="mt-2 ml-14 flex justify-between items-center">
        <input type="file" ref={imageRef} className="hidden" onChange={handleImageChange} />
        <Image height={20} width={20} className="cursor-pointer" onClick={handleClick} />
        <Button size="sm" disabled={content?.length < 3 || loading ? true : false} onClick={submit}>
          Post
        </Button>
      </div>
    </div>
  );
}

export default AddThreads;
