import UserProfileAvatar from '@/components/common/UserProfileAvatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PostCard from '@/components/common/PostCard';
import DynamicNavBar from '@/components/common/DynamicNavBar';
import CommentCard from '@/components/common/CommentCard';
import { getUser } from '@/lib/serverMethods';

async function ShowUser({ params }: { params: { id: number } }) {
  const user: ShowUserType | null = await getUser(params.id);

  return (
    <div>
      <DynamicNavBar title="Profile" />

      <div className="mt-5 flex items-center space-x-4">
        <UserProfileAvatar name={user?.name!} image="" />

        <div className="">
          <h1 className="text-2xl font-bold">{user?.name}</h1>
          <p className="text-md text-orange-300">@{user?.username}</p>
          <h1 className="text-xl">{user?.email}</h1>
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
            {user?.Post && user?.Post.length < 1 && (
              <h1 className="text-center font-bold text-xl mt-5">No Post found</h1>
            )}
            {user?.Post &&
              user?.Post.length > 0 &&
              user?.Post.map((item) => <PostCard post={item} key={item.id} isAuthCard={true} />)}
          </TabsContent>
          <TabsContent value="comment">
            {user?.Comment && user?.Comment.length < 1 && (
              <h1 className="text-center font-bold text-xl mt-5">No Comment found</h1>
            )}
            {user?.Comment &&
              user?.Comment.length > 0 &&
              user?.Comment.map((item) => <CommentCard comment={item} key={item.id} isAuthCard={true} />)}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default ShowUser;
