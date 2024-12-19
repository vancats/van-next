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
