import { useState } from 'react';
import styles from './QuizControlModal.module.css';

// 테스트용 샘플 문제들
const SAMPLE_PROBLEMS = [
    {
        id: 'quiz_001',
        title: '두 수의 합',
        description: '두 개의 정수 a와 b를 입력받아 합을 반환하는 함수를 작성하세요.',
        difficulty: 'EASY',
        initialCode: 'function solution(a, b) {\n  // 여기에 코드를 작성하세요\n  \n}',
        examples: [
            { input: '(1, 2)', output: '3' },
            { input: '(5, 7)', output: '12' },
        ],
        testCases: [
            { input: [1, 2], expected: 3 },
            { input: [5, 7], expected: 12 },
            { input: [-1, 1], expected: 0 },
        ],
    },
    {
        id: 'quiz_002',
        title: '배열의 최댓값',
        description: '정수 배열을 입력받아 가장 큰 값을 반환하는 함수를 작성하세요.',
        difficulty: 'EASY',
        initialCode: 'function solution(arr) {\n  // 여기에 코드를 작성하세요\n  \n}',
        examples: [
            { input: '[1, 2, 3, 4, 5]', output: '5' },
            { input: '[-1, -5, -3]', output: '-1' },
        ],
        testCases: [
            { input: [[1, 2, 3, 4, 5]], expected: 5 },
            { input: [[-1, -5, -3]], expected: -1 },
            { input: [[10]], expected: 10 },
        ],
    },
    {
        id: 'quiz_003',
        title: '문자열 뒤집기',
        description: '문자열을 입력받아 역순으로 뒤집은 문자열을 반환하는 함수를 작성하세요.',
        difficulty: 'EASY',
        initialCode: 'function solution(str) {\n  // 여기에 코드를 작성하세요\n  \n}',
        examples: [
            { input: '"hello"', output: '"olleh"' },
            { input: '"world"', output: '"dlrow"' },
        ],
        testCases: [
            { input: ['hello'], expected: 'olleh' },
            { input: ['world'], expected: 'dlrow' },
            { input: ['a'], expected: 'a' },
        ],
    },
    {
        id: 'quiz_004',
        title: '팩토리얼 계산',
        description: '정수 n을 입력받아 n! (팩토리얼)을 계산하는 함수를 작성하세요.',
        difficulty: 'MEDIUM',
        initialCode: 'function solution(n) {\n  // 여기에 코드를 작성하세요\n  \n}',
        examples: [
            { input: '5', output: '120' },
            { input: '3', output: '6' },
            { input: '0', output: '1' },
        ],
        constraints: ['0 ≤ n ≤ 12'],
        testCases: [
            { input: [5], expected: 120 },
            { input: [3], expected: 6 },
            { input: [0], expected: 1 },
        ],
    },
];

const QuizControlModal = ({ onClose, onStartQuiz }) => {
    const [selectedQuiz, setSelectedQuiz] = useState(null);

    const handleStartQuiz = () => {
        if (selectedQuiz) {
            onStartQuiz(selectedQuiz);
            onClose();
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2 className={styles.title}>퀴즈 문제 선택</h2>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6 6 18"/>
                            <path d="m6 6 12 12"/>
                        </svg>
                    </button>
                </div>

                <div className={styles.content}>
                    <div className={styles.problemList}>
                        {SAMPLE_PROBLEMS.map((problem) => (
                            <div
                                key={problem.id}
                                className={`${styles.problemCard} ${selectedQuiz?.id === problem.id ? styles.selected : ''}`}
                                onClick={() => setSelectedQuiz(problem)}
                            >
                                <div className={styles.cardHeader}>
                                    <h3 className={styles.problemTitle}>{problem.title}</h3>
                                    <span className={`${styles.difficulty} ${styles[problem.difficulty.toLowerCase()]}`}>
                    {problem.difficulty === 'EASY' && '쉬움'}
                                        {problem.difficulty === 'MEDIUM' && '보통'}
                                        {problem.difficulty === 'HARD' && '어려움'}
                  </span>
                                </div>
                                <p className={styles.problemDescription}>{problem.description}</p>
                                {selectedQuiz?.id === problem.id && (
                                    <div className={styles.checkmark}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <path d="M20 6 9 17l-5-5"/>
                                        </svg>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.footer}>
                    <button className={styles.cancelBtn} onClick={onClose}>
                        취소
                    </button>
                    <button
                        className={styles.startBtn}
                        onClick={handleStartQuiz}
                        disabled={!selectedQuiz}
                    >
                        퀴즈 시작
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizControlModal;