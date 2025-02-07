# 启动
- 开启生产性能分析
  - npx next build --profile
  - "build": "next build --profile"
  - npm run build -- --profile
- npx next build --debug

# 路由
> https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a0551d59d32b486e8f869e0e6ca8f157~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1600&h=641&s=327102&e=png&b=1c1c1c

## 类型
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

## 不同路由
- 动态路由
  - [folderName]: 通过 params 传给布局 页面 路由处理程序和 generateMetadata 函数
  - [...folderName]: 捕获后面所有的路由片段
  - [[...folderName]]: 捕获所有路由片段,包括不带参数的路由
- 路由组`(folderName)`: 按站点、意图、团队等将路由分组 / 在同一层级中创建多个布局
- 平行路由`@folderName`
  - 定义插槽,例如`/page.js`的语法糖就是`/@children/page.js`
  - 为他们自身定义独立的错误处理和加载页面
  - 可以添加子导航也就是子页面
  - default.js
    - 软导航下会部分渲染,只更新插槽的内容
    - 硬导航下,在平行路由的子导航页面,因为其他的插槽内容不匹配了,会直接渲染 404 错误
- 拦截路由:允许在当前路由拦截其他路由地址并显示为一个 modal

## 处理程序
- Get(request, context)
  - request: 读取 cookies 和处理URL
  - context: 获取当前链接的所有路由参数
- 缓存处理以及路由常见问题 https://juejin.cn/book/7307859898316881957/section/7308914343129645065#heading-12

## 中间件
> 与 page 同级
- 匹配路径
  - 使用 config.matcher
  - 在 middleware 中使用条件语句
- 路由响应执行顺序
  - headers（next.config.js）
  - redirects（next.config.js）
  - 中间件 (rewrites, redirects 等)
  - beforeFiles (next.config.js中的rewrites)
  - 基于文件系统的路由 (public/, _next/static/, pages/, app/ 等)
  - afterFiles (next.config.js中的rewrites)
  - 动态路由 (/blog/[slug])
  - fallback中的 (next.config.js中的rewrites)
- skipMiddlewareUrlNormalize
- skipTrailingSlashRedirect
- 多个中间件时
  - 拆分并使用多个 await
  - 高阶函数或者chain
- 主要在中间件中不能使用 node.js 环境的库,比如 /api/posts/route.ts 中使用的 limiter

# 渲染

## 类型
- CSR: 使用 useEffect hook 或者在客户端使用数据获取的库,如 SWR / TanStack Query
- SSG: 默认就是生成一个 html, 使用 getStaticProps 和 getStaticPaths 在每次构建时获取数据和实际路径
- ISR: Incremental Static Regeneration，增量静态再生;在 getStaticProps 中增加 revalidate,过期后的第一次请求开始构建,第二次请求获取最新数据
- SSR: 服务端渲染,使用 getServerSideProps 在每次请求时获取数据
  - SSR 的数据获取必须在组件渲染之前
  - 组件的 JavaScript 必须先加载到客户端，才能开始水合
  - 所有组件必须先水合，然后才能跟其中任意一个组件交互
- RSC: 在服务端，React 会将其渲染会一个包含基础 HTML 标签和客户端组件占位的树,客户端收到后会根据这个数据重构 React 树，然后用真正的客户端组件填充占位，渲染最终的结果
  - 服务端组件的代码不会打包到客户端代码中，它可以减小包（bundle）的大小
  - 可以直接访问后端资源
  - 不能使用 useEffect 和客户端事件

> SSR 是在服务端将组件渲染成 HTML 发送给客户端，而 RSC 是将组件渲染成一种特殊的格式，我们称之为 RSC Payload。这个 RSC Payload 的渲染是在服务端，但不会一开始就返回给客户端，而是在客户端请求相关组件的时候才返回给客户端，RSC Payload 会包含组件渲染后的数据和样式，客户端收到 RSC Payload 后会重建 React 树，修改页面 DOM。

### SSR步骤
- 服务端获取所有数据
- 服务端渲染 HTML
- 将页面的 HTML、CSS、JavaScript 发送到客户端
- 使用 HTML 和 CSS 生成不可交互的用户界面（non-interactive UI）
- React 对用户界面进行水合（hydrate），使其可交互（interactive UI）

### Suspense
- 使用时,该文件`Transfer-Encoding`的值为 chunked,数据将会分块发送
- 流式渲染 Streaming Server Rendering
  - 从服务器到客户端渐进式渲染 HTML
  - fallback UI 和渲染后的内容都会出现在该 HTML 文件中,请求持续与服务端保持连接,服务端渲染结束将内容追加给客户端,客户端收到后执行类型 $RC 的操作进行DOM替换
- 选择性水合 Selective Hydration
  - React 根据用户交互决定水合的优先级
- SEO
  - 等待 generateMetadata 数据请求结束再将UI流式传输到客户端,所以第一份UI就会包括 head
  - 流式渲染后是会渲染最终结果的,不影响SEO
- 即使是嵌套的 Suspense,没有依赖的话,请求会同时发送
- Streaming
  - 可以减少加载 TTFB FCP TTI
  - 如何实现: loading.tsx(页面级别) Suspense(组件级别)
  - 可以借助路由组实现多个页面共用一个 loading.tsx
- 缺点
  - 真实的JS代码下载没有变少
  - 所有组件必须在客户端水合,对于无交互性的组件不需要
```html
<section style="padding:20px">
  <template id="B:0"></template>
  <p>Loading PostFeed Component</p>
</section>
// ...
<div hidden id="S:0">
  <h1>Hello PostFeed</h1>
</div>
<script>
  // 交换位置
  $RC = function(b, c, e) {
      // ...
  };
  $RC("B:0", "S:0")
</script>
```
