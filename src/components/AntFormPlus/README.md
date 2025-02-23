# AntFormPlus

基于 Ant Design Form 组件的表单增强版本，提供更便捷的表单项配置和布局功能。

## 特性

- 🚀 基于 Ant Design Form 组件开发
- 📦 自动处理表单布局
- 🎨 支持丰富的表单项类型
- 🔄 支持异步选项加载
- 🎯 支持表单项校验规则配置

## 安装

```bash
npm install @ant-plus-components/components
# 或者
yarn add @ant-plus-components/components
# 或者
pnpm add @ant-plus-components/components
```

## 使用方法

```tsx
import { AntFormPlus } from '@ant-plus-components/components';
import type { ColumnPlus } from '@ant-plus-components/components';

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
    type: 'number'
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

其他属性与 antd Form 组件的属性相同。

### ColumnPlus

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 表单项标签 | `string` | - |
| dataIndex | 表单项字段名 | `string` | - |
| type | 表单项类型，支持 input、number、select 等 | `string` | `'input'` |
| options | 选项数据，用于 select、radio、checkbox 等 | `{label: string, value: any}[] \| () => Promise<{label: string, value: any}[]>` | - |
| formItemProps | Form.Item 组件的 props | `FormItemProps` | - |
| fieldProps | 表单控件的 props | `object` | - |
| form | 表单项布局配置 | `{ col: ColProps }` | `{ col: { span: 24 } }` |
| hideInForm | 在表单中隐藏该项 | `boolean` | `false` |

## 注意事项

1. 组件内部会自动处理异步选项的加载，当 `options` 为函数时会在组件挂载时调用该函数获取选项数据。
2. 表单项的布局支持通过 `form.col` 进行配置，默认为 24 栏。
3. 组件继承了 antd Form 的所有属性，可以通过这些属性来实现更复杂的表单功能。