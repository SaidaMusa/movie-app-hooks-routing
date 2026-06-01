import {
  render,
  screen,
} from "@testing-library/react";

import MovieList from "./MovieList";

import type { Movie } from "../../types/movie";

jest.mock(
  "../MovieCard/MovieCard",
  () => ({
    __esModule: true,
    default: ({
      movie,
    }: {
      movie: Movie;
    }) => (
      <div data-testid="movie-card">
        {movie.title}
      </div>
    ),
  })
);

const mockMovies: Movie[] = [
  {
    id: 1,
    title: "Interstellar",
    poster_path: "/test.jpg",
    overview: "Space movie",
  },
  {
    id: 2,
    title: "Batman",
    poster_path: "/batman.jpg",
    overview: "Hero movie",
  },
];

describe("MovieList", () => {
  test("renders all movies", () => {
    render(
      <MovieList movies={mockMovies} />
    );

    const cards =
      screen.getAllByTestId(
        "movie-card"
      );

    expect(cards).toHaveLength(2);

    expect(
      screen.getByText("Interstellar")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Batman")
    ).toBeInTheDocument();
  });
});