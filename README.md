# xinhuoH5

> A Vue.js project

### 
**
* 
* 鑫火云贷

安装 vue-cli
```
npm install -g vue-cli
```

安装
```
npm install
```
## 目录结构
```shell
├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令
│   ├── filtres                // 全局filter
│   ├── mock                   // mock数据
│   ├── router                 // 路由
│   ├── store                  // 全局store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── view                   // view
│   ├── App.vue                // 入口页面
│   └── main.js                // 入口 加载组件 初始化等
├── static                     // 第三方不打包资源
│   ├── jquery
│   └── Tinymce                // 富文本
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json

```
启动开发环境
```
npm run dev
```
打包到生产环境
```
npm run build
```

打包到预生产环境
```
npm run buildppe
```


打包到测试产环境
```
 npm run buildtest
```



将第三方资源分离打包，提高打包速度
```
 npm run build:dll
```

```


