const { GlmModelProvider } = require('./provider/model/glm');

class AiService {
    async buildGeneratePrompt({message}) { // 构建生成提示
      const codePrompt = `
      您是一位低代码组件开发专家。
      您的任务是帮助我生成低代码开发模块的两个文件：index.jsx 和 config.js。
      index.jsx 文件应使用 React 和 Ant Design 定义组件的结构，而 config.js 文件应指定组件的属性配置。

      以下是一个登录表单组件的示例：
      index.jsx file:
      // jsx
      export default ({ id, type, config, onClick, onDateChange,onTextChange }, ref) => {
        const { useState } = window.React;
        const {
          Button,
          Checkbox,
          ColorPicker,
          DatePicker,
          Form,
          Input,
          InputNumber,
          Radio,
          Select,
          Slider,
          Switch,
        } = window.antd;
        const { RangePicker } = DatePicker;
        const { TextArea } = Input;
        const [dateFormat, setDateFormat] = useState(
          config.props.dateFormat || 'YYYY-MM-DD HH:mm:ss'
        );
        const onDatePickerChange = (date, dateString) => {
          onDateChange && onDateChange(date, dateString, dateFormat);
        };
        const onFinish = (values) => {
          onClick && onClick(values);
        };
        return (
          <div data-id={id} data-type={type}>
            <Form
              labelCol={{ span: config.props.labelCol }}
              wrapperCol={{ span: config.props.wrapperCol }}
              layout={config.props.layout}
              style={{ maxWidth: config.props.maxWidth }}
              onFinish={onFinish}
            >
              <Form.Item label="Checkbox" name="disabled" valuePropName="checked">
                <Checkbox>Checkbox</Checkbox>
              </Form.Item>
              <Form.Item label="Radio">
                <Radio.Group>
                  <Radio value="apple"> Apple </Radio>
                  <Radio value="pear"> Pear </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Input">
                <Input placeholder={config.props.textInput} />
              </Form.Item>
              <Form.Item label="Select">
                <Select>
                  <Select.Option value="demo">Demo</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="DataFormat" name="dateFormat">
                <Input
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="DatePicker">
                <DatePicker onChange={onDatePickerChange} />
              </Form.Item>
              <Form.Item label="RangePicker">
                <RangePicker />
              </Form.Item>
              <Form.Item label="InputNumber">
                <InputNumber placeholder={config.props.numberInput} />
              </Form.Item>
              <Form.Item label="TextArea">
                <TextArea rows={config.props.textAreaRow} showCount={config.props.showCount}  onChange={onTextChange}/>
              </Form.Item>
              <Form.Item label="Switch" valuePropName="checked">
                <Switch />
              </Form.Item>
              <Form.Item label="Button" wrapperCol={{
                  offset: config.props.offset,
                  span: config.props.wrapperCol,
                }}>
                <Button block={config.props.block} type={config.props.btnType}>
                  {config.props.loginBtn}
                </Button>
              </Form.Item>
              <Form.Item label="Slider">
                <Slider />
              </Form.Item>
              <Form.Item label="ColorPicker">
                <ColorPicker />
              </Form.Item>
            </Form>
          </div>
        );
      };

      config.js file:
      // config.js
      export default {
        // 组件属性配置JSON
        attrs: [
          {
            type: 'Title',
            label: '基础设置',
            key: 'basic',
          },
          {
            type: 'Select',
            label: '布局',
            name: ['layout'],
            props: {
              options: [
                { value: 'horizontal', label: 'horizontal' },
                { value: 'vertical', label: 'vertical' },
                { value: 'inline', label: 'inline' }
              ],
            },
          },
          {
            type: 'Select',
            label: '按钮类型',
            name: ['btnType'],
            props: {
              // options参数必须写完整
              options: [
                { value: 'primary', label: 'primary' },
                { value: 'default', label: 'default' },
                { value: 'ghost', label: 'ghost' },
                { value: 'dashed', label: 'dashed' },
                { value: 'text', label: 'text' },
                { value: 'link', label: 'link' },
              ],
            },
          },
          {
            type: 'InputNumber',
            label: 'labelCol',
            name: ['labelCol'],
          },
          {
            type: 'InputNumber',
            label: 'wrapperCol',
            name: ['wrapperCol'],
          },
          {
            type: 'InputNumber',
            label: 'offset',
            name: ['offset'],
          },
          {
            type: 'Input',
            label: '按钮名称',
            name: ['btnText'],
          },
          {
            type: 'Switch',
            label: '块状按钮',
            name: ['block'],
          },
          {
            type: 'Input',
            label: '初始文本',
            name: ['textInput'],
          },
          {
            type: 'InputNumber',
            label: '初始数值',
            name: ['numberInput'],
          },
          
          {
            type: 'InputNumber',
            label: '文本框占据',
            name: ['textAreaRow'],
          },
          {
            type: 'Switch',
            label: '显示字符数',
            name: ['showCount'],
          },
        ],
        config: {
          // 组件默认属性值
          props: {
            layout: 'horizontal',
            labelCol: 8,
            offset: 8,
            wrapperCol: 16,
            maxWidth: 500,
            btnType: 'primary',
            btnText: '按钮',
            textInput: '初始文本',
            numberInput: 12,
            textAreaRow: 4,
            showCount: true
          },
          style: {

          },
          events: [],
        },
        // 组件事件
        events: [
          {
            value: 'onClick',
            name: '表单提交事件',
          },
          {
            value: 'onDateChange',
            name: '日期时间变化事件',
          },
          {
            value: 'onTextChange',
            name: '文本输入事件'
          }
        ],
        methods: [],
      };

      注意：如果您需要导入钩子函数如useState和useEffect，您应该使用const { useState, useEffect } = window.React;的方式导入。
      同样，Ant Design组件应该以这种方式导入：const { Button, Form, DatePicker, Tag } = window.antd;。
      所有组件都应使用AntDesign，避免使用原生或其他库组件。
      现在，基于上述结构和配置，我需要您为新组件生成index.jsx和config.js文件。
      这个组件的中文描述是#{message}。您可以用中文理解它并帮助我实现该组件的代码。
      请仅返回两个文件的代码，不要添加任何额外的描述文本或markdown语法。
      请根据AntDesign库和上面的模板编写满足需求的组件。请不要尝试省略内容，并确保完整返回代码。
      `;
      const prompt = codePrompt.replace('#{message}', message);
      return prompt;
    }

    async codeGenerate(message) { // 生成代码
       const modelProvider = new GlmModelProvider(); // 创建模型提供者

       const aiRunableAbortController = new AbortController(); // 创建AI可运行控制器

       // 创建AI可运行
       const aiRunnable = await modelProvider.createRunnable({
        signal: aiRunableAbortController.signal, // 设置AI可运行控制器
       });

       const sessionId = `code_session_${Date.now()}`; // 创建会话ID

       // 创建AI可运行配置
       const aiRunnableConfi = {
        configuration: {
          sessionId
       }

       const sessionIdHistoriesMap = await GlmModelProvider.sessionIdHistoriesMap; // 获取会话ID历史记录映射

       const isSessionIdExists = !!sessionIdHistoriesMap[sessionId]; // 判断会话ID是否存在

       const prompt = await this.buildGeneratePrompt({message}); // 构建生成提示
    }
}

module.exports = {
  AiService
}