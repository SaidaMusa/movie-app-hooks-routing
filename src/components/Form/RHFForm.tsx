import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useFormsStore } from "../../store/useFormsStore";

const formSchema = yup.object({
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

type FormData = yup.InferType<typeof formSchema>;

type Props = {
  onClose: () => void;
};

export default function RHFForm({ onClose }: Props) {
  const addSubmission = useFormsStore((state) => state.addSubmission);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(formSchema) as any,
  });

  const onSubmit = (data: FormData) => {
    addSubmission({
      id: Date.now().toString(),
      createdAt: Date.now(),
      name: data.name,
      age: data.age,
      email: data.email,
      gender: data.gender,
      country: data.country,
      password: data.password,
      image: data.image ?? undefined,
    });

    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>RHF Form</h2>

      <input {...register("name")} placeholder="Name" />
      <p style={{ color: "red" }}>{errors.name?.message}</p>

      <input {...register("age")} placeholder="Age" type="number" />
      <p style={{ color: "red" }}>{errors.age?.message}</p>

      <input {...register("email")} placeholder="Email" />
      <p style={{ color: "red" }}>{errors.email?.message}</p>

      <select {...register("gender")}>
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <p style={{ color: "red" }}>{errors.gender?.message}</p>

      <input list="countries-rhf" {...register("country")} placeholder="Country" />
      <datalist id="countries-rhf">
        <option value="Uzbekistan" />
        <option value="Kazakhstan" />
        <option value="Kyrgyzstan" />
        <option value="Russia" />
        <option value="USA" />
      </datalist>
      <p style={{ color: "red" }}>{errors.country?.message}</p>

      <input type="file" accept="image/*" {...register("image")} />
      <p style={{ color: "red" }}>{errors.image?.message}</p>

      <input {...register("password")} type="password" placeholder="Password" />
      <p style={{ color: "red" }}>{errors.password?.message}</p>

      <button type="submit">Submit</button>
    </form>
  );
}