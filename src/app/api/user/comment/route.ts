import { NextResponse } from 'next/server';
import { CustomSession, authOptions } from '../../auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import prisma from '@/DB/db.config';

export async function GET() {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ status: 401, message: 'Un-Authorized' });
  }

  const comments = await prisma.comment.findMany({
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
    },
    orderBy: {
      id: 'desc',
    },
  });

  return NextResponse.json({ status: 200, data: comments });
}
