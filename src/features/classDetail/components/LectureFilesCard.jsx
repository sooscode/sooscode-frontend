import SectionCard from "./SectionCard";
import LectureFileItem from "./LectureFileItem";
import { CLASS_MATERIAL_DUMMY } from "@/constants/dummy/classDetail";

export default function LectureFilesCard() {
  return (
    <SectionCard
      title="강의 자료"
      count={CLASS_MATERIAL_DUMMY.length}
      list={CLASS_MATERIAL_DUMMY}
      renderItem={(item) => <LectureFileItem item={item} />}
      buttonText="파일 등록"
    />
  );
}
