type AuthStateType = {
  email?: string;
  name?: string;
  username?: string;
  password?: string;
  password_confirmation?: string;
};

type AuthErrorType = {
  email?: string;
  name?: string;
  username?: string;
  password?: string;
};

type PostErrorType = {
  content?: string;
};

type PostType = {
  id: number;
  user_id: number;
  content: string;
  image?: string;
  comment_count: number;
  likes_count: number;
  created_at: string;
  user: UserType;
  Likes: Array<PostLikeType> | [];
};

type UserType = {
  id: number;
  name: string;
  username: string;
  email?: string;
  image?: string;
};

type CommentType = {
  id: number;
  user_id: number;
  post_id: number;
  content: string;
  created_at: string;
  user: UserType;
};

type ShowUserType = {
  id: number;
  name: string;
  email: string;
  username: string;
  image: string;
  Post: Array<PostType> | [];
  Comment: Array<CommentType> | [];
};

type NotificationType = {
  id: number;
  user_id: number;
  content: string;
  toUser_id: number;
  created_at: string;
  user: UserType;
};

type LikeType = {
  post_id: string;
  toUserId: string;
  status: string;
};

type PostLikeType = {
  id: number;
  post_id: number;
  user_id: number;
};