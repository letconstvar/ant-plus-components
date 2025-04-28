import type { ColumnPlus } from "@/types/index";
import columnOptionStores from "./columnOptionStores";

export default async function filterOptionsByColumns(
  columns: ColumnPlus[],
  filterKey: "hideInSearchForm" | "hideInForm" | "hideInTable",
  callback: (columns: ColumnPlus[]) => void
) {
  const _arr: ColumnPlus[] = [];

  for (let i = 0; i < columns.length; i++) {
    if (columns[i][filterKey]) {
      continue;
    }

    let options: ColumnPlus["options"] = columns[i].options;

    if (typeof columns[i]?.options === "function") {
      const optionsFn = columns[i].options as () => Promise<
        ColumnPlus["options"]
      >;

      if (columnOptionStores.has(optionsFn)) {
        const cachedOptions = columnOptionStores.get(optionsFn) || [];
        if (cachedOptions) options = cachedOptions;
      } else {
        options = (await optionsFn()) || [];
        if (Array.isArray(options)) {
          columnOptionStores.set(optionsFn, options);
        }
      }
    }

    _arr.push({
      ...columns[i],
      options,
    });
  }

  callback(_arr);
}
