import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";

jest.mock("../pages/Home/Home", () => ({
  __esModule: true,
  default: () => <div>Home Page</div>,
}));

jest.mock("../pages/About/About", () => ({
  __esModule: true,
  default: () => <div>About Page</div>,
}));

jest.mock("../pages/NotFound", () => ({
  __esModule: true,
  default: () => <div>Not Found</div>,
}));

jest.mock("../layouts/MainLayout", () => ({
  __esModule: true,
  default: ({ children }: any) => <div>{children}</div>,
}));

describe("AppRoutes", () => {
  test("renders home route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  test("renders about route", () => {
    render(
      <MemoryRouter initialEntries={["/about"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText("About Page")).toBeInTheDocument();
  });

  test("renders not found route", () => {
    render(
      <MemoryRouter initialEntries={["/random"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText("Not Found")).toBeInTheDocument();
  });
});