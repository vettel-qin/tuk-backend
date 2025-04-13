const { BaseModelProvider } = require("../base/BaseModelProvider");
const { ChatZhipuAI } = require("@langchain/community/chat_models/zhipuai");
const { ZHIPU_AI_KEY } = require("../../../../config");

class GlmModelProvider extends BaseModelProvider {
  async createModel() {
    const aikey = ZHIPU_AI_KEY;
    const model_name = 'glm-4';

    const model = new ChatZhipuAI({
      apiKey: aikey,
      model: model_name,
      temperature: 0.95, // 温度
      maxRetries: 3, // 最大重试次数
      verbose: true, // 打印日志
    })

    return model;
  }
}

module.exports = {
  GlmModelProvider
}