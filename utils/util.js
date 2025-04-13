module.exports = {
    /**
    * 工具函数
    * @param {*} ctx 上下文对象
    * @param {*} data 返回结果
    * @param {*} code 返回状态码
    */

  success(ctx, data = '', code = 0) {
    ctx.body = {
      code,
      data,
      message: "success"
    }
  },

  /**
   * 接口失败输出
   * @param {*} ctx 上下文对象
   * @param {*} message 返回信息
   * @param {*} code 返回状态码
   */
  fail(ctx, message = '', code = -1, data = '') {
    ctx.body = {
      code,
      data,
      message,
    };
  },
}