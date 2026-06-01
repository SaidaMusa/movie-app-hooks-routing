import {
  render,
  screen,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { MemoryRouter } from "react-router-dom";

import Home from "./Home";

beforeEach(() => {
  jest
    .spyOn(console, "error")
    .mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

jest.mock(
  "../../hooks/useLocalStorage",
  () => ({
    __esModule: true,
    default: () => [
      [],
      jest.fn(),
    ],
  })
);

jest.mock(
  "../../hooks/useMovies",
  () => ({
    __esModule: true,
    default: () => ({
      movies: [
        {
          id: 1,
          title: "Interstellar",
          poster_path:
            "/test.jpg",
          overview:
            "Space movie",
        },
      ],
      loading: false,
    }),
  })
);

jest.mock(
  "../../components/MovieList/MovieList",
  () => ({
    __esModule: true,
    default: () => (
      <div>Movie List</div>
    ),
  })
);

jest.mock(
  "../../components/Pagination/Pagination",
  () => ({
    __esModule: true,
    default: () => (
      <div>Pagination</div>
    ),
  })
);

describe("Home Page", () => {
  test(
    "renders movies when loaded",
    () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );

      expect(
        screen.getByText(
          "Movie List"
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          "Pagination"
        )
      ).toBeInTheDocument();
    }
  );

  test(
    "handles search input change",
    async () => {
      const user =
        userEvent.setup();

      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );

      const input =
        screen.getByPlaceholderText(
          /search movie/i
        );

      await user.type(
        input,
        "Batman"
      );

      expect(input).toHaveValue(
        "Batman"
      );
    }
  );
});