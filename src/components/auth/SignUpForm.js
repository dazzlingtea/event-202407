import React, {useState} from 'react';
import styles from './SignUpForm.module.scss'
import EmailInput from "./EmailInput";
import VerificationInput from "./VerificationInput";

const SignUpForm = () => {

  const [step, setStep] = useState(1);

  // 이메일 중복확인이 끝났을 때 호출될 함수
  const emailSuccessHandler = () => {
    console.log('email 중복확인 검증 끝!');
    setStep(2);
  };

  return (
    <div className={styles.signupForm}>
      <div className={styles.formStepActive}>

        { step === 1 && <EmailInput onSuccess={emailSuccessHandler}/> }

        { step === 2 && <VerificationInput /> }


      </div>
    </div>
  );
};

export default SignUpForm;