import React, {useEffect, useRef} from 'react';
import styles from './SignUpForm.module.scss';

const VerificationInput = () => {

  // 여러 개의 컴포넌트에 ref를 거는 방법
  const inputsRef = useRef([]);

  useEffect(() => {
    // 처음엔 첫번째 칸에 포커싱
    inputsRef.current[0].focus();
  }, []);

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
            />
          ))
        }

      </div>
    </>
  );
};

export default VerificationInput;