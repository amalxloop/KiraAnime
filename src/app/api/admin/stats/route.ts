import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    
    const [watchHistoryCount, userListsCount] = await Promise.all([
      supabase.from("watch_history").select("*", { count: "exact", head: true }),
      supabase.from("user_lists").select("*", { count: "exact", head: true }),
    ]);

    const totalViews = watchHistoryCount.count || 0;
    const totalLists = userListsCount.count || 0;

    return NextResponse.json({
      success: true,
      data: {
        totalViews,
        totalLists,
        activeUsers: 0,
        totalReviews: 0,
      },
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
