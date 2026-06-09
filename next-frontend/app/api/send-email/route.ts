import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { firstName, lastName, email, subject, message } = await request.json();

  if (!firstName || !lastName || !email || !subject || !message) {
    return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      replyTo: String(email),
      to: process.env.RECEIVER_EMAIL,
      subject: `Contact Form Submission: ${subject}`,
      text: `You have a new message from ${firstName} ${lastName} (${email}):\n\n${message}`,
    });

    return NextResponse.json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email.' }, { status: 500 });
  }
}
