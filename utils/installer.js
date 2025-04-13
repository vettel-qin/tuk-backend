const fs = require("node:fs");
const path = require("node:path");
/**
 * 路由自动注册
 */

const routerInstaller = (app) => {
  const exclude = []; // 排除文件
  const routerdir = path.resolve(__dirname, "../router"); // 路由目录
  const routers = fs.readdirSync(path.resolve(routerdir), {
    encoding: "utf-8",
  }); // 读取路由目录下的文件

  const includes = routers.filter((i) => exclude.indexOf(i) === -1);

  console.log("includes", includes);

  includes.forEach((i) => {
    app.use(require(`${routerdir}/${i}`).routes());
    app.use(require(`${routerdir}/${i}`).allowedMethods());
  });
};

module.exports = {
  routerInstaller,
};
