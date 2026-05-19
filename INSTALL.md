# 安装和运行指南

## 📋 前提条件

在开始之前，请确保您的系统已安装以下软件：

### 1. 安装 Node.js

#### Windows 系统：

1. 访问 Node.js 官网：https://nodejs.org/
2. 下载 LTS（长期支持）版本
3. 运行下载的安装程序
4. 按照安装向导完成安装
5. 验证安装：
   ```bash
   node -v
   npm -v
   ```

#### 如果已经安装但命令不识别：

- 重启命令行或 PowerShell
- 如果仍不识别，需要添加 Node.js 到系统环境变量 PATH

## 🚀 安装步骤

### 步骤 1：打开项目目录

```bash
cd d:\web\web-project\anxiety_diagnosis
```

### 步骤 2：安装依赖

在项目根目录执行：

```bash
npm install
```

这将安装以下依赖包：
- vue@^3.4.0
- vue-router@^4.2.5
- pinia@^2.1.7
- ant-design-vue@^4.1.0
- @ant-design/icons-vue@^7.0.1
- html2canvas@^1.4.1

安装时间：约 2-5 分钟（取决于网络速度）

### 步骤 3：启动开发服务器

```bash
npm run dev
```

成功启动后，您会看到类似输出：

```
  VITE v5.0.0  ready in 1234 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### 步骤 4：访问应用

打开浏览器，访问：http://localhost:3000

## 📦 构建生产版本

### 构建

```bash
npm run build
```

构建完成后，会在 `dist` 目录生成生产文件。

### 本地预览生产构建

```bash
npm run preview
```

## 🔧 常见问题

### 问题 1：npm install 失败

**错误信息**：网络超时、连接失败等

**解决方案**：

1. 使用国内镜像源：
   ```bash
   npm config set registry https://registry.npmmirror.com
   npm install
   ```

2. 清除缓存后重试：
   ```bash
   npm cache clean --force
   npm install
   ```

### 问题 2：端口 3000 被占用

**解决方案**：

修改 `vite.config.js` 中的端口号：

```javascript
server: {
  port: 3001,  // 改为其他端口
  open: true
}
```

### 问题 3：浏览器显示空白页

**可能原因**：
- JavaScript 错误
- 路由配置问题

**解决方案**：
1. 打开浏览器开发者工具（F12）
2. 查看 Console 中的错误信息
3. 检查是否有红色错误提示

### 问题 4：样式显示异常

**解决方案**：
1. 清除浏览器缓存（Ctrl + Shift + Delete）
2. 硬刷新页面（Ctrl + F5）
3. 检查是否正确安装了 ant-design-vue

## 💡 使用技巧

### 1. 答题过程中

- 可以随时关闭页面，下次打开会自动恢复进度
- 使用答题卡可以快速跳转到任意题目
- 建议找个安静的环境，放松心情作答

### 2. 查看结果后

- 可以导出 PNG 格式的报告保存
- 建议定期测试，追踪焦虑变化趋势
- 如有疑虑，请及时咨询专业人士

### 3. 数据管理

- 所有数据存储在浏览器本地
- 清除浏览器缓存会删除所有数据
- 不同浏览器之间的数据不互通

## 🌐 浏览器兼容性

推荐使用以下浏览器：

- ✅ Chrome 90+
- ✅ Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ⚠️ IE 不支持

## 📱 移动端使用

本应用支持移动端访问：

1. 在手机浏览器输入电脑 IP 地址（需同一局域网）
   ```
   http://[电脑IP]:3000
   ```

2. 或使用内网穿透工具将服务暴露到公网

## 🎯 部署上线

### 部署到静态托管服务

本项目是纯前端应用，可部署到：

1. **Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify**
   ```bash
   npm install -g netlify-cli
   netlify deploy
   ```

3. **GitHub Pages**
   - 构建项目：`npm run build`
   - 将 dist 目录推送到 GitHub 仓库的 gh-pages 分支

### 部署到自己的服务器

1. 构建项目：`npm run build`
2. 将 `dist` 目录上传到服务器
3. 配置 Nginx 或 Apache 指向该目录

Nginx 配置示例：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 📞 获取帮助

如遇到其他问题：

1. 查看项目的 README.md 文件
2. 检查 package.json 中的依赖版本
3. 尝试删除 node_modules 后重新安装
   ```bash
   rm -rf node_modules
   npm install
   ```

## 🎉 开始使用

一切准备就绪！祝您使用愉快！

记住：这只是一个自我评估工具，不能替代专业医疗诊断。如有需要，请及时就医。
