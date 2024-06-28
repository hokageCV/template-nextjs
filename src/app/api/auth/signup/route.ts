import { AuthService, DbService } from '@/db/db';
import type { signUpType } from '@/types';
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import validator from 'validator';

export async function POST(req: NextRequest) {

  try {
    const { name, email, password } = await req.json()

    const validity = await validateData({ name, email, password })
    if (!validity.isValid) return NextResponse.json({ error: validity.message }, { status: 400 })

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const userData = await AuthService.signUp({ name, email, password: hashedPassword })

    return NextResponse.json({ message: 'signup successful' }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


async function validateData({ name, email, password }: signUpType) {
  if (!email || !email) return { isValid: false, message: 'all fields must be filled' }
  if (!validator.isEmail(email)) return { isValid: false, message: 'invalid email' }

  const userExists = await DbService.isUserExists(email)
  if (userExists) return { isValid: false, message: 'email already in use' }

  if (!validator.isStrongPassword(password)) return { isValid: false, message: 'weak password' }

  return { isValid: true, message: 'data is valid' }
}
