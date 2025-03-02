# AntFormPlus
基于 Ant Design Form 组件的表单增强版本，提供更便捷的表单项配置和布局功能。

## 特性
+ 🚀 基于 Ant Design Form 组件开发
+ 📦 自动处理表单布局
+ 🎨 支持丰富的表单项类型
+ 🔄 支持异步选项加载
+ 🎯 支持表单项校验规则配置

## 安装
```bash
npm install @ant-plus-components
# 或者
yarn add @ant-plus-components
# 或者
pnpm add @ant-plus-components
```

## 使用方法
```tsx
import { AntFormPlus } from '@ant-plus-components';
import type { ColumnPlus } from '@ant-plus-components';

const columns: ColumnPlus[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    formItemProps: {
      rules: [{ required: true, message: '请输入姓名' }]
    }
  },
  {
    title: '年龄',
    dataIndex: 'age',
    type: 'input'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    type: 'select',
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' }
    ]
  }
];

const Demo = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('表单值：', values);
  };

  return (
    <AntFormPlus
      form={form}
      columns={columns}
      onFinish={onFinish}
    />
  );
};
```

## API
### AntFormPlus
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 表单项配置数组 | `ColumnPlus[]` | - |
| row | antd Row 组件的 props | `RowProps` | `{}` |
| ... | 其他属性与 antd Form 组件的属性相同 |  |  |


更多属性请参考 [Ant Design Form](https://ant-design.antgroup.com/components/form-cn?locale=zh-CN#form) 组件文档。

### ColumnPlus
| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| dataIndex | `string` | - | 数据索引 |
| type | `ValueType` | `input` | 表单项类型，支持 input、number、select 等 |
| fieldProps | `Record<string, unknown>` | - | 表单控件的 props |
| formItemProps | `Record<string, unknown>` | - | Form.Item 组件的 props |
| options | `Option[]` | `(() => Promise<Option[]>)` | - | 选项数据，用于 select、radio、checkbox 等 |
| hideInSearchForm | `boolean` | - | 是否在搜索表单中隐藏 |
| hideInForm | `boolean` | - | 是否在表单中隐藏 |
| hideInTable | `boolean` | - | 是否在表格中隐藏 |
| searchForm | `Search` | `{ col: { span: 24 } }` | 搜索表单配置 |
| form | `Search` | `{ col: { span: 24 } }` | 表单项布局配置 |


### ValueType
支持的表单项类型：

+ `select`
+ `input`
+ `checkbox`
+ `radio`
+ `switch`
+ `input-number`
+ `cascader`
+ `date-picker`
+ `range-picker`
+ `time-picker`
+ `tree-select`

### Search
| 字段名 | 类型 | 描述 |
| --- | --- | --- |
| col | ColProps | antd ColProp 属性 |


### Option
| 字段名 | 类型 | 描述 |
| --- | --- | --- |
| label | string | 标签 |
| value | unknown | 值 |
| children | Option[] | 子选项 |


## 注意事项
1. 组件内部会自动处理异步选项的加载，当 `options` 为<font style="color:#DF2A3F;">函数</font>时会在组件挂载时调用该函数获取选项数据。
2. 表单项的布局支持通过 `form.col` 进行配置，默认为 24 栏。
3. 组件继承了 antd Form 的所有属性，可以通过这些属性来实现更复杂的表单功能。
4. AntFormPlus 没有 `ref` 属性，建议<font style="color:rgba(0, 0, 0, 0.88);">通过 </font>`<font style="color:rgba(0, 0, 0, 0.88);">Form.useForm</font>`<font style="color:rgba(0, 0, 0, 0.88);"> 对表单数据域进行交互。</font>
5. <font style="color:rgba(0, 0, 0, 0.88);">组件依赖于 </font>`<font style="color:rgba(0, 0, 0, 0.88);">antd5.x</font>`<font style="color:rgba(0, 0, 0, 0.88);"> 和 </font>`<font style="color:rgba(0, 0, 0, 0.88);">react</font>`<font style="color:rgba(0, 0, 0, 0.88);">，请确保项目中已安装这些依赖。</font>

