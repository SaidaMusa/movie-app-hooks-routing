import { render,screen } from "@testing-library/react";
import MovieCard from "./MovieCard";
import { MemoryRouter } from "react-router-dom";
import type { Movie } from "../../types/movie";

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useSearchParams: () => [new URLSearchParams(), jest.fn()],
  };
});

const mockMovie: Movie = {
  id: 1,
  title: "Interstellar",
  poster_path: "/test.jpg",
  overview: "Space movie",
};

describe("MovieCard", () => {
  test("renders movie title", () => {
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );

    expect(screen.getByText("Interstellar")).toBeInTheDocument();
  });

  test("renders image with correct src", () => {
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );

    const img = screen.getByRole("img");

    expect(img).toHaveAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500${mockMovie.poster_path}`
    );
  });

  test("creates link with details query param", () => {
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute(
      "href",
      expect.stringContaining("details=1")
    );
  });
});