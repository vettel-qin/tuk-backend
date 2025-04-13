const { ChatPromptTemplate } = require("@/langchain/core/prompts");
const { InMemoryChatMessageHistory } = require("@/langchain/core/chat_history");
const { RunnableWithMessageHistory } = require("@/langchain/core/runnables");

class BaseModelProvider {
  static sessionIdHistoriesMap = {};

  static answerContentToText(content) { // 将回答内容转换为文本
    if(typeof content === "string") {
        return content;
    }

    if(!content || !Array.isArray(content)) {
        return "";
    }

    return content.map((c) => c?.type === "text" ? c.text : "").filter(Boolean).join("");
  }

  async getModel() { // 获取模型
    if(!this.model) {
        this.model = await this.createModel(); // 创建模型
    }

    return this.model;
  }

  createPrompt(options) { // 创建提示
    const { useHistory = true } = options ?? {};
    const prompt = ChatPromptTemplate.fromMessages([
        useHistory ? new MessagesPlaceholder("history") : "",
        HumanMessagePromptTemplate.fromTemplate("{input}"), // 人类提示模板
    ].filter(Boolean)); // 这个方法会过滤掉数组中的假值（如空字符串、null、undefined 等），然后返回一个新的数组。

    return prompt;

  }

  async getHistory(sessionId, appendHistoryMessage) { // 获取历史记录
    if(BaseModelProvider.sessionIdHistoriesMap[sessionId] === undefined) { // 如果历史记录不存在
       const messageHistory = new InMemoryChatMessageHistory(); // 创建内存聊天消息历史记录

       if(appendHistoryMessage && appendHistoryMessage.length > 0) { // 如果有历史记录
          await messageHistory.addMessage(appendHistoryMessage); // 添加历史记录
       }

       BaseModelProvider.sessionIdHistoriesMap[sessionId] = messageHistory; // 将历史记录添加到历史记录映射中
    }
    return BaseModelProvider.sessionIdHistoriesMap[sessionId]; // 返回历史记录
  }

  createRunnableWithMessageHistory(chain, historyMessage) { // 创建带有消息历史记录的可运行对象
    return new RunnableWithMessageHistory({
      runnable: chain, // 可运行对象
      getMessageHistory: async (sessionId) => { // 获取消息历史记录
        return await this.getHistory(sessionId, historyMessage); // 获取历史记录
      },
      inputMessagekey: "input", // 输入消息键
      historyMessageKeys: ["history"], // 历史消息键
    })
  }

  async createRunnable(options) { // 创建可运行对象
    const { useHistory = true, historyMessages = [], signal } = options?? {};
    const model = await this.getModel(); // 获取模型
    const prompt = this.createPrompt({ useHistory }); // 创建提示
    const chain = prompt.pipe(signal ? model.bind({ signal }) : model); // 创建链

    return useHistory ? await this.createRunnableWithMessageHistory(chain, historyMessages || []) : chain; // 如果使用历史记录，则创建带有消息历史记录的可运行对象，否则创建普通的可运行对象
  }

  async createStructuredOutputRunnable(options) { // 
    const { useHistory = true, historyMessages = [] } = options ?? {};
    const model = await this.getModel(); // 获取模型
    const prompt = this.createPrompt({ useHistory }); // 创建提示
    const chain = prompt.pipe(model); // 创建链
    return useHistory? await this.createRunnableWithMessageHistory(chain, historyMessages || []) : chain; // 如果使用历史记录，则创建带有消息历史记录的可运行对象，否则创建普通的可运行对象
  }
}

module.exports = {
  BaseModelProvider
};