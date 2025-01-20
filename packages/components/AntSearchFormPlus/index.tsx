import { Button, Col, Form, Row, type FormProps, type RowProps } from "antd";
import type { ColumnPlus } from "@/types/index";
import { memo, useCallback, useEffect, useState } from "react";
import AntFormItemWrap from "@/components/AntFormItemWrap";
import getOptionsByColumns from "@/utils/getOptionsByColumns";
import RenderFormItem from "@/components/RenderFormItem";

const defaultSearchForm = {
  col: {
    span: 6,
  },
};

export default memo(function AntSearchFormPlus<Values>({
  columns,
  row = { gutter: 24 },
  ignoreRules = true,
  submitButtonText = "查询",
  resetButtonText = "重置",
  ...rest
}: {
  columns: ColumnPlus[];
  ignoreRules?: boolean;
  row?: RowProps;
  submitButtonText?: string;
  resetButtonText?: string;
} & FormProps<Values>) {
  const [form] = Form.useForm();
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

  const onQuery = useCallback(() => {
    form.submit();
  }, [form]);

  const onReset = useCallback(() => {
    form.resetFields();
  }, [form]);

  return (
    <Form form={form} {...rest}>
      <Row {...row}>
        {fields.map((column, index) => (
          <AntFormItemWrap
            column={Object.assign(
              {
                searchForm: defaultSearchForm,
              },
              {
                ...column,
                formItemProps: {
                  ...column.formItemProps,
                  rules: ignoreRules ? null : column.formItemProps?.rules,
                },
              }
            )}
            key={column.dataIndex + index}
          >
            {RenderFormItem(column)}
          </AntFormItemWrap>
        ))}
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
      </Row>
    </Form>
  );
});
