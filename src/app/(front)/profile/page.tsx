import { CustomSession, authOptions } from '@/app/api/auth/[...nextauth]/options';
import UserProfileAvatar from '@/components/common/UserProfileAvatar';
import { getServerSession } from 'next-auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getUserComments, getUserPosts } from '@/lib/serverMethods';
import PostCard from '@/components/common/PostCard';
import DynamicNavBar from '@/components/common/DynamicNavBar';
import CommentCard from '@/components/common/CommentCard';

async function Profile() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const posts: Array<PostType> | [] = await getUserPosts();
  const comments: Array<CommentType> | [] = await getUserComments();

  return (
    <div>
      <DynamicNavBar title="Profile" />

      <div className="mt-5 flex items-center space-x-4">
        <UserProfileAvatar name="Tushar" />

        <div className="">
          <h1 className="text-2xl font-bold">{session?.user?.name}</h1>
          <p className="text-md text-orange-300">@{session?.user?.username}</p>
          <h1 className="text-xl">{session?.user?.email}</h1>
        </div>
      </div>

      <div className="mt-7">
        <Tabs defaultValue="post">
          <TabsList className="w-full">
            <TabsTrigger value="post" className="w-full">
              Post
            </TabsTrigger>
            <TabsTrigger value="comment" className="w-full">
              Comment
            </TabsTrigger>
          </TabsList>
          <TabsContent value="post">
            {posts && posts.length < 1 && <h1 className="text-center font-bold text-xl mt-5">No Post found</h1>}
            {posts && posts.length > 0 && posts.map((item) => <PostCard post={item} key={item.id} isAuthCard={true} />)}
          </TabsContent>
          <TabsContent value="comment">
            {comments && comments.length < 1 && (
              <h1 className="text-center font-bold text-xl mt-5">No Comment found</h1>
            )}
            {comments &&
              comments.length > 0 &&
              comments.map((item) => <CommentCard comment={item} key={item.id} isAuthCard={true} />)}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Profile;
