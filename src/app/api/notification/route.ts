import { getServerSession } from 'next-auth';
import { CustomSession, authOptions } from '../auth/[...nextauth]/options';
import { NextResponse } from 'next/server';
import prisma from '@/DB/db.config';

export async function GET() {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ status: 401, message: 'Un-Authorized' });
  }

  const notifications = await prisma.notification.findMany({
    where: {
      toUser_id: Number(session.user?.id),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
        }
      }
    }
  });

  return NextResponse.json({ status: 200, data: notifications });
}
