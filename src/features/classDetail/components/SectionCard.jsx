import styles from "./SectionCard.module.css";

export default function SectionCard({ title, count, list = [], renderItem, buttonText }) {
  return (
    <div className={styles.card}>

      {/* Header */}
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <span className={styles.count}>{count}개</span>
      </div>

      {/* List */}
      <div className={styles.list}>
        {list.map((item, idx) => (
          <div className={styles.listItem} key={idx}>
            {renderItem(item)}
          </div>
        ))}
      </div>

      {/* Button */}
      {buttonText && (
        <button className={styles.uploadBtn}>{buttonText}</button>
      )}
    </div>
  );
}
