import React from 'react';
import {Outlet} from 'react-router-dom'; // Home 칠드런 렌더링

const Home = () => {
  console.log('Home 실행!');
  return (
    <>
      <h1>My Home Page</h1>
      <Outlet />
    </>
  );
};

export default Home;