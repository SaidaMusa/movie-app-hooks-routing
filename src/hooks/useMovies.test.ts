import {
  renderHook,
  waitFor,
} from "@testing-library/react";

import useMovies from "./useMovies";

import { getMovies } from "../services/api";

import {
  createWrapper,
} from "../tests/queryWrapper";

jest.mock("../services/api", () => ({
  getMovies: jest.fn(),
}));

describe(
  "useMovies",
  () => {
    test(
      "fetches movies successfully",
      async () => {
        (
          getMovies as jest.Mock
        ).mockResolvedValue({
          results: [
            {
              id: 1,
              title:
                "Batman",
              overview:
                "test",
            },
          ],
        });

        const {
          result,
        } = renderHook(
          () =>
            useMovies(
              1,
              ""
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
            .movies[0]
            .title
        ).toBe(
          "Batman"
        );
      }
    );

    test(
      "handles api error",
      async () => {
        (
          getMovies as jest.Mock
        ).mockRejectedValue(
          new Error(
            "API Error"
          )
        );

        const {
          result,
        } = renderHook(
          () =>
            useMovies(
              1,
              ""
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
            .movies
        ).toEqual([]);
      }
    );
  }
);