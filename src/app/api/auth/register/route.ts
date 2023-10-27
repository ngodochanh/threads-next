import { CustomErrorReporter } from '@/validation/CustomErrorReporter';
import { registerSchema } from '@/validation/registerSchema';
import vine, { errors } from '@vinejs/vine';
import { NextRequest, NextResponse } from 'next/server';
import { genSaltSync, hashSync } from 'bcryptjs';
import prisma from '@/DB/db.config';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    vine.errorReporter = () => new CustomErrorReporter();
    const validator = vine.compile(registerSchema);
    const payload = await validator.validate(data);

    // * Kiểm tra email đã tồn tại trong db chưa?
    const isEmailExist = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (isEmailExist) {
      return NextResponse.json({
        status: 400,
        errors: {
          email: 'Email Already taken. Please use another email',
        },
      });
    }

    // * Kiểm tra username đã tồn tại trong db chưa?
    const isUsernameExist = await prisma.user.findUnique({
      where: {
        username: payload.username,
      },
    });

    if (isUsernameExist) {
      return NextResponse.json({
        status: 400,
        errors: {
          username: 'Username Already taken. Please use another us',
        },
      });
    }

    // * Để băm (hash) mật khẩu
    const salt = genSaltSync(10);
    payload.password = hashSync(payload.password, salt);

    // * Chèn bản ghi vào DB
    await prisma.user.create({
      data: payload,
    });

    return NextResponse.json({ status: 200, message: 'Account created successfully!' });
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json({ status: 400, errors: error.messages });
    }
  }
}
