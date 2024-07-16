import React from 'react';
import {redirect} from "react-router-dom";

const Logout = () => {
  return (
    <></>
  );
};

export default Logout;
// 액션함수를 위한 빈 컴포넌트
// 컴포넌트인데 실제 컴포넌트가 없는 경우에는 반드시
// redirect 코드가 필요
export const logoutAction = () => {
  localStorage.removeItem('userData');
  return redirect('/');
};