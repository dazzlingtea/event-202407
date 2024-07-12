import React, {useEffect, useRef, useState} from 'react';
import styles from './SignUpForm.module.scss';
import {debounce} from "lodash";
import {AUTH_URL} from "../../config/host-config";

const VerificationInput = ({email}) => {

  // 여러 개의 컴포넌트에 ref를 거는 방법
  const inputsRef = useRef([]);

  // 입력한 인증코드를 저장
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    // 처음엔 첫번째 칸에 포커싱
    inputsRef.current[0].focus();
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

    console.log('코드검증: ', flag);

  }, 1500);


  const changeHandler = (index, inputValue) => {

    const updatedCodes = [ ...codes, inputValue ];
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
            />
          ))
        }

      </div>
    </>
  );
};

export default VerificationInput;