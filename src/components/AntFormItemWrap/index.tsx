import { Col, Form } from "antd";
import type { ColumnPlus } from "@/types/index";

export default function AntFormItemWrap({
  children,
  column,
  isSearchForm = true,
}: {
  isSearchForm?: boolean;
  children: React.ReactNode;
  column: ColumnPlus;
}) {
  return (
    <Col {...(isSearchForm ? column.searchForm?.col : column.form?.col)}>
      <Form.Item
        {...column?.formItemProps}
        name={column.dataIndex}
        label={column.title as string}
      >
        {children}
      </Form.Item>
    </Col>
  );
}
