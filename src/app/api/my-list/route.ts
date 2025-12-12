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
      .from("user_lists")
      .select("*")
      .eq("user_id", userId)
      .order("added_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching user list:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch user list" },
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
      anime_type,
      anime_rating,
      anime_episodes,
    } = body;

    const { data, error } = await supabase
      .from("user_lists")
      .insert({
        user_id: userId,
        anime_id,
        anime_title,
        anime_poster,
        anime_type,
        anime_rating,
        anime_episodes,
      })
      .select();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { success: false, error: "Already in your list" },
          { status: 400 }
        );
      }
      throw error;
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error adding to list:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add to list" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    const userId = await getOrCreateUserId();

    const { searchParams } = new URL(request.url);
    const anime_id = searchParams.get("anime_id");

    if (!anime_id) {
      return NextResponse.json(
        { success: false, error: "anime_id required" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("user_lists")
      .delete()
      .eq("user_id", userId)
      .eq("anime_id", anime_id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing from list:", error);
    return NextResponse.json(
      { success: false, error: "Failed to remove from list" },
      { status: 500 }
    );
  }
}