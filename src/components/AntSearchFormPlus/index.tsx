import {
  Button,
  Col,
  Form,
  Row,
  type ColProps,
  type FormProps,
  type RowProps,
} from "antd";
import type { ColumnPlus } from "@/types/index";
import { useEffect, useState } from "react";
import AntFormItemWrap from "@/components/AntFormItemWrap";
import getOptionsByColumns from "@/utils/src/getOptionsByColumns";
import RenderFormItem from "@/components/RenderFormItem";

export default function AntSearchFormPlus<Values>({
  columns,
  row = { gutter: 24 },
  col = { span: 6 },
  ignoreRules = true,
  submitButtonText = "查询",
  resetButtonText = "重置",
  children,
  ...rest
}: {
  columns: ColumnPlus[];
  ignoreRules?: boolean;
  row?: RowProps;
  col?: ColProps;
  submitButtonText?: string;
  resetButtonText?: string;
  children?: React.ReactNode;
} & FormProps<Values>) {
  const [form] = Form.useForm<Values>();
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
      getOptionsByColumns(columns, "hideInSearchForm", setFields);
    }
  }, [columns]);

  const onQuery = () => {
    if (rest?.form) return;
    form.submit();
  };

  const onReset = () => {
    if (rest?.form) return;
    form.resetFields();
  };

  return (
    <Form form={form} {...rest}>
      <Row {...row}>
        {fields.map((column, index) => (
          <AntFormItemWrap
            key={column.dataIndex + index}
            col={column?.searchForm?.col || col}
            column={{
              ...column,
              formItemProps: {
                ...column.formItemProps,
                rules: ignoreRules ? null : column.formItemProps?.rules,
              },
            }}
          >
            {RenderFormItem(column)}
          </AntFormItemWrap>
        ))}
        {children ? (
          children
        ) : (
          <Col style={{ flex: 1, textAlign: "right" }}>
            <Button
              type="primary"
              onClick={onQuery}
              style={{ marginRight: "10px" }}
            >
              {submitButtonText}
            </Button>
            <Button onClick={onReset}>{resetButtonText}</Button>
          </Col>
        )}
      </Row>
    </Form>
  );
}
