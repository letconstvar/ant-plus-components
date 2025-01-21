# AntSearchFormPlus

基于 Ant Design Form 组件的搜索表单增强版本，提供更便捷的表单项配置和布局功能。

## 特性

- 🚀 基于 Ant Design Form 组件开发
- 📦 自动处理表单布局
- 🎨 支持丰富的表单项类型
- 🔍 内置查询和重置功能
- 🎯 支持异步选项加载

## 安装

```bash
npm install ant-plus-components
# or
yarn add ant-plus-components
# or
pnpm add ant-plus-components
```

## 基础用法

```tsx
import { AntSearchFormPlus } from 'ant-plus-components';
import type { ColumnPlus } from 'ant-plus-components';

const columns: ColumnPlus[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    type: 'input',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    type: 'input-number',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    type: 'select',
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' },
    ],
  },
];

const Demo = () => {
  const onFinish = (values) => {
    console.log('表单值：', values);
  };

  return (
    <AntSearchFormPlus
      columns={columns}
      onFinish={onFinish}
      submitButtonText="搜索"
      resetButtonText="重置"
    />
  );
};
```

## API

### AntSearchFormPlus

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 表单项配置数组 | `ColumnPlus[]` | - |
| row | antd Row 组件的 props | `RowProps` | `{ gutter: 24 }` |
| ignoreRules | 是否忽略表单校验规则 | `boolean` | `true` |
| submitButtonText | 查询按钮文本 | `string` | `"查询"` |
| resetButtonText | 重置按钮文本 | `string` | `"重置"` |

其他属性将透传给 antd Form 组件。

### ColumnPlus

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 表单项标签 | `string` | - |
| dataIndex | 表单项字段名 | `string` | - |
| type | 表单项类型 | `ValueType` | - |
| fieldProps | 表单控件的 props | `Record<string, unknown>` | - |
| formItemProps | Form.Item 的 props | `Record<string, unknown>` | - |
| options | 选项数据，用于 select/radio/checkbox 等 | `Option[] \| (() => Promise<Option[]>)` | - |
| hideInSearchForm | 是否在搜索表单中隐藏 | `boolean` | `false` |
| searchForm | 搜索表单布局配置 | `{ col: ColProps }` | `{ col: { span: 6 } }` |

### ValueType

支持的表单项类型：

- `'select'`
- `'input'`
- `'checkbox'`
- `'radio'`
- `'switch'`
- `'input-number'`
- `'cascader'`
- `'date-picker'`
- `'range-picker'`
- `'time-picker'`
- `'tree-select'`