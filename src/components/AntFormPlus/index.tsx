import { Form, Row, type ColProps, type FormProps, type RowProps } from "antd";
import type { ColumnPlus } from "@/types/index";
import { useEffect, useState } from "react";

import filterOptionsByColumns from "@/utils/src/filterOptionsByColumns";
import RenderFormItem from "@/components/RenderFormItem";
import AntFormItemWrap from "@/components/AntFormItemWrap";

export default function AntFormPlus<Values>({
  columns,
  row = {},
  col = { span: 6 },
  ...rest
}: {
  columns: ColumnPlus[];
  row?: RowProps;
  col?: ColProps;
} & FormProps<Values>) {
  const [fields, setFields] = useState<ColumnPlus[]>(
    columns
      .filter((column) => !column.hideInSearchForm)
      .map((i) => ({
        ...i,
        options: typeof i.options === "function" ? [] : i.options,
      }))
  );

  useEffect(() => {
    if (columns) {
      filterOptionsByColumns(columns, "hideInForm", setFields);
    }
  }, [columns]);

  return (
    <Form {...rest}>
      <Row {...row}>
        {fields.map((column, index) => (
          <AntFormItemWrap
            column={column}
            col={column?.form?.col || col}
            key={column.dataIndex + index}
          >
            {column?.form?.render
              ? column.form.render(column)
              : RenderFormItem(column)}
          </AntFormItemWrap>
        ))}
      </Row>
    </Form>
  );
}
