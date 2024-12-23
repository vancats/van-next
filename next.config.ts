import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/blog/vancats",
        destination: "/blog/vancats_redirects",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/blog/vancats",
          destination: "/blog/vancats_beforeFiles",
        },
      ],
      afterFiles: [
        {
          source: "/blog/vancats",
          destination: "/blog/vancats_afterFiles",
        },
      ],
      fallback: [
        {
          source: "/blog/vancats",
          destination: `/blog/vancats_fallback`,
        },
      ],
    };
  },
  // 跳过尾部斜杠重定向,不会自动删除斜杠
  skipTrailingSlashRedirect: true,
  // 可以获取路由原始的地址，常用于国际化场景
  skipMiddlewareUrlNormalize: true,
};

export default nextConfig;
