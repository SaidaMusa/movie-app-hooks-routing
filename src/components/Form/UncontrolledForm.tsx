import { useRef } from "react";
import { useFormsStore } from "../../store/useFormsStore";

function UncontrolledForm({ onClose }: { onClose: () => void }) {
  const addSubmission = useFormsStore((s) => s.addSubmission);

  const nameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const name = nameRef.current?.value || "";

    if (!/^[A-Z]/.test(name)) {
      alert("First letter must be uppercase");
      return;
    }

    addSubmission({
      id: Date.now().toString(),
      name,
      age: 20,
      email: "test@mail.com",
      gender: "male",
      country: "UZ",
      password: "",
      image: "",
      createdAt: Date.now(),
    });

    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} placeholder="Name" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default UncontrolledForm;