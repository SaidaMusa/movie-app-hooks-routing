import { create } from "zustand";

export type FormSubmission = {
  id: string;
  name: string;
  age: number;
  email: string;
  gender: string;
  country: string;
  image: string;
  createdAt: number;
  password?: string; 
};

type Store = {
  submissions: FormSubmission[];
  addSubmission: (data: FormSubmission) => void;
  removeSubmission: (id: string) => void;
};

export const useFormsStore = create<Store>((set) => ({
  submissions: [],

  addSubmission: (data) =>
    set((state) => ({
      submissions: [data, ...state.submissions],
    })),

  removeSubmission: (id) =>
    set((state) => ({
      submissions: state.submissions.filter((i) => i.id !== id),
    })),
}));