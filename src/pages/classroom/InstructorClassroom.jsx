import styles from './InstructorClassroom.module.css';

import ClassHeader from "@/features/classroom/layouts/ClassHeader.jsx";
import ClassroomSidebar from "@/features/classroom/layouts/ClassroomSidebar.jsx";
import {useSidebar} from "@/features/classroom/hooks/useSidebar.js";

const InstructorClassroom = () => {
    const { collapsed, toggle } = useSidebar();

    return (
        <div className={styles.container}>

            {/* 고정 헤더 */}
            <ClassHeader
                className="웹 프로그래밍 기초"
                status="live"
                participantCount={24}
                totalParticipants={30}
                isInstructor={true}
            />

            {/* 토글 버튼 */}
            <button
                className={styles.toggleBtn}
                style={{ left: collapsed ? "0px" : "299px" }}
                onClick={toggle}>
                {collapsed ? '›' : '‹'}
            </button>

            {/* 사이드바 */}
            <ClassroomSidebar />

            {/* 스크롤 영역 */}
            <div
                className={styles.scrollArea}
                style={{ left: collapsed ? "0px" : "300px" }}
            >
                <div className={styles.page}>
                    <div className={styles.content}>
                        컨텐츠 1
                        {/*<LiveKitPanel />*/}
                    </div>
                </div>

                <div className={styles.page}>
                    <div className={styles.content}>
                        컨텐츠 2
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorClassroom;