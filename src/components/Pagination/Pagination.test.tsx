import {
  render,
  screen,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import Pagination from "./Pagination";

describe("Pagination", () => {
  test(
    "renders pagination",
    () => {
      render(
        <Pagination
          currentPage={2}
          onPageChange={jest.fn()}
        />
      );

      expect(
        screen.getByText(
          /page 2/i
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(/prev/i)
      ).toBeInTheDocument();

      expect(
        screen.getByText(/next/i)
      ).toBeInTheDocument();
    }
  );

  test(
    "calls next page",
    async () => {
      const onPageChange =
        jest.fn();

      render(
        <Pagination
          currentPage={2}
          onPageChange={
            onPageChange
          }
        />
      );

      await userEvent.click(
        screen.getByText(/next/i)
      );

      expect(
        onPageChange
      ).toHaveBeenCalledWith(3);
    }
  );

  test(
    "calls previous page",
    async () => {
      const onPageChange =
        jest.fn();

      render(
        <Pagination
          currentPage={2}
          onPageChange={
            onPageChange
          }
        />
      );

      await userEvent.click(
        screen.getByText(/prev/i)
      );

      expect(
        onPageChange
      ).toHaveBeenCalledWith(1);
    }
  );

  test(
    "disables prev button on first page",
    () => {
      render(
        <Pagination
          currentPage={1}
          onPageChange={jest.fn()}
        />
      );

      expect(
        screen.getByText(/prev/i)
      ).toBeDisabled();
    }
  );
});