import { useRef, useState } from "react";
import { useFormsStore } from "../../store/useFormsStore";

type Props = {
  onClose: () => void;
};

function Form({ onClose }: Props) {
  const addSubmission = useFormsStore((state) => state.addSubmission);

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string>("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const name = nameRef.current?.value.trim() || "";
    const age = Number(ageRef.current?.value);
    const email = emailRef.current?.value.trim() || "";
    const gender = genderRef.current?.value || "";
    const country = countryRef.current?.value.trim() || "";
    const image = imageRef.current?.value.trim();

    // ❌ VALIDATION
    if (!name || !email || !gender || !country) {
      setError("All fields except image are required");
      return;
    }

    if (age < 1 || age > 120 || isNaN(age)) {
      setError("Age must be between 1 and 120");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    const newSubmission = {
      id: Date.now().toString(),
      name,
      age,
      email,
      gender,
      country,
      image: image || "https://via.placeholder.com/100",
      createdAt: Date.now(),
    };

    addSubmission(newSubmission);

    // reset
    if (nameRef.current) nameRef.current.value = "";
    if (ageRef.current) ageRef.current.value = "";
    if (emailRef.current) emailRef.current.value = "";
    if (genderRef.current) genderRef.current.value = "";
    if (countryRef.current) countryRef.current.value = "";
    if (imageRef.current) imageRef.current.value = "";

    setError("");
    onClose();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Submission</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input ref={nameRef} placeholder="Name" />
      <input ref={ageRef} placeholder="Age" type="number" />
      <input ref={emailRef} placeholder="Email" />

      <select ref={genderRef}>
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <input ref={countryRef} placeholder="Country" />
      <input ref={imageRef} placeholder="Image URL (optional)" />

      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;