import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema, FormData } from "../../schema/formSchema";

export default function RHFForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Name" />
      <p>{errors.name?.message}</p>

      <input {...register("age")} placeholder="Age" type="number" />
      <p>{errors.age?.message}</p>

      <input {...register("email")} placeholder="Email" />
      <p>{errors.email?.message}</p>

      <select {...register("gender")}>
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <p>{errors.gender?.message}</p>

      <input {...register("country")} placeholder="Country" />
      <p>{errors.country?.message}</p>

      <input {...register("image")} placeholder="Image (optional)" />
      <p>{errors.image?.message}</p>

      <input {...register("password")} type="password" />
      <p>{errors.password?.message}</p>

      <button type="submit">Submit</button>
    </form>
  );
}