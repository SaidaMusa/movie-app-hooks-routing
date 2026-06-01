import { create } from "zustand";

export type SelectedMovie = {
  id: number;
  title: string;
  overview: string;
};

type Store = {
  selected: SelectedMovie[];

  toggleMovie: (
    movie: SelectedMovie
  ) => void;

  clearSelected: () => void;

  isSelected: (id: number) => boolean;
};

export const useSelectedMovies =
  create<Store>((set, get) => ({
    selected: [],

    toggleMovie: (movie) => {
      const exists = get().selected.some(
        (m) => m.id === movie.id
      );

      if (exists) {
        set({
          selected:
            get().selected.filter(
              (m) =>
                m.id !== movie.id
            ),
        });
      } else {
        set({
          selected: [
            ...get().selected,
            movie,
          ],
        });
      }
    },

    clearSelected: () =>
      set({ selected: [] }),

    isSelected: (id) =>
      get().selected.some(
        (m) => m.id === id
      ),
  }));