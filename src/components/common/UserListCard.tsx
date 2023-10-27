import Link from 'next/link';
import UserAvatar from './UserAvatar';
import { Button } from '../ui/button';

function UserListCard({user} : {user: UserType}) {
  return (
    <div className="w-full shadow-sm p-4 rounded-md mb-3">
      <div className="flex">
        <UserAvatar name={user.name} image={user.image} />
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col">
            <strong className="text-md font-bold ml-2">{user.name}</strong>
            <span className="ml-2 font-light text-xs">@{user.username}</span>
          </div>

          <Link href={`/user/${user.id}`}>
            <Button size="sm">View</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserListCard;
