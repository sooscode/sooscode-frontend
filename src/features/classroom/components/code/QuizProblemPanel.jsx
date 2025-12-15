import { useState } from 'react';
import styles from './QuizProblemPanel.module.css';

const QuizProblemPanel = ({ problem, onClose }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    if (!problem) return null;

    return (
        <div className={`${styles.container} ${isCollapsed ? styles.collapsed : ''}`}>
            <div className={styles.header}>
                <div className={styles.titleSection}>
                    <h3 className={styles.title}>{problem.title}</h3>
                    <span className={`${styles.difficulty} ${styles[problem.difficulty?.toLowerCase()]}`}>
            {problem.difficulty === 'EASY' && '쉬움'}
                        {problem.difficulty === 'MEDIUM' && '보통'}
                        {problem.difficulty === 'HARD' && '어려움'}
          </span>
                </div>
                <div className={styles.actions}>
                    <button
                        className={styles.toggleBtn}
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        title={isCollapsed ? '펼치기' : '접기'}
                    >
                        {isCollapsed ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="m6 9 6 6 6-6"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="m18 15-6-6-6 6"/>
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {!isCollapsed && (
                <div className={styles.content}>
                    <div className={styles.description}>
                        <h4>문제 설명</h4>
                        <p>{problem.description}</p>
                    </div>

                    {problem.examples && problem.examples.length > 0 && (
                        <div className={styles.examples}>
                            <h4>입출력 예시</h4>
                            {problem.examples.map((example, index) => (
                                <div key={index} className={styles.example}>
                                    <div className={styles.exampleRow}>
                                        <span className={styles.label}>입력:</span>
                                        <code className={styles.code}>{example.input}</code>
                                    </div>
                                    <div className={styles.exampleRow}>
                                        <span className={styles.label}>출력:</span>
                                        <code className={styles.code}>{example.output}</code>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {problem.constraints && (
                        <div className={styles.constraints}>
                            <h4>제한사항</h4>
                            <ul>
                                {problem.constraints.map((constraint, index) => (
                                    <li key={index}>{constraint}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default QuizProblemPanel;