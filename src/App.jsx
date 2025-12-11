import AppRoute from "./routes/AppRoute.jsx";
import GlobalLoading from "@/common/components/utils/GlobalLoading.jsx";
import Toast from "@/common/components/utils/Toast";
import '@/styles/reset.css';
import '@/styles/variables.css';
import '@/styles/global.css';
import {useDarkMode} from "@/hooks/useDarkMode.js";
import {useEffect} from "react";
import {useUser} from "@/hooks/useUser.js";
import {useLoading} from "@/hooks/useLoading.js";

export default function App() {
    useDarkMode();
    const { initAuth } = useUser();
    const { showLoading, hideLoading } = useLoading();
    useEffect(() => {
        const init = async () => {
            showLoading();
            await initAuth();
            hideLoading();
        };
        init();
    }, []);

    return <>
        <GlobalLoading />
        <Toast />
        <AppRoute />
    </>
}
