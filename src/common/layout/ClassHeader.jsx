import styles from "./ClassHeader.module.css";

export default function ClassHeader({ title = "천재교육 풀스택 12기 AI 풀스택" }) {
  return (
    <header className={styles.header}>
      {/* LEFT */}
      <div className={styles.left}>
        <span className={styles.brand}>//SoosCode</span>
      </div>

      {/* CENTER */}
      <div className={styles.center}>
        <span className={styles.title}>{title}</span>
      </div>

      {/* RIGHT */}
      <div className={styles.right}>
        {/* 필요하면 버튼 넣는 곳 */}
      </div>
    </header>
  );
}
