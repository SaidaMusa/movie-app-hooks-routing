import { render, screen, fireEvent } from "@testing-library/react";
import Flyout from "./Flyout";

jest.mock("../../store/useSelectedMovies", () => ({
  useSelectedMovies: () => ({
    selected: [
      {
        id: 1,
        title: "Batman",
        overview: "Movie",
      },
    ],
    clearSelected: jest.fn(),
  }),
}));

describe("Flyout", () => {
  beforeEach(() => {
    global.URL.createObjectURL = jest.fn(() => "mock-url");
    global.URL.revokeObjectURL = jest.fn();
  });

  test("renders flyout actions", () => {
    render(<Flyout />);

    fireEvent.click(screen.getByText(/actions/i));

    expect(screen.getByText(/download csv/i)).toBeInTheDocument();
  });

  test("downloads csv", () => {
    const clickMock = jest.fn();

    const originalCreateElement = document.createElement;

    document.createElement = jest.fn((tagName) => {
      const el = originalCreateElement.call(document, tagName);

      if (tagName === "a") {
        el.click = clickMock;
      }

      return el;
    }) as any;

    render(<Flyout />);

    fireEvent.click(screen.getByText(/actions/i));
    fireEvent.click(screen.getByText(/download csv/i));

    expect(clickMock).toHaveBeenCalled();

    document.createElement = originalCreateElement;
  });
});