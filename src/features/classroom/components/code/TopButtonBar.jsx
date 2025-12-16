import {useClassMode, CLASS_MODES} from '@/features/classroom/contexts/ClassModeContext';
import {useQuiz} from '@/features/classroom/contexts/QuizContext';
import {useEffect, useState} from 'react';
import QuizControlModal from './QuizControlModal';
import styles from './TopButtonBar.module.css';
import SnapshotSaveFeature from "@/features/classroom/components/snapshot/SnapshotSaveFeature.jsx";
import ModeButton from "./ModeButton.jsx";

const TopButtonBar = () => {
    return (
        <div className={styles.container}>
            <ModeButton/>
            <SnapshotSaveFeature/>

            {/*{showQuizModal && (*/}
            {/*    <QuizControlModal*/}
            {/*        onClose={() => setShowQuizModal(false)}*/}
            {/*        onStartQuiz={handleStartQuiz}*/}
            {/*    />*/}
            {/*)}*/}
        </div>
    );
};

export default TopButtonBar;