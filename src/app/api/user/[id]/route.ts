import prisma from '@/DB/db.config';
import { NextRequest, NextResponse } from 'next/server';
import { CustomSession, authOptions } from '../../auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ status: 401, message: 'Un-Authorized' });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: Number(params.id),
    },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      Post: {
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
      },
      Comment: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
            },
          },
        },
      },
    },
  });
  return NextResponse.json({ status: 200, data: user });
}
