import {
  render,
  screen,
} from "@testing-library/react";

import Loader from "./Loader";

describe("Loader", () => {
  test("renders loader", () => {
    render(<Loader />);

    expect(
      screen.getByTestId("loader")
    ).toBeInTheDocument();
  });

  test("renders 3 dots", () => {
    render(<Loader />);

    const spans =
      document.querySelectorAll("span");

    expect(spans).toHaveLength(3);
  });
});