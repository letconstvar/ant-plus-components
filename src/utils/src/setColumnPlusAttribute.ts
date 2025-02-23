import type { Dispatch, SetStateAction } from "react";
import type { ColumnPlus } from "@/types/index";

export default function setColumnPlusAttributeByDataIndex(
  columns: ColumnPlus[],
  dataIndex: string,
  attribute: string,
  value: unknown,
  setStateAction: Dispatch<SetStateAction<ColumnPlus[]>>
) {
  const keys = attribute.split(".");

  const targetColumn = columns.find((column) => column.dataIndex === dataIndex);

  if (targetColumn) {
    let current = targetColumn;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!(current as unknown as Record<string, unknown>)[keys[i]]) {
        (current as unknown as Record<string, unknown>)[keys[i]] = {};
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      current = (current as unknown as Record<string, unknown>)[keys[i]];
    }

    (current as unknown as Record<string, unknown>)[keys[keys.length - 1]] =
      value;
  }

  setStateAction([...columns]);
}
