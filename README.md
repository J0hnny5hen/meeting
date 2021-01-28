# meeting

一个视频会议场景demo

## 前提

电脑上需要安装以下工具

- Homebrew
- Git
- Node.js
- yarn
- Visual Studio Code

## 快速开始

提供`.env`文件，配置项参考`.env.example`文件。使用以下指令快速在本地开启项目，本地可以打开浏览器，输入`localhost:8090`预览项目。

```bash
yarn start
```

使用以下指令可以进行构建

```bash
# 正常构建
yarn build
# 开启构建分析
yarn build:analyze
```

## 项目设计

`src` 文件夹中，有以下目录：

### config

`config`文件夹定义了项目启动所需要的环境变量，还有在`window`对象上提供给 `rxdb` `mock` 用的 `node` 环境对象。

### core

`core` 文件夹对一些核心的类进行了实例化，包括 `ajax`，对各类请求的调度对象`processor`。

### declare

`declare` 文件夹提供了类型声明文件，项目的任何地方可以通过 `import {} from '@declare` 的方式导入类型定义.

### model

`model` 中定义了数据库相关的类型实体，和数据库相关`collection`做了一层绑定，为视图层提供了`observable`的数据。

### proxy

`proxy` 层对请求做了层代理，包括请求的优先级、请求完成后对数据库层的操作。未来最好也将`rtc`调用相关的逻辑拆解成`operation`的方式，和数据库进行绑定，响应到视图层。

### service

`service` 中定义了各类核心类，如`Processor`, `Operation`，对数据库层做了配置。

### tool

`tool` 中提供了全局公用的工具方法和类.

### ui

`ui` 中定义了展示逻辑，`shared-store`中提供了视图层公用的数据变量。

## 项目中用到的技术

- rxdb
- rxjs
- React
- React Router
- Mbox
- Webpack
- dot-env(加载环境变量到process.env中)
