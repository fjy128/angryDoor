# angryDoor
This is a static resource service

#首先安装辅助工具
---

chalk--控制台打印格式控制:https://www.npmjs.com/package/chalk

supervisor--热更新，实时监测代码变化:https://www.npmjs.com/package/supervisor 
使用supervisor ***.js

handlebars--模版引擎: http://handlebarsjs.com/installation.html

#安装

```
npm i -g angryDoor
```

# 使用方法
```
angryDoor # 把当前文件夹作为静态资源服务器根目录
angryDoor -p 8080 # 设置端口为8080
angryDoor -h localhost #设置host为localhost
angryDoor -d /usr #设置根目录为 /usr
```