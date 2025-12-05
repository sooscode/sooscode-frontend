import styles from "./SnapshotItem.module.css";

export default function SnapshotItem({ item }) {
  return (
    <div className={styles.row}>
      <div className={styles.info}>
        <div className={styles.name}>{item.name}</div>
        <div className={styles.date}>{item.date}</div>
      </div>
    </div>
  );
}
