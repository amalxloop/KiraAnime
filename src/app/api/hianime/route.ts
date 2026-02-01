import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://ani-api20.vercel.app/api";
const FALLBACK_API = "https://ani-api20.vercel.app/api";

export async function GET(request: NextRequest) {
  const endpoint = request.nextUrl.searchParams.get("endpoint") || "/";
  
  const tryFetch = async (base: string, timeoutMs: number = 15000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    
    try {
      const url = `${base}${endpoint}`;
      const res = await fetch(url, {
        headers: {
          "Accept": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        signal: controller.signal,
        cache: "no-store",
      });
      clearTimeout(timeoutId);
      
      const text = await res.text();
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      
      if (text.startsWith("<!") || text.startsWith("<html") || text.includes("error code:")) {
        throw new Error("Cloudflare blocked request");
      }
      
      try {
        return JSON.parse(text);
      } catch {
        throw new Error("Invalid JSON response");
      }
    } catch (e) {
      clearTimeout(timeoutId);
      throw e;
    }
  };

  try {
    const data = await tryFetch(API_BASE);
    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Range",
      },
    });
  } catch {
    try {
      const data = await tryFetch(FALLBACK_API, 10000);
      return NextResponse.json(data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Range",
        },
      });
    } catch {
      return NextResponse.json(
        { success: false, error: "API unavailable", data: null },
        { 
          status: 503,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Range",
          },
        }
      );
    }
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Range",
    },
  });
}