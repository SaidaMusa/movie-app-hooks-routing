import * as yup from "yup";

export const formSchema = yup.object({
  name: yup.string().required(),
  age: yup.number().required().min(1).max(120),
  email: yup.string().email().required(),
  gender: yup.string().required(),
  country: yup.string().required(),
  image: yup.string().notRequired(),
  password: yup.string().required(),
});

export type FormData = yup.InferType<typeof formSchema>;