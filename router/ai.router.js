const Router = require("@koa/router");
const ai = require("../controller/ai.controller");

const router = new Router({ prefix: "/api/ai" });

// 項目配置
router.post("/lib/chat", ai.codeGenerate);

module.exports = router;
