import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim() || null,
        subject: subject?.trim() || null,
        message: message.trim(),
      },
    });

    return NextResponse.json({ ok: true, id: submission.id }, { status: 201 });
  } catch (error) {
    console.error("[api/contact]", error);
    return NextResponse.json(
      { error: "Unable to save your message right now." },
      { status: 500 },
    );
  }
}
