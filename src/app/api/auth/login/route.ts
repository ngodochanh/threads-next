import { CustomErrorReporter } from '@/validation/CustomErrorReporter';
import { loginSchema } from '@/validation/registerSchema';
import vine, { errors } from '@vinejs/vine';
import { NextRequest, NextResponse } from 'next/server';
import { compareSync } from 'bcryptjs';
import prisma from '@/DB/db.config';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    vine.errorReporter = () => new CustomErrorReporter();
    const validator = vine.compile(loginSchema);
    const payload = await validator.validate(data);

    // * Kiểm tra email đã tồn tại trong db chưa?
    const findUser = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!findUser) {
      return NextResponse.json({
        status: 400,
        errors: {
          email: 'No Account found with this email.',
        },
      });
    }

    // * Kiểm tra password đã tồn tại trong db chưa?
    const checkPassword = compareSync(payload.password, findUser.password!);

    if (checkPassword) {
      return NextResponse.json({ status: 200, message: 'User logged in successfully!!' });
    }

    return NextResponse.json({ status: 400, errors: { email: 'Invalid credentials' } });
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json({ status: 400, errors: error.messages });
    }
  }
}
