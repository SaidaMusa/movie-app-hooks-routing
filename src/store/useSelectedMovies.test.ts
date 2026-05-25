import { useSelectedMovies } from "./useSelectedMovies";

describe("useSelectedMovies store", () => {
  beforeEach(() => {
    useSelectedMovies
      .getState()
      .clearSelected();
  });

  test("adds movie", () => {
    useSelectedMovies
      .getState()
      .toggleMovie({
        id: 1,
        title: "Batman",
        overview: "Movie",
      });

    expect(
      useSelectedMovies
        .getState()
        .selected
    ).toHaveLength(1);
  });

  test("removes movie if already selected", () => {
    const movie = {
      id: 1,
      title: "Batman",
      overview: "Movie",
    };

    useSelectedMovies
      .getState()
      .toggleMovie(movie);

    useSelectedMovies
      .getState()
      .toggleMovie(movie);

    expect(
      useSelectedMovies
        .getState()
        .selected
    ).toHaveLength(0);
  });

  test("checks selected movie", () => {
    useSelectedMovies
      .getState()
      .toggleMovie({
        id: 5,
        title: "Interstellar",
        overview: "Space",
      });

    expect(
      useSelectedMovies
        .getState()
        .isSelected(5)
    ).toBe(true);
  });

  test("clears selected movies", () => {
    useSelectedMovies
      .getState()
      .toggleMovie({
        id: 1,
        title: "Batman",
        overview: "Movie",
      });

    useSelectedMovies
      .getState()
      .clearSelected();

    expect(
      useSelectedMovies
        .getState()
        .selected
    ).toEqual([]);
  });
});