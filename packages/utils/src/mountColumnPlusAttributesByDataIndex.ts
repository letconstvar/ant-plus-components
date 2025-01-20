import type { ColumnPlus } from "@/types/index";
import deepClone from "./deepClone";

type Item = {
  dataIndex: string;
  attribute: string;
  value: unknown;
};

function deepCloneColumns(columns: ColumnPlus[]): ColumnPlus[] {
  return columns.map((column) => deepClone(column));
}

export default function mountColumnPlusAttributesByDataIndex(
  columns: ColumnPlus[],
  items: Item[]
): ColumnPlus[] {
  const newColumns = deepCloneColumns(columns);

  items.forEach(({ dataIndex, attribute, value }) => {
    const keys = attribute.split(".");
    const targetColumn = newColumns.find(
      (column) => column.dataIndex === dataIndex
    );

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
  });

  return newColumns;
}
