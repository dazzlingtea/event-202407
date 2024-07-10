import React from 'react';
import Home from './pages/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import ErrorPage from './pages/ErrorPage';
import Events, { loader as eventListLoader } from './pages/Events';
import EventDetail, { loader as eventDetailLoader, action as deleteAction } from './pages/EventDetail';
import EventLayout from './layout/EventLayout';
import NewEvent from './pages/NewEvent';
import EditPage from './pages/EditPage';
import { action as manipulateAction }
  from './components/EventForm';

// 라우터 설정
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'events',
        element: <EventLayout />,
        children: [
          {
            index: true,
            element: <Events />,
            // loader: eventListLoader,
          },
          {
            path: ':eventId',
            loader: eventDetailLoader,
            // element: <EventDetail />,
            // loader가 children에게 직접적으로 연결되지 않아
            // EventDetail에서 loader를 사용하지 못하고 있음.
            id: 'event-detail', // loader에게 ID 부여
            children: [
              {
                index: true,
                element: <EventDetail />,
                action: deleteAction
              },
              {
                path: 'edit',
                element: <EditPage />,
                action: manipulateAction
              },
            ]
          },
          {
            path: 'new',
            element: <NewEvent />,
            // 서버에 갱신데이터요청을 보낼 때 트리거
            action: manipulateAction
          },
        ]
      },
    ]
  },
]);

const App = () => {

  return (
    <RouterProvider router={router} />
  );
};

export default App;
