import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import  getConnection  from '@/lib/db'; // Assuming your db connection is in lib/db.ts

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json({ message: 'Barcha maydonlar to\'ldirilishi kerak' }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ message: 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak' }, { status: 400 });
  }

  try {
    const connection = await getConnection();

    // Foydalanuvchi nomi yoki email allaqachon mavjudligini tekshirish
    const [existingUsers] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      connection.release();
      return NextResponse.json({ message: 'Bu email allaqachon ro\'yxatdan o\'tgan' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await connection.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    connection.release();

    if (result && 'insertId' in result) {
      return NextResponse.json({ message: `Xush kelibsiz, ${name}! Hisobingiz muvaffaqiyatli yaratildi.` }, { status: 201 });
    } else {
      return NextResponse.json({ message: 'Ro\'yxatdan o\'tishda xatolik yuz berdi' }, { status: 500 });
    }
  } catch (error) {
    console.error('Ro\'yxatdan o\'tishda xatolik:', error);
    return NextResponse.json({ message: 'Serverda xatolik yuz berdi' }, { status: 500 });
  }
}