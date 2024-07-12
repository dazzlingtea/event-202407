import React, {useEffect, useRef, useState} from 'react';
import styles from './SignUpForm.module.scss';
import {debounce} from "lodash";
import {AUTH_URL} from "../../config/host-config";

const VerificationInput = ({email}) => {

  // 여러 개의 컴포넌트에 ref를 거는 방법
  const inputsRef = useRef([]);

  // 입력한 인증코드를 저장
  const [codes, setCodes] = useState(Array(4).fill(''));

  // 에러메시지 저장
  const [error, setError] = useState('');

  // 타이머 시간
  const [timer, setTimer] = useState(300); //300초 = 5분


  useEffect(() => {
    // 처음엔 첫번째 칸에 포커싱
    inputsRef.current[0].focus();

    // 타이머 설정
    const intervalId = setInterval(()=> {
      setTimer(prevTime => prevTime > 0 ? prevTime - 1 : 0);
    }, 1000);

    // 타이머 리셋
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // 다음 칸으로 포커스를 이동하는 함수
  const focusNextInput = (index) => {
    if(index < inputsRef.current.length) {
      inputsRef.current[index].focus();
    }
  };

  // 서버에 검증 요청 보내기
  const verifyCode = debounce(async (code) => {
    // console.log('요청전송!: ', code);

    const response = await fetch(`${AUTH_URL}/code?email=${email}&code=${code}`)
    const flag = await response.json();

    // console.log('코드검증: ', flag);
    // 검증에 실패했을 때
    if(!flag) {
      setError('유효하지 않거나 만료된 코드입니다. 인증코드를 재발송합니다.');
      // 기존 인증코드 상태값 비우기
      setCodes(Array(4).fill(''));
      // 타이머 리셋
      setTimer(300);

      inputsRef.current[0].focus();
      return;
    }

  }, 1500);


  const changeHandler = (index, inputValue) => {

    const updatedCodes = [ ...codes ]; // 전과 다르게 4칸으로 시작하니까 인덱스에 접근해서 변경
    updatedCodes[index - 1] = inputValue;
    console.log('updatedCodes: ',updatedCodes);

    // codes 변수에 입력한 숫자 담아놓기
    setCodes(updatedCodes);

    // 입력이 끝나면 다음 칸으로 포커스 이동
    focusNextInput(index);

    // 입력한 숫자 합치기
    // join() : 배열 안에 있는 요소를 전부 연결
    if(updatedCodes.length === 4 && index === 4) {
      const code = updatedCodes.join('');
      // console.log('배열 join 결과: ', code);

      // 서버로 인증코드 검증 요청 전송
      verifyCode(code);

    }
  }

  return (
    <>
     <p>Step 2: 이메일로 전송된 인증번호 4자리를 입력해주세요. </p>
      <div className={styles.codeInputContainer}>
        {
          Array.from(new Array(4)).map((_, index)=>(
            <input
              ref={($input)=> inputsRef.current[index] = $input}
              key={index}
              type="text"
              maxLength={1}
              className={styles.codeInput}
              onChange={(e) => changeHandler(index+1, e.target.value)}
              value={codes[index]}
            />
          ))
        }
      </div>
      <div className={styles.timer}>
        {`${'0' + Math.floor(timer / 60)}:${('0' + (timer % 60)).slice(-2)}`}
      </div>
      { error && <p className={styles.errorMessage}>{error}</p> }
    </>
  );
};

export default VerificationInput;