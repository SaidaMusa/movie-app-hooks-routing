import { FormSubmission } from "../../store/useFormsStore";
import styles from "./SubmissionCard.module.css";

type Props = {
  item: FormSubmission;
  onDelete?: (id: string) => void;
};

function SubmissionCard({ item, onDelete }: Props) {
  return (
    <div className={styles.card}>
     <img
  className={styles.image}
  src={item.image || "https://via.placeholder.com/100"}
  alt={item.name}
/>

      <div className={styles.content}>
        <h3 className={styles.name}>{item.name}</h3>

        <p className={styles.text}>Age: {item.age}</p>
        <p className={styles.text}>Email: {item.email}</p>
        <p className={styles.text}>Gender: {item.gender}</p>
        <p className={styles.text}>Country: {item.country}</p>

        <button
          className={styles.deleteBtn}
          onClick={() => onDelete?.(item.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default SubmissionCard;