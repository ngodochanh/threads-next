import { NextRequest, NextResponse } from 'next/server';
import { CustomSession, authOptions } from '../auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import vine, { errors } from '@vinejs/vine';
import { CustomErrorReporter } from '@/validation/CustomErrorReporter';
import { postSchema } from '@/validation/postSchema';
import { join } from 'path';
import { writeFile } from 'fs/promises';
import { getRandomNumber } from '@/lib/utils';
import prisma from '@/DB/db.config';
import { imageValidator } from '@/validation/ImageValidator';

export async function GET() {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ status: 401, message: 'Un-Authorized' });
  }

  const posts = await prisma.post.findMany({
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

export async function POST(request: NextRequest) {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ status: 401, message: 'Un-Authorized' });
    }
    const formData = await request.formData();
    const data = {
      content: formData.get('content'),
      image: '',
    };
    vine.errorReporter = () => new CustomErrorReporter();
    const validator = vine.compile(postSchema);
    const payload = await validator.validate(data);

    const image = formData.get('image') as File | null;

    if (image) {
      const isImageNotValid = imageValidator(image.name, image.size);
      if (isImageNotValid) {
        return NextResponse.json({
          status: 400,
          errors: {
            content: isImageNotValid,
          },
        });
      }

      // * tải một hình ảnh
      try {
        const buffer = Buffer.from(await image!.arrayBuffer());
        const uploadDir = join(process.cwd(), 'public', '/uploads');
        const uniqueNmae = Date.now() + '_' + getRandomNumber(1, 999999);
        const imgExt = image.name.split('.');
        const filename = uniqueNmae + '.' + imgExt?.[1];
        await writeFile(`${uploadDir}/${filename}`, buffer);
        data.image = filename;
      } catch (error) {
        return NextResponse.json({
          status: 400,
          message: 'Something went wrong. Please try again later.',
        });
      }
    }

    // * tạo bài viết trong cơ sở dữ liệu
    await prisma.post.create({
      data: {
        content: payload.content,
        user_id: Number(session.user?.id),
        image: data.image ?? null,
      },
    });

    return NextResponse.json({
      status: 200,
      message: 'Post created successfully!',
    });
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json({ status: 400, errors: error.messages });
    }
  }
}
