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
import filterOptionsByColumns from "@/utils/src/filterOptionsByColumns";
import RenderFormItem from "@/components/RenderFormItem";

export default function AntSearchFormPlus<Values>({
  columns,
  row = { gutter: 24 },
  col = { span: 6 },
  ignoreRules = true,
  submitButtonText = "查询",
  resetButtonText = "重置",
  children,
  onReset,
  ...rest
}: {
  columns: ColumnPlus[];
  ignoreRules?: boolean;
  row?: RowProps;
  col?: ColProps;
  submitButtonText?: string;
  resetButtonText?: string;
  children?: React.ReactNode;
  onReset?: (values: Values) => void;
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
      filterOptionsByColumns(columns, "hideInSearchForm", setFields);
    }
  }, [columns]);

  const onQuery = () => {
    if (rest?.form) return;
    form.submit();
  };

  const handleReset = () => {
    if (rest?.form) return;
    form.resetFields();
    if (onReset) {
      onReset(form.getFieldsValue());
    }
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
            {column?.searchForm?.render
              ? column.searchForm.render(column)
              : RenderFormItem(column)}
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
            <Button onClick={handleReset}>{resetButtonText}</Button>
          </Col>
        )}
      </Row>
    </Form>
  );
}
