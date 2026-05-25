import { getMovies } from "./api";

globalThis.fetch = jest.fn();

describe("getMovies", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("success case", async () => {

    (fetch as jest.Mock).mockResolvedValueOnce({
      
      ok: true,
      json: async () => ({ results: [{ id: 1, title: "Movie" }] }),
    });

    const data = await getMovies(1, "");

    expect(data.results[0].title).toBe("Movie");
  });
});