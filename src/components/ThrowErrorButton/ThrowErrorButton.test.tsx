import {
  render,
  screen,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import ThrowErrorButton from "./ThrowErrorButton";

describe(
  "ThrowErrorButton",
  () => {
    test(
      "renders button",
      () => {
        render(
          <ThrowErrorButton />
        );

        expect(
          screen.getByRole(
            "button"
          )
        ).toBeInTheDocument();
      }
    );

    test(
      "throws error on click",
      async () => {
        const consoleSpy =
          jest
            .spyOn(
              console,
              "error"
            )
            .mockImplementation(
              () => {}
            );

        render(
          <ThrowErrorButton />
        );

        await expect(
          userEvent.click(
            screen.getByRole(
              "button"
            )
          )
        ).rejects.toThrow();

        consoleSpy.mockRestore();
      }
    );
  }
);