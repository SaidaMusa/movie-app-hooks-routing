import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";

import {
  ThemeProvider,
  useTheme,
} from "./ThemeContext";

function TestComponent() {
  const {
    theme,
    toggleTheme,
  } = useTheme();

  return (
    <>
      <span>{theme}</span>

      <button
        onClick={
          toggleTheme
        }
      >
        toggle
      </button>
    </>
  );
}

describe(
  "ThemeContext",
  () => {
    test(
      "toggles theme",
      () => {
        render(
          <ThemeProvider>
            <TestComponent />
          </ThemeProvider>
        );

        expect(
          screen.getByText(
            "dark"
          )
        ).toBeInTheDocument();

        fireEvent.click(
          screen.getByText(
            /toggle/i
          )
        );

        expect(
          screen.getByText(
            "light"
          )
        ).toBeInTheDocument();
      }
    );

    test(
      "sets body data-theme",
      () => {
        render(
          <ThemeProvider>
            <TestComponent />
          </ThemeProvider>
        );

        expect(
          document.body.getAttribute(
            "data-theme"
          )
        ).toBe("dark");
      }
    );
  }
);