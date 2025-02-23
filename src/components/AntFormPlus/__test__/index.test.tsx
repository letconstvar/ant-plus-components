import React from "react";
import { fireEvent, render, screen, act } from "@testing-library/react";
import AntFormPlus from "../index";
import type { ColumnPlus } from "../../../types";
import "@testing-library/jest-dom";
import { Form } from "antd";

const columns: ColumnPlus[] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    formItemProps: {
      rules: [
        { required: true, message: "${name} is required", type: "string" },
      ],
    },
  },
];

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

const Wrapper = () => {
  const [form] = Form.useForm();
  return <AntFormPlus form={form} columns={columns} />;
};

describe("AntFormPlus 组件", () => {
  it("正确渲染 AntFormPlus 组件", () => {
    const { container } = render(<Wrapper />);
    expect(container.querySelector("form")).toBeInTheDocument();
  });

  it("正确渲染 input name 输入表单", () => {
    render(<Wrapper />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("正确渲染 input name 输入表单为必填项", () => {
    render(<Wrapper />);
    const input = screen.getByLabelText("Name");
    expect(input).toBeRequired();
  });

  it("正确获取 input name 输入表单的值", async () => {
    const { container, getByLabelText } = render(<Wrapper />);
    const input = getByLabelText("Name");

    await act(async () => {
      fireEvent.change(input, { target: { value: "111" } });
    });

    expect(container.querySelector("#name")).toHaveValue("111");
  });
});
