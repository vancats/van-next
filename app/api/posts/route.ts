import { NextRequest, NextResponse } from "next/server";
import { RateLimiter } from "limiter";
// 限制请求次数，每分钟最多3次
const limiter = new RateLimiter({
  tokensPerInterval: 3,
  interval: "min",
  fireImmediately: true,
});

export async function GET() {
  const remainingRequests = await limiter.removeTokens(1);
  if (remainingRequests < 0) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "Too Many Requests" }),
      { status: 429, headers: { "content-type": "application/json" } }
    );
  }

  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();

  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const article = await request.json();

  // 访问 /home?name=lee
  // const pathname = request.nextUrl.pathname; // /home
  // const searchParams = request.nextUrl.searchParams; // { name: "lee" }

  return NextResponse.json(
    {
      id: Math.random().toString(36).slice(-8),
      data: article,
    },
    { status: 201 }
  );
}
