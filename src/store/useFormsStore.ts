import { create } from "zustand";

export type FormSubmission = {
  id: string;
  name: string;
  age: number;
  email: string;
  gender: string;
  country: string;
  image?: string;
  password?: string;
  createdAt: number;
};

type FormsStore = {
  submissions: FormSubmission[];
  addSubmission: (submission: FormSubmission) => void;
  removeSubmission: (id: string) => void;
};

export const useFormsStore = create<FormsStore>((set) => ({
  submissions: [],
  addSubmission: (submission) =>
    set((state) => ({
      submissions: [submission, ...state.submissions],
    })),
  removeSubmission: (id) =>
    set((state) => ({
      submissions: state.submissions.filter((s) => s.id !== id),
    })),
}));