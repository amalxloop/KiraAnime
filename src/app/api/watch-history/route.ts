import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

async function getOrCreateUserId(): Promise<string> {
  const cookieStore = await cookies();
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (user) return user.id;
  
  let guestId = cookieStore.get("guest_user_id")?.value;
  if (!guestId) {
    guestId = uuidv4();
  }
  
  return guestId;
}

async function setGuestCookie(userId: string) {
  const cookieStore = await cookies();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    cookieStore.set("guest_user_id", userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
  }
}

export async function GET() {
  try {
    const supabase = await createClient();
    const userId = await getOrCreateUserId();
    await setGuestCookie(userId);

    const { data, error } = await supabase
      .from("watch_history")
      .select("*")
      .eq("user_id", userId)
      .order("watched_at", { ascending: false })
      .limit(10);

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching watch history:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch watch history" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const userId = await getOrCreateUserId();
    await setGuestCookie(userId);

    const body = await request.json();
    const {
      anime_id,
      anime_title,
      anime_poster,
      episode_id,
      episode_number,
      progress_seconds,
      duration_seconds,
    } = body;

    const { data, error } = await supabase
      .from("watch_history")
      .upsert(
        {
          user_id: userId,
          anime_id,
          anime_title,
          anime_poster,
          episode_id,
          episode_number,
          progress_seconds,
          duration_seconds,
          watched_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id,anime_id,episode_id",
        }
      )
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error saving watch history:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save watch history" },
      { status: 500 }
    );
  }
}