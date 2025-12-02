import LoginForm from "@/features/auth/layout/LoginForm";
import RegisterForm from "@/features/auth/layout/RegisterForm";

export default function AuthPage({ mode, setIsLogin }) {

    return (
        <>
            {mode === "login" && <LoginForm setIsLogin={setIsLogin}/>}
            {mode === "register" && <RegisterForm />}
        </>
    );
}