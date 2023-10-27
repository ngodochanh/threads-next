import { getServerSession } from 'next-auth';
import { CustomSession, authOptions } from '../auth/[...nextauth]/options';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/DB/db.config';

export async function POST(request: NextRequest) {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ status: 401, message: 'Un-Authorized' });
  }

  const payload: LikeType = await request.json();

  if (!payload.post_id || !payload.toUserId) {
    return NextResponse.json({ status: 400, message: 'Bad Request' });
  }

  // thêm thông báo
  if (payload.status == '1') {
    await prisma.notification.create({
      data: {
        user_id: Number(session?.user?.id),
        toUser_id: Number(payload.toUserId),
        content: 'Liked your post!',
      },
    });

    // * tăng số lượt thích cho bài viết
    await prisma.post.update({
      where: {
        id: Number(payload.post_id),
      },
      data: {
        likes_count: {
          increment: 1,
        },
      },
    });

    // * thêm mục vào bảng 'Like'.
    await prisma.likes.create({
      data: {
        post_id: Number(payload.post_id),
        user_id: Number(session?.user?.id),
      },
    });
  } else if (payload.status == '0') {
    // * giảm số lượt thích cho bài viết
    await prisma.post.update({
      where: {
        id: Number(payload.post_id),
      },
      data: {
        likes_count: {
          decrement: 1,
        },
      },
    });

    // * xóa các bản ghi trong bảng 'likes'
    await prisma.likes.deleteMany({
      where: {
        post_id: Number(payload.post_id),
        user_id: Number(session?.user?.id),
      },
    });
  }

  return NextResponse.json({
    status: 200,
    message: payload.status === '1' ? 'Post Liked successfully!' : 'Post Disliked successfully!',
  });
}
