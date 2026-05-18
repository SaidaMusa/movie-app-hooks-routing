import { useState } from "react";

function ThrowErrorButton() {
  const [hasError, setHasError] =
    useState<boolean>(false);

  if (hasError) {
    throw new Error(
      "Manual test error"
    );
  }

  return (
    <button
      onClick={() =>
        setHasError(true)
      }
      style={{
        background: "crimson",
        color: "white",
        padding: "10px 16px",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      Throw Error
    </button>
  );
}

export default ThrowErrorButton;