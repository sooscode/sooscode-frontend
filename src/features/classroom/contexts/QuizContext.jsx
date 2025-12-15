import { createContext, useContext, useState, useEffect } from 'react';
import { useSocketContext } from './SocketContext';

const QuizContext = createContext(null);

export const QuizProvider = ({ children, classId }) => {
    const [activeQuiz, setActiveQuiz] = useState(null);
    const [isQuizActive, setIsQuizActive] = useState(false);
    const socket = useSocketContext();

    // 퀴즈 시작 소켓 수신
    useEffect(() => {
        if (!socket || !classId) return;

        console.log('[Quiz] 소켓 구독 시작:', `/topic/quiz/${classId}/start`);

        const subscription = socket.subscribe(
            `/topic/quiz/${classId}/start`,
            (message) => {
                const data = JSON.parse(message.body);
                console.log('[Quiz] 퀴즈 시작 메시지 수신:', data);
                setActiveQuiz(data.problem);
                setIsQuizActive(true);
            }
        );

        return () => {
            if (subscription) {
                console.log('[Quiz] 소켓 구독 해제');
                subscription.unsubscribe();
            }
        };
    }, [socket, classId]);

    // 퀴즈 종료 소켓 수신
    useEffect(() => {
        if (!socket || !classId) return;

        const subscription = socket.subscribe(
            `/topic/quiz/${classId}/end`,
            (message) => {
                console.log('[Quiz] 퀴즈 종료 메시지 수신');
                setActiveQuiz(null);
                setIsQuizActive(false);
            }
        );

        return () => {
            if (subscription) subscription.unsubscribe();
        };
    }, [socket, classId]);

    // 퀴즈 시작 함수
    const startQuiz = (problem) => {
        if (!socket || !classId) {
            console.error('[Quiz] 소켓 또는 classId 없음');
            return;
        }

        console.log('[Quiz] 퀴즈 시작:', problem);

        try {
            socket.publish(`/app/quiz/${classId}/start`, {
                problem,
                startTime: new Date().toISOString()
            });
            setActiveQuiz(problem);
            setIsQuizActive(true);
        } catch (error) {
            console.error('[Quiz] 퀴즈 시작 실패:', error);
        }
    };

    // 퀴즈 종료 함수
    const endQuiz = () => {
        if (!socket || !classId) return;

        console.log('[Quiz] 퀴즈 종료');

        try {
            socket.publish(`/app/quiz/${classId}/end`, {
                endTime: new Date().toISOString()
            });
            setActiveQuiz(null);
            setIsQuizActive(false);
        } catch (error) {
            console.error('[Quiz] 퀴즈 종료 실패:', error);
        }
    };

    return (
        <QuizContext.Provider value={{
            activeQuiz,
            isQuizActive,
            startQuiz,
            endQuiz
        }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error('useQuiz must be used within QuizProvider');
    }
    return context;
};