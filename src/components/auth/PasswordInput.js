import React, {useEffect, useRef, useState} from 'react';
import styles from './SignUpForm.module.scss';

const PasswordInput = ({email}) => {

  const passwordRef = useRef();

  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const changeHandler =(e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (validatePassword(newPassword)) {
      setPasswordValid(true);
      setErrorMessage('');
    } else {
      setPasswordValid(false);
      setErrorMessage('비밀번호는 8자 이상이며, 숫자, 문자, 특수문자를 모두 포함해야 합니다.');
    }
  };

  const handleSubmit = async () => {
    if (!validatePassword(password)) {
      setPassword('');
      setPasswordValid(false);
      setErrorMessage('유효하지 않은 형식의 비밀번호입니다. 다시 입력해주세요.');
      return;
    }

  };

  useEffect(() => {
    passwordRef.current.focus();
  }, []);

  return (
    <>
      <p>Step 3: 안전한 비밀번호를 설정해주세요.</p>
      <input
        ref={passwordRef}
        type="password"
        value={password}
        onChange={changeHandler}
        className={passwordValid ? '' : styles.invalidInput}
        placeholder="Enter your password"
      />
      {!passwordValid && <p className={styles.errorMessage}>{errorMessage}</p>}
      {passwordValid && password &&
        <div>
          <button onClick={handleSubmit}>
            회원가입 완료
          </button>
        </div>
      }
    </>
  );
};

export default PasswordInput;
