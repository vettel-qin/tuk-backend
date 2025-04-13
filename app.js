const Koa = require("koa");
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");

const { routerInstaller } = require("./utils/installer");

const app = new Koa();
app.use(
  cors({
    credentials: true, // 允许携带认证信息（如cookies）
    exposeHeaders: ["filename"], // 下载文件时，响应头中包含filename
  })
);

app.use(bodyParser()); // 解析请求体

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.body = {
      code: -1,
      data: "",
      message: error.message,
    };
  }
});

routerInstaller(app);

module.exports = app;
