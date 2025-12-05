import styles from "./StudentItem.module.css";

export default function StudentItem({ item }) {
  return (
    <div className={styles.row}>
      <div className={styles.avatar}>{item.name[0]}</div>

      <div className={styles.info}>
        <div className={styles.name}>{item.name}</div>
        <div className={styles.email}>{item.email}</div>
      </div>
    </div>
  );
}
