import {
  render,
  screen,
} from "@testing-library/react";

import Details from "./Details";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "1" }),
}));

jest.mock(
  "../../hooks/useMovieDetails",
  () => ({
    __esModule: true,
    default: jest.fn(() => ({
      movie: {
        id: 1,
        title: "Interstellar",
        overview: "Space movie",
        vote_average: 8.5,
        backdrop_path:
          "/test.jpg",
      },
      loading: false,
    })),
  })
);

describe("Details Page", () => {
  test(
    "renders movie details",
    () => {
      render(<Details />);

      expect(
        screen.getByText(
          "Interstellar"
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          /space movie/i
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(/8.5/)
      ).toBeInTheDocument();
    }
  );
});