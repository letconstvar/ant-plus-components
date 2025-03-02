import { Table } from "antd";
import type { ColumnPlus } from "@/types/index";
import type { TableProps } from "antd/es/table";
import omit from "@/utils/src/omit";
import type { AnyObject } from "antd/es/_util/type";
import type { ColumnType } from "antd/lib/table";

export default function AntTablePlus<DataType extends AnyObject>({
  columns,
  ...rest
}: {
  columns: ColumnPlus[];
} & Omit<TableProps<DataType>, "columns">) {
  const _columns = columns
    .filter((i) => !i.hideInTable)
    .map((i) =>
      omit(i, [
        "type",
        "fieldProps",
        "formItemProps",
        "form",
        "searchForm",
        "options",
        "hideInForm",
        "hideInSearchForm",
        "hideInTable",
      ])
    ) as ColumnType[];

  return <Table {...rest} columns={_columns}></Table>;
}
