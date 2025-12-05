import SectionCard from "./SectionCard";
import SnapshotItem from "./SnapshotItem";
import { SNAPSHOT_DUMMY } from "@/constants/dummy/classDetail";

export default function SnapshotCard() {
  return (
    <SectionCard
      title="코드 스냅샷"
      count={SNAPSHOT_DUMMY.length}
      list={SNAPSHOT_DUMMY}
      renderItem={(item) => <SnapshotItem item={item} />}
      buttonText="스냅샷 등록"
    />
  );
}
