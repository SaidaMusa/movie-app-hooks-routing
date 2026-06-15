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
        src={item.image || "https://via.placeholder.com/120x120?text=No+Image"}
        alt={item.name}
      />

      <div className={styles.content}>
        <h3 className={styles.name}>{item.name}</h3>

        <p className={styles.text}>
          <strong>Age:</strong> {item.age}
        </p>

        <p className={styles.text}>
          <strong>Email:</strong> {item.email}
        </p>

        <p className={styles.text}>
          <strong>Gender:</strong> {item.gender}
        </p>

        <p className={styles.text}>
          <strong>Country:</strong> {item.country}
        </p>

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