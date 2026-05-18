jest.mock("../hooks/useLocalStorage", () => ({
  __esModule: true,
  default: () => {
    return [["test"], jest.fn()];
  },
}));

jest.mock("../hooks/useMovies", () => ({
  __esModule: true,
  default: () => ({
    movies: [],
    loading: false,
  }),
}));

jest.mock("../hooks/useMovieDetails", () => ({
  __esModule: true,
  default: () => ({
    movie: {
      title: "Interstellar",
      overview: "space movie",
    },
    loading: false,
  }),
}));