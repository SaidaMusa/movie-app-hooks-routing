import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./Home";

const mockSetSearchParams = jest.fn();

jest.mock("react-router-dom", () => ({
  useSearchParams: () => [
    {
      get: (key: string) => {
        if (key === "page") return "1";
        if (key === "search") return "";
        if (key === "details") return null;
      },
    },
    mockSetSearchParams,
  ],
}));

jest.mock("../../hooks/useMovies", () => ({
  default: () => ({
    movies: [
      { id: 1, title: "Interstellar", poster_path: "", overview: "" },
    ],
    loading: false,
  }),
}));

const setRecentSearches = jest.fn();

jest.mock("../../hooks/useLocalStorage", () => ({
  default: () => [["batman"], setRecentSearches],
}));

jest.mock("../../components/MovieList/MovieList", () => () => (
  <div>MovieList</div>
));

jest.mock("../../components/Pagination/Pagination", () => () => (
  <div>Pagination</div>
));

jest.mock("../../components/SearchBar/SearchBar", () => (props: any) => (
  <input
    data-testid="search"
    value={props.value}
    onChange={(e) => props.onChange(e.target.value)}
  />
));

jest.mock("../../hooks/useLocalStorage", () => ({
  default: () => {
    return [["test"], jest.fn()];
  },
}));

jest.mock("../../components/Loader/Loader", () => () => (
  <div>Loading...</div>
));

jest.mock("../../components/ThrowErrorButton/ThrowErrorButton", () => () => (
  <button>Throw Error</button>
));

jest.mock("../Details/Details", () => () => <div>Details</div>);

describe("Home Page", () => {
  test("renders movies when loaded", () => {
    render(<Home />);

    expect(screen.getByText("MovieList")).toBeInTheDocument();
    expect(screen.getByText("Pagination")).toBeInTheDocument();
  });

  test("handles search input change", () => {
    render(<Home />);

    const input = screen.getByTestId("search");

    fireEvent.change(input, { target: { value: "batman" } });

    expect(mockSetSearchParams).toHaveBeenCalled();
  });

  test("shows loader when loading", () => {
    jest.resetModules();

    jest.doMock("../../hooks/useMovies", () => ({
      default: () => ({
        movies: [],
        loading: true,
      }),
    }));

    render(<Home />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});