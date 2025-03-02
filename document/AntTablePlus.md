# AntTablePlus
基于 Ant Design Table 组件的增强版本，提供更便捷的列配置和过滤功能。AntTablePlus 完全继承了 Ant Design Table 的所有功能，同时提供了更简便的配置方式。

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
import { AntTablePlus } from 'ant-plus-components';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    hideInTable: true, // 在表格中隐藏此列
  },
];

const data = [
  { key: 1, name: 'John', age: 32 },
  { key: 2, name: 'Doe', age: 25 },
];

const App = () => (
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
```

## API
### Props
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 表格列的配置描述，继承自 antd Table 的 columns，扩展了部分属性 | `ColumnPlus[]` | - |
| ... | 其它属性和 AntTable 属性一样 | `TableProps` | - |


更多属性请参考 [Ant Design Table](https://ant-design.antgroup.com/components/table-cn#table) 组件文档。

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
| ... | [Ant Design Table Column](https://ant.design/components/table-cn/#Column) |  | 其他属性与 [Ant Design Table Column](https://ant.design/components/table-cn/#Column) 的属性相同 |


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
| children | Option[] | 子选项，用于级联选择 |


ValueType 属性如下：

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

## 特性
+ 完全继承 Ant Design Table 的所有功能和属性
+ 支持通过 `hideInTable` 属性控制列的显示/隐藏
+ 支持表格分页、排序、筛选、自定义渲染等功能
+ 与 AntFormPlus、AntSearchFormPlus 组件无缝集成
+ 使用 TypeScript 编写，提供完整的类型定义

## 注意事项
+ 组件依赖于 `antd5.x` 和 `react`，请确保项目中已安装这些依赖
+ 组件会自动过滤掉一些不必要的属性，以确保与 antd Table 的兼容性
+ 当使用异步 `options` 时，确保返回的数据结构符合 `Option[]` 类型定义

