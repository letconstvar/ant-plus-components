import type { ColProps } from "antd";
import type { ColumnType } from "antd/es/table";

export interface Option {
  label: string;
  value: unknown;
  children?: Option[];
}

type ValueType =
  | "select"
  | "input"
  | "checkbox"
  | "radio"
  | "switch"
  | "input-number"
  | "cascader"
  | "switch"
  | "date-picker"
  | "range-picker"
  | "time-picker"
  | "tree-select";

type Search = {
  col: ColProps;
}

export interface ColumnPlus extends ColumnType {
  dataIndex: string;
  type?: ValueType;
  fieldProps?: Record<string, unknown>;
  formItemProps?: Record<string, unknown>;
  options?: Option[] | (() => Promise<Option[]>);
  hideInSearchForm?: boolean;
  hideInForm?: boolean;
  hideInTable?: boolean;
  searchForm?: Search;
  form?: Search;
}
