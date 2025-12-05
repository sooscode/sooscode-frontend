import SectionCard from "./SectionCard";
import StudentItem from "./StudentItem";
import { STUDENT_LIST_DUMMY } from "@/constants/dummy/classDetail";

export default function StudentListCard() {
  return (
    <SectionCard
      title="수강생 리스트"
      count={STUDENT_LIST_DUMMY.length}
      list={STUDENT_LIST_DUMMY}
      renderItem={(item) => <StudentItem item={item} />}
    />
  );
}
