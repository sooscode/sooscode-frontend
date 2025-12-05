import { useThemeStore } from "@/store/themeStore";

export default function TestRouting() {
  const theme = useThemeStore((state) => state.theme);
  const toggle = useThemeStore((state) => state.toggleTheme);

  return (
    <div>
      <button onClick={toggle}>
        {theme === "light" ? "🌙" : "☀️"}
      </button><br/>
      <a href="/login">login</a><br/>
      <a href="/chat">chat</a><br/>
      <a href="/student/mypage">studentMypage</a><br/>
      <a href="/teacher/mypage">teacherMypage</a><br/>
      <a href="/register">register</a><br/> 
      <a href="/student/class/3/detail">StudentClassDetail</a><br/> 
      <a href="/teacher/class/3/detail">TeacherClassDetail</a><br/> 
      <a href="/student/class/3">StudentclassJoin</a><br/> 
      <a href="/teacher/class/3">TeacherclassJoin</a><br/> 

    </div>
  );
}