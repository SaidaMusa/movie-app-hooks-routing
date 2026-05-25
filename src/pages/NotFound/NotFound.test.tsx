import {
  render,
  screen,
} from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import NotFound from "./NotFound";

describe("NotFound", () => {
  test(
    "renders page",
    () => {
      render(
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>
      );

      expect(
        screen.getByText(
          /not found/i
        )
      ).toBeInTheDocument();
    }
  );
});