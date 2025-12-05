import ClassHeader from "../../common/layout/ClassHeader.jsx";
import ClassDetailSection from "../../features/classDetail/layout/classDetailSection.jsx";
import styles from "./StudentClassDetail.module.css";

export default function StudentClassDetail() {
  return (
    <div className={styles.app}>
      <ClassHeader/>
      <ClassDetailSection/>
    </div>
    
  );
}