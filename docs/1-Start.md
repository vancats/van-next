# 启动
- 开启生产性能分析
  - npx next build --profile
  - "build": "next build --profile"
  - npm run build -- --profile
- npx next build --debug

# 路由
> https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a0551d59d32b486e8f869e0e6ca8f157~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1600&h=641&s=327102&e=png&b=1c1c1c

## 路由类型
- layout: 保持状态
- template: 不保持状态  https://juejin.cn/post/7343569488744300553
- loading: async 包裹 / use 函数
- error: global-error 解决顶层报错问题
- not-fount: 放在顶层修改默认 404 页面,放在子文件夹中,只能手动调用 notFound 方法

## 链接
- Link: 可以实现 prefetching 和动态导航
  - usePathname 路径名
  - useSearchParams 页面参数
- useRouter: 仅客户端
- redirect: 仅服务端
