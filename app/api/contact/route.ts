import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Este endpoint reemplaza los formularios nativos de Framer (que dependen
// de la infraestructura de Framer/Google y no cargan bien en China).
// Envía el email directamente via SMTP, usando cualquier proveedor
// que funcione dentro de China (ej. Tencent Exmail, Alibaba DirectMail,
// tu propio servidor SMTP, o incluso Gmail SMTP si el servidor corre fuera de China).
//
// Configura estas variables en tu archivo .env (ver .env.example):
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_TO_EMAIL ?? 'shiningtigers@gmail.com',
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
