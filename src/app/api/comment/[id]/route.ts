import prisma from '@/DB/db.config';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { CustomSession, authOptions } from '../../auth/[...nextauth]/options';

export async function DELETE(request: NextRequest, { params }: { params: { id: number } }) {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ status: 401, message: 'Un-Authorized' });
  }

  const findComment = await prisma.comment.findFirst({
    where: {
      id: Number(params.id),
      user_id: Number(session?.user?.id),
    },
  });

  if (!findComment) {
    return NextResponse.json({ status: 400, message: 'Bad request' });
  }

  await prisma.comment.delete({
    where: {
      id: Number(params.id),
    },
  });

  // Lấy postId của bài đăng liên quan
  const postId = findComment.post_id;

  // Cập nhật comment_count trong bảng Post bằng cách giảm 1
  await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      comment_count: {
        decrement: 1,
      },
    },
  });

  return NextResponse.json({ status: 200, message: 'Comment Deleted successfull!' });
}
