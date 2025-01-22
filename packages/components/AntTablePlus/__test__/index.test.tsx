import React from "react";
import { render, screen } from "@testing-library/react";
import AntTablePlus from "../index";
import type { ColumnPlus } from "../../../types";
import "@testing-library/jest-dom";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

const columns: ColumnPlus[] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    hideInTable: false,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    hideInTable: true,
  },
];

const data = [
  { key: 1, name: "John", age: 32 },
  { key: 2, name: "Doe", age: 25 },
];

describe("AntTablePlus Component", () => {
  it("renders table with visible columns", () => {
    const { container, getByText, queryByText } = render(
      <AntTablePlus columns={columns} dataSource={data} rowKey={"key"} />
    );

    const table = container.querySelector(".ant-table");
    expect(table).toBeInTheDocument();

    const nameColumn = getByText("Name");
    expect(nameColumn).toBeInTheDocument();

    const nameCell = getByText("John");
    expect(nameCell).toBeInTheDocument();

    const ageColumn = queryByText("Age");
    expect(ageColumn).not.toBeInTheDocument();

    const ageCell = queryByText("32");
    expect(ageCell).not.toBeInTheDocument();
  });

  it("renders table with pagination", () => {
    const { container, getByTitle } = render(
      <AntTablePlus
        columns={columns}
        dataSource={data}
        rowKey={"key"}
        pagination={{
          pageSize: 10,
          total: 20,
          current: 1,
          showTotal: (total) => `Total ${total} items`,
        }}
      />
    );

    const pagination = container.querySelector(".ant-pagination");
    expect(pagination).toBeInTheDocument();

    expect(pagination).toHaveTextContent("1");
    expect(pagination).toHaveTextContent("20");

    expect(getByTitle("Next Page")).toBeInTheDocument();
    expect(getByTitle("Previous Page")).toBeInTheDocument();
  });
});
