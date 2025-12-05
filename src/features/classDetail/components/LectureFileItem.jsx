import styles from "./LectureFileItem.module.css";

export default function LectureFileItem({ item }) {
  return (
    <div className={styles.row}>
      <div className={styles.info}>
        <div className={styles.name}>{item.name}</div>
        <div className={styles.date}>{item.date}</div>
      </div>
    </div>
  );
}
