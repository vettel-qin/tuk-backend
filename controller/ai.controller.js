const { success, fail } = require('../utils/util');

module.exports = {
  async codeGenerate(ctx) {
    const { message } = ctx.request.body; // 从请求体中解构获取 message
    console.log("Received message:", message); // 打印接收到的数据
    if (!message) {
      return fail(ctx, '请输入提示词', -1);
    }

    try {
      // Log the request for debugging
      console.log("Request received:", ctx.request);

      // Send a response
      ctx.body = {
        code: 0,
        message: "Success",
        data: {
          /* your response data */
        },
      };
    } catch (error) {
      console.error("Error:", error);
      ctx.status = 500;
      ctx.body = {
        code: -1,
        message: error.message || "Internal server error",
        data: null,
      };
    }
  },
};
