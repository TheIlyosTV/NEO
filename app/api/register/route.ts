import { NextResponse } from "next/server";

// Request turini aniq ko'rsatamiz
export async function POST(request: Request) {
  const { name, email, password } = await request.json();
  // Ro‘yxatdan o‘tish logikasini qo‘shing (masalan, bazaga saqlash)
  if (!name || !email || !password) {
    return NextResponse.json({ message: "Barcha maydonlar to‘ldirilishi kerak" }, { status: 400 });
  }
  // Misol: Muvaffaqiyatli ro‘yxatdan o‘tishni simulyatsiya qilish
  return NextResponse.json({ message: `Xush kelibsiz, ${name}! Hisobingiz yaratildi.` }, { status: 200 });
}