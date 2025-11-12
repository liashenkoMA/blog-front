import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { render, screen } from "@testing-library/react";
import Pagination from "@/app/_components/Pagination/Pagination";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

const mockUseSearchParams = useSearchParams as jest.MockedFunction<
  typeof useSearchParams
>;

describe("Pagination", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Не рендерится при pages <= 1", () => {
    mockUseSearchParams.mockReturnValueOnce(
      new URLSearchParams("") as ReadonlyURLSearchParams
    );
    const { container } = render(<Pagination total={4} slug="/blog" />);
    expect(container.firstChild).toBeNull();
  });

  it("Рендерится при pages < 5", () => {
    mockUseSearchParams.mockReturnValueOnce(
      new URLSearchParams("?page=2") as ReadonlyURLSearchParams
    );

    render(<Pagination total={24} slug="/blog" />);
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.queryByText(". . .")).not.toBeInTheDocument();
  });

  it("Рендерится при page > 5", () => {
    mockUseSearchParams.mockReturnValueOnce(
      new URLSearchParams("?page=5") as ReadonlyURLSearchParams
    );

    render(<Pagination total={40} slug="/blog" />);
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText(". . .")).toBeInTheDocument();
  });

  it("Деактивируем кнопку вправо со стрелочкой", () => {
    mockUseSearchParams.mockReturnValueOnce(
      new URLSearchParams("?page=10") as ReadonlyURLSearchParams
    );
    render(<Pagination total={60} slug="/blog" />);
    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.queryByTestId("button-right-link")).not.toBeInTheDocument();
  });

  it("Деактивируем кнопку влево со стрелочкой", () => {
    mockUseSearchParams.mockReturnValueOnce(
      new URLSearchParams("?page=1") as ReadonlyURLSearchParams
    );
    render(<Pagination total={60} slug="/blog" />);
    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.queryByTestId("button-left-link")).not.toBeInTheDocument();
  });

  it("Подсвечивается активная страница", () => {
    mockUseSearchParams.mockReturnValueOnce(
      new URLSearchParams("?page=3") as ReadonlyURLSearchParams
    );
    render(<Pagination total={60} slug="/blog" />);
    expect(screen.getByText("3")).toHaveClass("pagination__btn_type_active");
  });
});
