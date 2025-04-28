# ant-plus-components

基于 Ant Design 组件库的增强版本，提供更便捷的配置方式和更丰富的功能。

## 安装

```bash
npm install ant-plus-components
# 或yarn add ant-plus-components
# 或pnpm add ant-plus-components
```

## 组件列表

### AntFormPlus

基于 Ant Design Form 组件的表单增强版本，提供更便捷的表单项配置和布局功能。

### 特性

- 🚀 基于 Ant Design Form 组件开发
- 📦 自动处理表单布局
- 🎨 支持丰富的表单项类型
- 🔄 支持异步选项加载
- 🎯 支持表单项校验规则配置
- 支持通过 `hideInForm` 属性控制表单项的显示/隐藏

### 基础示例

```tsx
import { AntFormPlus, type ColumnPlus } from "ant-plus-components";
import { Button, Form } from "antd";

type FormType = {
  name: string;
  age: number;
  address: string;
};

const columns: ColumnPlus[] = [
  {
    title: "姓名",
    dataIndex: "name",
    formItemProps: {
      rules: [{ required: true, message: "请输入姓名" }],
    },
    fieldProps: {
      placeholder: "请输入姓名",
      allowClear: true,
    },
    searchForm: {
      col: {
        span: 8, // 默认 span: 6
      },
    },
  },
  {
    title: "年龄",
    dataIndex: "age",
    type: "input",
    fieldProps: {
      placeholder: "请输入年龄",
      allowClear: true,
    },
  },
  {
    title: "图片",
    dataIndex: "photo",
    key: "photo",
    hideInTable: true,
    hideInSearchForm: true,
    formItemProps: {
      getValueFromEvent: normFile,
      valuePropName: "fileList",
      rules: [
        {
          required: true,
          message: t("select"),
        },
      ],
    },
    form: {
      render: () => {
        return (
          <Upload
            listType="picture-card"
            accept="image/*"
            maxCount={1}
            customRequest={(opt) => customUploadAction(opt)}
          >
            <PlusOutlined />
          </Upload>
        );
      },
    },
  },
  {
    title: "地址",
    dataIndex: "address",
    type: "select",
    fieldProps: {
      placeholder: "请选择地址",
      allowClear: true,
    },
    options: [
      {
        label: "北京",
        value: "beijing",
      },
      {
        label: "上海",
        value: "shanghai",
      },
    ],
  },
  {
    title: "操作",
    dataIndex: "action",
    hideInSearchForm: true,
    hideInForm: true,
  },
];

export default function TextForm() {
  const [form] = Form.useForm<FormType>();

  const onFinish = (values: FormType) => {
    console.log("表单值：", values);
  };

  return (
    <>
      <AntFormPlus
        columns={columns}
        form={form}
        row={{ gutter: 20 }}
        col={{ span: 12 }}
        onFinish={onFinish}
      />
      <Button type="primary" onClick={() => form.submit()}>
        提交
      </Button>
      <Button onClick={() => form.resetFields()}>重置</Button>
    </>
  );
}

```

### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 表单配置项 | `ColumnPlus[]` | - |
| row | 栅格化系统，详情请看 [ant row](https://ant-design.antgroup.com/components/grid-cn#row) | `RowProps` | `{ gutter: 24 }` |
| col | 栅格化系统，详情请看 [ant col](https://ant-design.antgroup.com/components/grid-cn#col) | `ColProps` | `{ span: 6 }` |
| … | 其它属性均与 Ant Design [表单组件](https://ant-design.antgroup.com/components/form-cn#api)保持一致 |  |  |

### AntSearchFormPlus

基于 Ant Design Form 组件的搜索表单增强版本，提供更便捷的表单项配置和布局功能。

### 特性

- 🚀 基于 Ant Design Form 组件开发
- 📦 自动处理表单布局
- 🎨 支持丰富的表单项类型
- 🔍 内置查询和重置功能
- 🎯 支持异步选项加载
- 支持通过 `hideInSearchForm` 属性控制搜索表单项的显示/隐藏

### 基础示例

```tsx
import { AntSearchFormPlus, type ColumnPlus } from "ant-plus-components";
import { Button, Form } from "antd";

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
    fieldProps: {
      placeholder: "请输入姓名",
      allowClear: true,
    },
    searchForm: {
      col: {
        span: 8, // 默认 span: 6
      },
    },
  },
  {
    title: "年龄",
    dataIndex: "age",
    type: "input",
    fieldProps: {
      placeholder: "请输入年龄",
      allowClear: true,
    },
  },
  {
    title: "地址",
    dataIndex: "address",
    type: "select",
    fieldProps: {
      placeholder: "请选择地址",
      allowClear: true,
    },
    options: [
      {
        label: "北京",
        value: "beijing",
      },
      {
        label: "上海",
        value: "shanghai",
      },
    ],
  },
  {
    title: "操作",
    dataIndex: "action",
    hideInSearchForm: true,
  },
];

export default function TestSearchForm() {
  const [form] = Form.useForm<FormType>();

  const onSearch2 = (values: FormType) => {
    console.log("values", values);
  };

  const onSearch = (values: FormType) => {
    console.log("values", values);
  };

  return (
    <>
      <AntSearchFormPlus<FormType>
        col={{ span: 6 }}
        row={{
          gutter: 20,
        }}
        labelAlign="right"
        labelCol={{ style: { width: 100 } }}
        columns={columns}
        onFinish={onSearch}
        submitButtonText="搜索"
        resetButtonText="重置"
      ></AntSearchFormPlus>
      {/* 使用子组件时，需传递 form 属性 */}
      <AntSearchFormPlus<FormType>
        col={{ span: 6 }}
        row={{
          gutter: 20,
        }}
        form={form}
        labelAlign="right"
        labelCol={{ style: { width: 100 } }}
        columns={columns}
        onFinish={onSearch2}
      >
        <>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
          <Button onClick={() => form.resetFields()}>重置</Button>
        </>
      </AntSearchFormPlus>
    </>
  );
}

```

### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 表单配置项 | `ColumnPlus[]` | - |
| row | 栅格化系统，详情请看 [ant row](https://ant-design.antgroup.com/components/grid-cn#row) | `RowProps` | `{ gutter: 24 }` |
| col | 栅格化系统，详情请看 [ant col](https://ant-design.antgroup.com/components/grid-cn#col) | `ColProps` | `{ span: 6 }` |
| ignoreRules | 忽略表单校验项 | `boolean` | `true` |
| submitButtonText | 查询按钮文字 | `string` | 查询 |
| resetButtonText | 重置按钮文字 | `string` | 重置 |
| onReset | 点击重置按钮的回调事件 | `onReset?: (values: Values) => void;` | - |
| children | 当使用子组件时，`submitButtonText`和`resetButtonText`会失效 | `React.ReactNode` | - |
| … | 其它属性均与 Ant Design [表单组件](https://ant-design.antgroup.com/components/form-cn#api)保持一致 |  |  |

### 注意事项

当 AntSearchFormPlus 传递子组件时，`submitButtonText`和`resetButtonText`会失效，同时也需传递`form`属性。

### AntTablePlus

基于 Ant Design Table 组件的增强版本，提供更便捷的列配置和过滤功能。

### 特性

- 完全继承 Ant Design Table 的所有功能和属性
- 支持通过 `hideInTable` 属性控制列的显示/隐藏
- 支持表格分页、排序、筛选、自定义渲染等功能
- 与 AntFormPlus、AntSearchFormPlus 组件无缝集成
- 使用 TypeScript 编写，提供完整的类型定义

### 基础示例

```tsx
import { AntTablePlus, type ColumnPlus } from "ant-plus-components";
import { Space } from "antd";

const columns: ColumnPlus[] = [
  {
    title: "姓名",
    dataIndex: "name",
    formItemProps: {
      rules: [{ required: true, message: "请输入姓名" }],
    },
    fieldProps: {
      placeholder: "请输入姓名",
      allowClear: true,
    },
    searchForm: {
      col: {
        span: 8, // 默认 span: 6
      },
    },
  },
  {
    title: "年龄",
    dataIndex: "age",
    type: "input",
    fieldProps: {
      placeholder: "请输入年龄",
      allowClear: true,
    },
  },
  {
    title: "地址",
    dataIndex: "address",
    type: "select",
    fieldProps: {
      placeholder: "请选择地址",
      allowClear: true,
    },
    options: [
      {
        label: "北京",
        value: "beijing",
      },
      {
        label: "上海",
        value: "shanghai",
      },
    ],
  },
  {
    title: "操作",
    dataIndex: "action",
    hideInSearchForm: true,
    hideInForm: true,
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

export default function TestTable() {
  const data = [
    { key: 1, name: "John", age: 32, address: "Beijing" },
    { key: 2, name: "Doe", age: 25, address: "Shanghai" },
  ];

  return (
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
  );
}
```

### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 表格列配置项 | `ColumnPlus[]` | - |
| … | 其它属性均与 Ant Design [表格组件](https://ant-design.antgroup.com/components/table-cn#column)保持一致 |  |  |

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
| searchForm | 搜索表单布局配置 | `CustomForm` | `{ col: { span: 6 } }` |
| form | 表单布局配置 | `CustomForm` | `{ col: { span: 24 } }` |

### 支持的表单项类型（ValueType）

- `select`
- `input`
- `checkbox`
- `radio`
- `switch`
- `input-number`
- `cascader`
- `date-picker`
- `range-picker`
- `time-picker`
- `tree-select`

### Option 类型

| 字段名 | 类型 | 描述 |
| --- | --- | --- |
| label | string | 标签 |
| value | unknown | 值 |
| children | Option[] | 子选项，用于级联选择 |

### CustomForm 类型

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| col | 同 `Antd` 中的 `ColProps`  属性 | `ColProps` | - |
| render | 自定义渲染表单项（文件上传等） | `(value: ColumnPlus) => React.ReactNode` | - |

## 注意事项

1. 组件依赖于 `antd5.x` 和 `react`，请确保项目中已安装这些依赖
2. 异步选项加载时，确保返回的数据结构符合 `Option[]` 类型定义
3. 表单项的布局可以通过 `form.col` 和 `searchForm.col` 进行配置
4. 组件继承了对应 antd 组件的所有属性，可以通过这些属性实现更复杂的功能
5. AntFormPlus 没有 `ref` 属性，建议通过 `Form.useForm` 对表单数据域进行交互