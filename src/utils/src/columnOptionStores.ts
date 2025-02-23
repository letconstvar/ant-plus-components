import type { ColumnPlus, Option } from "@/types/index";

const columnOptionStores = new WeakMap<
  () => Promise<ColumnPlus["options"]>,
  Option[]
>();

export default columnOptionStores;
