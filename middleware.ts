import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = ["https://acme.com", "https://my-app.org"];

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// 鉴权判断
function isAuthenticated(request: NextRequest) {
  console.log("request: ", request);
  return true;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(pathname);
  // GET /_next/data/build-id/hello.json
  // 如果设置 skipMiddlewareUrlNormalize 为 true，值为：/_next/data/build-id/hello.json
  // 如果没有配置，值为： /hello
  if (!isAuthenticated(request)) {
    // 返回错误信息
    return new NextResponse(
      JSON.stringify({ success: false, message: "authentication failed" }),
      { status: 401, headers: { "content-type": "application/json" } }
    );
  }
  if (request.nextUrl.pathname.startsWith("/blog")) {
    return NextResponse.redirect(
      new URL("/blog/vancats_middleware", request.url)
    );
  }

  const response = handleHeaders(request);
  handleCookie(request, response);
  handleCORS(request, response);
  return response;
}

function handleHeaders(request: NextRequest) {
  //  clone 请求标头
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-hello-from-middleware1", "hello");

  // 直接返回一个 Response 实例,以便在下个逻辑中继续使用
  const response = NextResponse.next({
    request: {
      // 设置新请求标头
      headers: requestHeaders,
    },
  });

  // 设置新响应标头 `x-hello-from-middleware2`
  response.headers.set("x-hello-from-middleware2", "hello");
  return response;
}

function handleCookie(request: NextRequest, response: NextResponse) {
  // 假设传入的请求 header 里 "Cookie:nextjs=fast"
  let cookie = request.cookies.get("nextjs");
  console.log(cookie); // => { name: 'nextjs', value: 'fast', Path: '/' }
  const allCookies = request.cookies.getAll();
  console.log(allCookies); // => [{ name: 'nextjs', value: 'fast' }]

  request.cookies.has("nextjs"); // => true
  request.cookies.delete("nextjs");
  request.cookies.has("nextjs"); // => false

  // 设置 cookies
  response.cookies.set("vercel", "fast");
  response.cookies.set({ name: "vercel", value: "fast", path: "/" });
  cookie = response.cookies.get("vercel");
  console.log(cookie); // => { name: 'vercel', value: 'fast', Path: '/' }
}

function handleCORS(request: NextRequest, response: NextResponse) {
  // Check the origin from the request
  const origin = request.headers.get("origin") ?? "";
  const isAllowedOrigin = allowedOrigins.includes(origin);

  // Handle preflighted requests
  const isPreflight = request.method === "OPTIONS";

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
}

// 设置匹配路径
export const config = {
  matcher: ["/about/:path*", "/blog/vancats"],
};
