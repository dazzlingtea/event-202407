import React from 'react';
import {useRouteLoaderData} from "react-router-dom";

const Main = () => {

  const {role, email} = useRouteLoaderData('user-data');

  return (
    <>
      <h2>{email.split('@')[0]}님 환영합니다.</h2>
      <h3>현재 권한: [{role}]</h3>
      <button>logout</button>
    </>
  );
};

export default Main;