import "@testing-library/jest-dom";

import {
  TextDecoder,
  TextEncoder,
} from "util";

global.TextEncoder =
  TextEncoder as typeof global.TextEncoder;

global.TextDecoder =
  TextDecoder as typeof global.TextDecoder;

Object.defineProperty(
  window,
  "localStorage",
  {
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  }
);