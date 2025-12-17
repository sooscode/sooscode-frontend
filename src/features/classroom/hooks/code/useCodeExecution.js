// features/classroom/hooks/code/useCodeExecution.js

import { useState } from 'react';
import { api } from "@/services/api.js";
import { executeCode, copyCode as copyCodeUtil } from "@/features/classroom/utils/editorUtils.js";

/**
 * 코드 실행 및 출력 관리 훅
 */
export const useCodeExecution = (code) => {
    const [output, setOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);

    const run = async () => {
        setIsRunning(true);
        const result = await executeCode(code, api);
        setOutput(result.output);
        setIsRunning(false);
    };

    const copy = () => {
        copyCodeUtil(code);
    };

    const clearOutput = () => {
        setOutput("");
    };

    return {
        output,
        isRunning,
        run,
        copy,
        clearOutput,
    };
};