import { Form, Row, type FormProps, type RowProps } from "antd";
import type { ColumnPlus } from "@/types/index";
import { useEffect, useState } from "react";

import getOptionsByColumns from "@/utils/src/getOptionsByColumns";
import RenderFormItem from "@/components/RenderFormItem";
import AntFormItemWrap from "@/components/AntFormItemWrap";

const defaultForm = {
  col: {
    span: 24,
  },
};

export default function AntFormPlus<Values>({
  columns,
  row = {},
  ...rest
}: {
  columns: ColumnPlus[];
  row?: RowProps;
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
      getOptionsByColumns(columns, "hideInForm", setFields);
    }
  }, [columns]);

  return (
    <Form {...rest}>
      <Row {...row}>
        {fields.map((column, index) => (
          <AntFormItemWrap
            column={Object.assign({ form: defaultForm }, column)}
            isSearchForm={false}
            key={column.dataIndex + index}
          >
            {RenderFormItem(column)}
          </AntFormItemWrap>
        ))}
      </Row>
    </Form>
  );
};
