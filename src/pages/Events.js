import React, {useContext, useEffect, useRef, useState} from 'react';
import EventList from '../components/EventList';
import EventSkeleton from '../components/EventSkeleton';
import {EVENT_URL} from "../config/host-config";

// npm install loadsh
import { debounce, throttle } from 'lodash';
import {useRouteLoaderData} from "react-router-dom";
import EventContext from "../components/context/event-context";

const Events = () => {

  const { changeTotalEventCount } = useContext(EventContext)

  // 로컬스토리지에서 토큰 가져오기
  const {token} = useRouteLoaderData('user-data');

  // 이벤트 목록 아래 박스 참조
  const skeletonBoxRef = useRef();

  // 서버에서 가져온 이벤트 목록
  const [events, setEvents] = useState([]);

  // 로딩 상태 체크
  const [loading, setLoading] = useState(false);

  // 현재 페이지 번호
  const [currentPage, setCurrentPage] = useState(1);

  // 더이상 가져올 데이터가 있는지 확인
  const [isFinish, setIsFinish] = useState(false);

  // 로딩 스켈레톤 스크린을 보여줄 개수
  const [skeletonCount, setSkeletonCount] = useState(4)

  // 서버로 목록 조회 요청보내기
  const loadEvents = async() => {
    console.log('loadEvents: ', events, loading,  currentPage, isFinish);
    if (isFinish) {
      console.log('loading finished!');
      return;
    }

    console.log('start loading...');
    setLoading(true);

    const response = await fetch(`${EVENT_URL}/page/${currentPage}?sort=date`, {
      headers: {'Authorization': 'Bearer '+ token}
    });
    const { events: loadedEvents, totalCount } = await response.json();

    // Context 전역 상태값 변경
    changeTotalEventCount(totalCount);

    console.log('loaded: ', {loadedEvents, totalCount, len:loadedEvents.length});

    const updatedEvents = [...events, ...loadedEvents ];
    // console.log(updatedEvents);

    // setter 있는 경우 지금 스냅샷, 변경 후 스냅샷을 비교해서 리렌더링 결정
    setTimeout(()=>{
      setLoading(false);
      setEvents(updatedEvents); // 이걸 같은 타이머에 두지 않으면 여러번 리렌더링 발생

      // 타이머 시간만큼 스켈레톤 렌더링
      // 로딩이 끝나면 페이지번호를 1 늘려놓는다.
      setCurrentPage(prevPage => prevPage + 1);
      console.log('end loading!!');
      // console.log('loadEvents: ', events, loading,  currentPage, isFinish);

      // 로딩이 끝나면 더 이상 가져올게 있는지 여부를 체크한다.
      setIsFinish(totalCount === updatedEvents.length);

      // 로딩 후 지금까지 불러온 데이터 개수(현재 렌더링된 개수)를 총 데이터 개수에서 차감
      const restEventsCount = totalCount - updatedEvents.length;

      // skeleton 개수 구하기 -> 남은 개수가 4보다 크면 4로 세팅 4보다 작으면 그 수로 세팅
      const skeletonCnt = Math.min(4, restEventsCount);
      setSkeletonCount(skeletonCnt);
    }, 500);


  };


  // 화면에 특정 박스가 보이면 다음 페이지를 로딩
  useEffect(() => {

    const observer = new IntersectionObserver((entries)=>{

      // 현재 감시하고 있는 타겟의 정보 (배열)
      console.log('entries: ', entries[0]);

      // 서버에서 데이터 페칭
      // !entries[0].isIntersecting : 관찰하고 있는 박스가 감지가 안되면
      if(!entries[0].isIntersecting || loading || isFinish) { // 언제까지 로드이벤트 할건지 조건 필요
        return;
      }
      loadEvents();
    }, {
      // 관찰하고 있는 요소의 높이가 50% 보일때 콜백을 실행
      threshold: 0.5
    });

    // observer 관찰 대상(DOM)을 지정
    if(skeletonBoxRef.current) {
      observer.observe(skeletonBoxRef.current);
    }
    // 컴포넌트가 렌더링이 사라질때 옵저빙 중지
    return () => {
      if(skeletonBoxRef.current) {
        observer.disconnect();
      }
    };

  }, [loading, currentPage]);

  return (
    <>
      <EventList eventList={events} />
      <div ref={skeletonBoxRef} style={{ height: '300px'}}>
        {loading && <EventSkeleton count={skeletonCount} />}
      </div>
    </>
  );
};

export default Events;
