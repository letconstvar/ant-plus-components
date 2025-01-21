import { fireEvent, render, screen } from "@testing-library/react";
import AntSearchFormPlus from "@/components/AntSearchFormPlus/index";
import type { ColumnPlus } from "@/types/index";
import "@testing-library/jest-dom";
import { Form } from "antd";

const columns: ColumnPlus[] = [
  {
    title: "Search",
    dataIndex: "search",
    key: "search",
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
  return <AntSearchFormPlus form={form} columns={columns} />;
};

describe("AntSearchFormPlus 组件", () => {
  it("正确渲染 AntSearchFormPlus 组件", () => {
    const { container } = render(<Wrapper />);
    expect(container.querySelector("form")).toBeInTheDocument();
  });

  it("正确渲染 input search 输入表单", () => {
    render(<Wrapper />);
    expect(screen.getByLabelText("Search")).toBeInTheDocument();
  });

  it("正确获取 input search 输入表单的值", () => {
    const { container, getByLabelText } = render(<Wrapper />);
    const input = getByLabelText("Search");

    fireEvent.change(input, { target: { value: "search value" } });

    expect(container.querySelector("#search")).toHaveValue("search value");
  });
});