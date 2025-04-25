import { Col, Form, type ColProps } from "antd";
import type { ColumnPlus } from "@/types/index";

export default function AntFormItemWrap({
  children,
  column,
  col,
}: {
  isSearchForm?: boolean;
  children: React.ReactNode;
  column: ColumnPlus;
  col: ColProps;
}) {
  return (
    <Col {...col}>
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
