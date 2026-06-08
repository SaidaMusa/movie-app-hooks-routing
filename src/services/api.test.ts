import { getMovies } from "./api";

global.fetch =
  jest.fn() as jest.Mock;

describe("getMovies", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("success case", async () => {
    (
      fetch as jest.Mock
    ).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          {
            id: 1,
            title: "Movie",
          },
        ],
      }),
    });

    const data =
      await getMovies(1, "");

    expect(
      data.results[0].title
    ).toBe("Movie");
  });
});