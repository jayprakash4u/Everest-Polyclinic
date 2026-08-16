import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { getHomeSettings, saveHomeSettings } from "@/lib/data/homeSettings";
import { HOME_SETTING_DEFAULTS } from "@/constants/homeSectionDefaults";

export async function GET() {
  const { response } = await requireAdminSession();
  if (response) return response;

  try {
    const settings = await getHomeSettings(HOME_SETTING_DEFAULTS);
    return NextResponse.json({ settings, defaults: HOME_SETTING_DEFAULTS });
  } catch (error) {
    console.error("[api/admin/home-settings]", error);
    return NextResponse.json(
      { error: "Unable to load these settings right now." },
      { status: 500 },
    );
  }
}

export async function PUT(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = await request.json();
  const incoming = body.settings;

  if (!incoming || typeof incoming !== "object") {
    return NextResponse.json(
      { error: "Expected a settings object." },
      { status: 400 },
    );
  }

  /* Only keys with a shipped default are writable, so a stray key from the
     client can't quietly create a setting nothing reads. */
  const allowed = Object.keys(HOME_SETTING_DEFAULTS);
  const values = Object.fromEntries(
    Object.entries(incoming).filter(([key]) => allowed.includes(key)),
  );

  if (Object.keys(values).length === 0) {
    return NextResponse.json(
      { error: "Nothing recognisable to save." },
      { status: 400 },
    );
  }

  try {
    await saveHomeSettings(values);
    const settings = await getHomeSettings(HOME_SETTING_DEFAULTS);
    return NextResponse.json({ settings, defaults: HOME_SETTING_DEFAULTS });
  } catch (error) {
    console.error("[api/admin/home-settings]", error);
    return NextResponse.json(
      { error: "Unable to save these settings right now." },
      { status: 500 },
    );
  }
}
