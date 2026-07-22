import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      email,
      department,
      preferredDate,
      timeSlot,
      packageName,
      packagePrice,
      message,
    } = body;

    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { error: "Name and phone are required." },
        { status: 400 },
      );
    }

    const appointment = await prisma.appointmentRequest.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim() || null,
        department: department?.trim() || null,
        preferredDate: preferredDate ? new Date(preferredDate) : null,
        timeSlot: timeSlot?.trim() || null,
        packageName: packageName?.trim() || null,
        packagePrice: packagePrice?.trim() || null,
        message: message?.trim() || null,
      },
    });

    return NextResponse.json({ ok: true, id: appointment.id }, { status: 201 });
  } catch (error) {
    console.error("[api/appointments]", error);
    return NextResponse.json(
      { error: "Unable to save your appointment request right now." },
      { status: 500 },
    );
  }
}
