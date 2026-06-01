import {
  render,
  screen,
} from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import AppRoutes from "./AppRoutes";

import { ThemeProvider } from "../context/ThemeContext";

describe("AppRoutes", () => {
  test("renders home route", () => {
    render(
      <ThemeProvider>
        <MemoryRouter
          initialEntries={["/"]}
        >
          <AppRoutes />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(
      screen.getByPlaceholderText(
        /search movie/i
      )
    ).toBeInTheDocument();
  });

  test("renders about route", () => {
    render(
      <ThemeProvider>
        <MemoryRouter
          initialEntries={[
            "/about",
          ]}
        >
          <AppRoutes />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(
      screen.getByText(
        /about app/i
      )
    ).toBeInTheDocument();
  });
});