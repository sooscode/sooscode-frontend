import styles from "@/features/codepractice/layout/CodePracticeHeader.module.css";
import CodePracticeHeader from "@/features/codepractice/layout/CodePracticeHeader";
import CodePracticeSidebar from "@/features/codepractice/layout/CodePracticeSidebar";
import CodePracticeSection from "@/features/codepractice/layout/CodePracticeSection";


export default function CodePracticePage() {
  return (
    <div>
      <CodePracticeHeader />

      <div className={styles.ContentWrapper}>
        <CodePracticeSidebar />
        <CodePracticeSection />
      </div>
    </div>
  );
}
