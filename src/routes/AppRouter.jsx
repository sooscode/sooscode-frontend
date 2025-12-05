import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "../constants/routes";

import StudentClassDetail from "../pages/classDetail/StudentClassDetail.jsx";
import TeacherClassDetail from "../pages/classDetail/TeacherClassDetail.jsx";

import StudentClassJoin from "../pages/classJoin/StudentClassJoin.jsx";
import TeacherClassJoin from "../pages/classJoin/TeacherClassJoin.jsx";

import AuthPage from "@/pages/auth/AuthPage.jsx";
import AuthLayout from "@/features/auth/layout/AuthLayout.jsx";
import {useEffect, useState} from "react";
import StudentMypage from "../pages/myPage/StudentMypage.jsx";
import TeacherMypage from "../pages/myPage/TeacherMypage.jsx";
import TestRouting from "../pages/TestRouting.jsx";

// AppRouter 컴포넌트: 애플리케이션의 라우팅 설정을 담당
export default function AppRouter() {
    // 추후 Redis도입 시 삭제 될 코드
    const [isLogin, setIsLogin] = useState(false);
    console.log(isLogin);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setIsLogin(!!token);
    }, []);

    /* Zustand Login Setting

    useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      // TODO: 토큰 검증 API를 넣었다고 가정하고 더미 유저 정보 생성
      const dummyUser = {
        id: 1,
        name: "홍길동",
        role: "STUDENT", // 또는 TEACHER
      };

      setLogin(token, dummyUser);
    }
  }, [setLogin]);
    
    */


  return (
    <BrowserRouter>
      <Routes>
        {/* Test Routing */}
        <Route path={ROUTES.ROUTING} element={<TestRouting />} />

        {/* login & register */}
        <Route element={<AuthLayout/>}>
            <Route path="/login" element={<AuthPage setIsLogin={setIsLogin} mode="login"/>}/>
            <Route path="/register" element={<AuthPage mode="register"/>}/>
        </Route>

          {/* Student */}
        <Route path={ROUTES.STUDENT.MYPAGE} element={<StudentMypage />} />
        <Route path={ROUTES.STUDENT.CLASS_JOIN()} element={<StudentClassJoin />} />
        <Route path={ROUTES.STUDENT.CLASS_DETAIL()} element={<StudentClassDetail />} />

        {/* Teacher */}
        <Route path={ROUTES.TEACHER.MYPAGE} element={<TeacherMypage />} />
        <Route path={ROUTES.TEACHER.CLASS_JOIN()} element={<TeacherClassJoin />} />
        <Route path={ROUTES.TEACHER.CLASS_DETAIL()} element={<TeacherClassDetail />} />

      </Routes>
    </BrowserRouter>
  );
}
