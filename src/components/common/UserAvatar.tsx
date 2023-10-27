import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

function UserAvatar({ name, image }: { name: string; image?: string }) {
  return (
    <Avatar>
      <AvatarImage src={image} />
      <AvatarFallback>{name[0]}</AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;