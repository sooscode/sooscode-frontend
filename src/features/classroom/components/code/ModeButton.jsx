import styles from "@/features/classroom/components/code/TopButtonBar.module.css";
import { CLASS_MODES, useClassMode } from "@/features/classroom/contexts/ClassModeContext.jsx";
import { useQuiz } from "@/features/classroom/contexts/QuizContext.jsx";
import { useState } from "react";

const ModeButton = () => {
    const { mode, changeMode } = useClassMode();
    const { startQuiz } = useQuiz();
    const [showQuizModal, setShowQuizModal] = useState(false);

    const handleModeChange = (newMode) => {
        // 퀴즈 모드면 모달 처리 (나중에)
        // if (newMode === CLASS_MODES.QUIZ) {
        //     setShowQuizModal(true);
        //     return;
        // }

        changeMode(newMode);
    };

    const getModeLabel = (modeType) => {
        switch (modeType) {
            case CLASS_MODES.VIEW_ONLY:
                return "읽기 전용";
            case CLASS_MODES.FREE_PRACTICE:
                return "자유 실습";
            default:
                return "";
        }
    };

    const getModeIcon = (modeType) => {
        switch (modeType) {
            case CLASS_MODES.VIEW_ONLY:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                );
            case CLASS_MODES.FREE_PRACTICE:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2">
                        <path d="M12 20h9"/>
                        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.buttons}>
            {Object.values(CLASS_MODES).map((modeType) => (
                <button
                    key={modeType}
                    className={`${styles.button} ${mode === modeType ? styles.active : ""}`}
                    onClick={() => handleModeChange(modeType)}
                >
                    <span className={styles.icon}>{getModeIcon(modeType)}</span>
                    <span className={styles.text}>{getModeLabel(modeType)}</span>
                </button>
            ))}
        </div>
    );
};

export default ModeButton;
