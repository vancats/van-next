import { NextResponse } from "next/server";

export async function GET() {
  console.log("GET /api/time");
  return NextResponse.json({ data: new Date().toLocaleTimeString() });
}
