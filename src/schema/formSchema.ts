import * as yup from "yup";

export const formSchema = yup.object({
  name: yup.string().required("Name is required"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .min(1, "Age must be at least 1")
    .max(120, "Age must be at most 120")
    .required("Age is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  gender: yup.string().required("Gender is required"),
  country: yup.string().required("Country is required"),
  image: yup.string().nullable().optional().default(undefined),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export type FormData = yup.InferType<typeof formSchema>;