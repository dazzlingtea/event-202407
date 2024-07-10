import React from 'react';
import {redirect, useLoaderData, useRouteLoaderData} from "react-router-dom";
import EventItem from "../components/EventItem";
import {EVENT_URL} from "../config/host-config";

const EventDetail = () => {

  // 사용범위가 본인컴포넌트와 그 하위 컴포넌트(children은 하위가 아님)
  // const ev = useLoaderData(); // 자신의 loader를 불러옴
  const ev = useRouteLoaderData('event-detail'); // 부모의 loader를 불러오는 훅 (지정 ID)

  return (
    <EventItem event={ev} />
  );
};

export default EventDetail;

export const loader = async ({ params }) => {
  // console.log('abc: ', abc.params.eventId);
  const {eventId: id} = params;

  // use 로 시작하는 함수인 리액트훅은 컴포넌트 내부에서만 사용가능 ->  id, setEv 사용 불가
  const response = await fetch(`${EVENT_URL}/${id}`);

  if(!response.ok) {
    // 예외처리
  }

  return await response.json();

};
// action을 트리거 하는 방법
// 실제로 버튼이 있는 곳으로 이동 (EventItem.js)
export const action = async ({params}) => {
    // if(!window.confirm('정말 삭제하시겠습니까?')) return;
  const response = await fetch(`${EVENT_URL}/${params.eventId}`, {
          method: 'DELETE'
  });

  if(!response.ok){
    //
  }
  return redirect('/events')

};