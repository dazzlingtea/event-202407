import React from 'react';
import MainNavigation from "./MainNavigation";
import {Outlet, useLoaderData} from 'react-router-dom';


const RootLayout = () => {

  const data = useLoaderData(); // 이걸 MainNavigation 에서도 사용 가능

  return (
    <>
      <MainNavigation />
      {/* RootLayout의 children들이 Outlet으로 렌더링됨*/}
      <main>
        <Outlet/>
      </main>
    </>
  );
};

export default RootLayout;