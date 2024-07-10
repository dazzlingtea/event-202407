import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  console.log('Home 실행!');
  return (
    <>
      <h1>My Home Page</h1>
      <p>
        <Link to={'events'}>Events</Link>페이지로 이동하기
      </p>
    </>
  );
};

export default Home;