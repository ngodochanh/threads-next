import { NextResponse } from 'next/server';
import { CustomSession, authOptions } from '../../auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import prisma from '@/DB/db.config';

export async function GET() {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ status: 401, message: 'Un-Authorized' });
  }

  const posts = await prisma.post.findMany({
    where: {
      user_id: Number(session.user?.id),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
        },
      },
      Likes: {
        take: 1,
        where: {
          user_id: Number(session?.user?.id),
        },
      },
    },
    orderBy: {
      id: 'desc',
    },
  });

  return NextResponse.json({ status: 200, data: posts });
}
