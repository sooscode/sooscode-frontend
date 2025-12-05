import LectureFilesCard from "../components/LectureFilesCard";
import SnapshotCard from "../components/SnapshotCard";
import StudentListCard from "../components/StudentListCard";
import styles from "./ClassDetailSection.module.css";


export default function ClassDetailSection(){
  return (
    <main className={styles.mainContent}>
      <LectureFilesCard />
      <SnapshotCard />
      <StudentListCard />
    </main>
    
  );
}