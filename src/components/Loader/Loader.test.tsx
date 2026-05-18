import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

test("renders loader wrapper", () => {
  render(<Loader />);

  expect(document.querySelector(".wrapper")).toBeInTheDocument();
});

test("renders 3 spans", () => {
  render(<Loader />);

  const spans = document.querySelectorAll("span");
  expect(spans.length).toBe(3);
});