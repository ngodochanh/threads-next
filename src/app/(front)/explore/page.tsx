import DynamicNavBar from '@/components/common/DynamicNavBar';
import UserListCard from '@/components/common/UserListCard';
import ExploreSearchBar from '@/components/explore/ExploreSearchBar';
import { exploreUsers } from '@/lib/serverMethods';

async function Explore({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const users: Array<UserType> | [] = await exploreUsers(searchParams?.query!);
  return (
    <div>
      <DynamicNavBar title="Explore" />
      <ExploreSearchBar />

      <div className="mt-5">
        {users && users.length > 0 && users.map((item) => <UserListCard user={item} key={item.id} />)}
        {users && users.length < 1 && searchParams?.query?.length! > 0 && (
          <h1 className="text-xl font-bold text-center">No user found with current name</h1>
        )}
      </div>
    </div>
  );
}

export default Explore;
