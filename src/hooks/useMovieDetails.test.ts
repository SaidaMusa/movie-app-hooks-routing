import {
  renderHook,
  waitFor,
} from "@testing-library/react";

import useMovieDetails from "./useMovieDetails";

import {
  getMovieDetails,
} from "../services/api";

import {
  createWrapper,
} from "../tests/queryWrapper";

jest.mock("../services/api", () => ({
  getMovieDetails:
    jest.fn(),
}));

describe(
  "useMovieDetails",
  () => {
    test(
      "fetches movie details successfully",
      async () => {
        (
          getMovieDetails as jest.Mock
        ).mockResolvedValue({
          id: 1,
          title:
            "Interstellar",
          overview:
            "Space movie",
          vote_average: 9,
        });

        const {
          result,
        } = renderHook(
          () =>
            useMovieDetails(
              "1"
            ),
          {
            wrapper:
              createWrapper(),
          }
        );

        await waitFor(() => {
          expect(
            result.current
              .loading
          ).toBe(false);
        });

        expect(
          result.current
            .movie
            ?.title
        ).toBe(
          "Interstellar"
        );
      }
    );

    test(
      "handles api error",
      async () => {
        (
          getMovieDetails as jest.Mock
        ).mockRejectedValue(
          new Error(
            "API Error"
          )
        );

        const {
          result,
        } = renderHook(
          () =>
            useMovieDetails(
              "1"
            ),
          {
            wrapper:
              createWrapper(),
          }
        );

        await waitFor(() => {
          expect(
            result.current
              .loading
          ).toBe(false);
        });

        expect(
          result.current
            .movie
        ).toBeNull();

        expect(
          result.current
            .error
        ).toBeTruthy();
      }
    );
  }
);