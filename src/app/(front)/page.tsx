import Image from 'next/image';
import AddThreads from '@/components/threads/AddThreads';
import PostCard from '@/components/common/PostCard';
import { getPosts } from '@/lib/serverMethods';

export default async function Home() {
  const posts: Array<PostType> | [] = await getPosts();
  return (
    <>
      <div className="flex justify-center items-center">
        <Image src="/images/logo.svg" width={40} height={40} alt="Logo" className="hidden md:block" />
      </div>
      <AddThreads />

      <div className="mt-5">
        {posts.map((item) => (
          <PostCard post={item} key={item.id} />
        ))}
      </div>
    </>
  );
}
