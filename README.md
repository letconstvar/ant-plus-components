# Ant Plus Components
基于 Ant Design 组件库的增强版本，提供更便捷的配置方式和更丰富的功能。

## 安装
```bash
npm install ant-plus-components
# 或
yarn add ant-plus-components
# 或
pnpm add ant-plus-components
```

## 基础用法
```tsx
import {
  AntFormPlus,
  AntSearchFormPlus,
  AntTablePlus,
} from "ant-plus-components";
import type { ColumnPlus } from "ant-plus-components";
import { Button, Form, Modal } from "antd";
import { useState } from "react";

type FormType = {
  name: string;
  age: number;
};

const columns: ColumnPlus[] = [
  {
    title: "姓名",
    dataIndex: "name",
    formItemProps: {
      rules: [{ required: true, message: "请输入姓名" }],
    },
  },
  {
    title: "年龄",
    dataIndex: "age",
    type: "input",
  },
];

const data = [
  { key: 1, name: "John", age: 32 },
  { key: 2, name: "Doe", age: 25 },
];

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm<FormType>();

  const onSearch = (values: FormType) => {
    console.log("表单值：", values);
  };

  const onFinish = (values: FormType) => {
    console.log("表单值：", values);
  };

  return (
    <>
      <AntSearchFormPlus<FormType>
        columns={columns}
        onFinish={onSearch}
        submitButtonText="搜索"
        resetButtonText="重置"
      />
      <div style={{ textAlign: "right", marginBottom: 16 }}>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Dialog
        </Button>
      </div>
      <AntTablePlus
        columns={columns}
        dataSource={data}
        rowKey="key"
        pagination={{
          pageSize: 10,
          total: 20,
          current: 1,
          showTotal: (total) => `共 ${total} 条`,
        }}
      />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => {
          form.submit();
        }}
      >
        <AntFormPlus columns={columns} form={form} onFinish={onFinish} />
      </Modal>
    </>
  );
}
```

## 组件列表
### AntFormPlus
基于 Ant Design Form 组件的表单增强版本，提供更便捷的表单项配置和布局功能。

#### 特性
+ 🚀 基于 Ant Design Form 组件开发
+ 📦 自动处理表单布局
+ 🎨 支持丰富的表单项类型
+ 🔄 支持异步选项加载
+ 🎯 支持表单项校验规则配置
+ 支持通过 `hideInForm` 属性控制表单项的显示/隐藏

### AntSearchFormPlus
基于 Ant Design Form 组件的搜索表单增强版本，提供更便捷的表单项配置和布局功能。

#### 特性
+ 🚀 基于 Ant Design Form 组件开发
+ 📦 自动处理表单布局
+ 🎨 支持丰富的表单项类型
+ 🔍 内置查询和重置功能
+ 🎯 支持异步选项加载
+ 支持通过 hideInSearchForm 属性控制搜索表单项的显示/隐藏

### AntTablePlus
基于 Ant Design Table 组件的增强版本，提供更便捷的列配置和过滤功能。

#### 特性
+ 完全继承 Ant Design Table 的所有功能和属性
+ 支持通过 `hideInTable` 属性控制列的显示/隐藏
+ 支持表格分页、排序、筛选、自定义渲染等功能
+ 与 AntFormPlus、AntSearchFormPlus 组件无缝集成
+ 使用 TypeScript 编写，提供完整的类型定义

## API
### 通用 ColumnPlus 类型
所有组件共享的列配置类型：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 表单项标签 | `string` | - |
| dataIndex | 表单项字段名 | `string` | - |
| type | 表单项类型 | `ValueType` | `input` |
| fieldProps | 表单控件的 props | `Record<string, unknown>` | - |
| formItemProps | Form.Item 的 props | `Record<string, unknown>` | - |
| options | 选项数据，用于 select/radio/checkbox 等 | `Option[] | (() => Promise<Option[]>)` | - |
| hideInTable | 是否在表格中隐藏 | `boolean` | `false` |
| hideInForm | 是否在表单中隐藏 | `boolean` | `false` |
| hideInSearchForm | 是否在搜索表单中隐藏 | `boolean` | `false` |
| searchForm | 搜索表单布局配置 | `{ col: ColProps }` | `{ col: { span: 6 } }` |
| form | 表单布局配置 | `{ col: ColProps }` | `{ col: { span: 24 } }` |


### 支持的表单项类型（ValueType）
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

### Option 类型
| 字段名 | 类型 | 描述 |
| --- | --- | --- |
| label | string | 标签 |
| value | unknown | 值 |
| children | Option[] | 子选项，用于级联选择 |


### Search 类型
| 字段名 | 类型 | 描述 |
| --- | --- | --- |
| col | ColProps | antd ColProp 属性 |


### AntFormPlus
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 表单项配置数组 | `ColumnPlus[]` | - |
| row | antd Row 组件的 props | `RowProps` | `{}` |
| ... | 其他属性与 [Ant Design Form](https://ant-design.antgroup.com/components/form-cn?locale=zh-CN#form) 组件的属性相同 |  |  |


其他属性与 [Ant Design Form](https://ant-design.antgroup.com/components/form-cn?locale=zh-CN#form) 组件的属性相同。

### AntSearchFormPlus
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 表单项配置数组 | `ColumnPlus[]` | - |
| row | antd Row 组件的 props | `RowProps` | `{ gutter: 24 }` |
| ignoreRules | 是否忽略表单校验规则 | `boolean` | `true` |
| submitButtonText | 查询按钮文本 | `string` | `"查询"` |
| resetButtonText | 重置按钮文本 | `string` | `"重置"` |
| ... | 其他属性与 [Ant Design Form](https://ant-design.antgroup.com/components/form-cn?locale=zh-CN#form) 组件的属性相同 |  |  |


其他属性将透传给 antd Form 组件。

### AntTablePlus
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 表格列的配置描述，继承自 antd Table 的 columns，扩展了部分属性 | `ColumnPlus[]` | - |
| ... | 其他属性与 [Ant Design Table](https://ant-design.antgroup.com/components/table-cn/#Table) 组件的属性相同。 |  |  |


其他属性与 [Ant Design Table](https://ant-design.antgroup.com/components/table-cn/#Table) 组件的属性相同。

## 注意事项
1. 组件依赖于 `antd5.x` 和 `react`，请确保项目中已安装这些依赖
2. 异步选项加载时，确保返回的数据结构符合 `Option[]` 类型定义
3. 表单项的布局可以通过 `form.col` 和 `searchForm.col` 进行配置
4. 组件继承了对应 antd 组件的所有属性，可以通过这些属性实现更复杂的功能
5. AntFormPlus 没有 `ref` 属性，建议通过 `Form.useForm` 对表单数据域进行交互

