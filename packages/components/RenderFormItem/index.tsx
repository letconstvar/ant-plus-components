import {
  Cascader,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TimePicker,
  TreeSelect,
} from "antd";
import type { ColumnPlus, Option } from "@/types/index";
import type { DefaultOptionType } from "antd/es/select";

const renderFormItem = (column: ColumnPlus) => {
  switch (column.type) {
    case "input":
      return <Input {...column?.fieldProps} />;
    case "checkbox":
      return (
        <Checkbox.Group
          {...column.fieldProps}
          options={column.options as Option[]}
        />
      );
    case "select":
      return (
        <Select {...column.fieldProps} options={column.options as Option[]} />
      );
    case "radio":
      return (
        <Radio.Group
          {...column.fieldProps}
          options={column.options as Option[]}
        />
      );
    case "switch":
      return <Switch {...column.fieldProps} />;
    case "cascader":
      return (
        <Cascader
          {...column.fieldProps}
          options={column.options as DefaultOptionType[]}
        />
      );
    case "input-number":
      return <InputNumber {...column?.fieldProps} />;
    case "date-picker":
      return <DatePicker {...column?.fieldProps} />;
    case "range-picker":
      return <DatePicker.RangePicker {...column.fieldProps} />;
    case "time-picker":
      return <TimePicker {...column.fieldProps} />;
    case "tree-select":
      return <TreeSelect {...column.fieldProps} />;
    default:
      return <Input {...column?.fieldProps} />;
  }
};

export default renderFormItem;
