import {
  render,
  screen,
} from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import AppRoutes from "./AppRoutes";

import { ThemeProvider } from "../context/ThemeContext";
import { createWrapper } from "../tests/queryWrapper";

describe("AppRoutes", () => {
  const Wrapper = createWrapper();

  test("renders home route", () => {
    render(
      <Wrapper>
        <ThemeProvider>
          <MemoryRouter initialEntries={["/"]}>
            <AppRoutes />
          </MemoryRouter>
        </ThemeProvider>
      </Wrapper>
    );

    expect(
      screen.getByPlaceholderText(
        /search movie/i
      )
    ).toBeInTheDocument();
  });

  test("renders about route", () => {
    render(
      <Wrapper>
        <ThemeProvider>
          <MemoryRouter
            initialEntries={["/about"]}
          >
            <AppRoutes />
          </MemoryRouter>
        </ThemeProvider>
      </Wrapper>
    );

    expect(
      screen.getByText(/about app/i)
    ).toBeInTheDocument();
  });
});