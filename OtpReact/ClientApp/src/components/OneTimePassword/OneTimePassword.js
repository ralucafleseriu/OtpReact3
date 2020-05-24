import React, { useState, useEffect } from 'react';
import './OneTimePassword.css';
import { validatePassword, generatePassword } from './OneTimePasswordApis';

const OneTimePassword = () => {

  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [expirationDateTime, setExpirationDateTime] = useState();
  const [counter, setCounter] = useState();
  const [myInterval, setMyInterval] = useState();

  async function handleGeneratePassword() {
    const data = await generatePassword();
    setPassword(data.password);
    setUserId(data.userId);
    setExpirationDateTime(new Date(data.expirationDateTime));

  }

  async function handleValidatePassword(password) {
    const data = await validatePassword(userId, password);
    alert(data ? "Password valid!" : "Password expired... :( ");
    if (!data) {
      setPassword();
      setCounter()
      setExpirationDateTime();
    }
  }

  useEffect(() => {
    clearInterval(myInterval);
    setMyInterval()

    if (!expirationDateTime) return;

    setCounter(30);
    const id = setInterval(() => {
      if (expirationDateTime) {
        var c = Math.floor((expirationDateTime - new Date()) / 1000);
        setCounter(c)
      }
    }, 1000);
    setMyInterval(id);

    return () => {
      clearInterval(myInterval);
      setMyInterval()
    }
    // eslint-disable-next-line 
  }, [expirationDateTime]);

  function getPasswordStatus() {
    if (!counter) return null;
    if (counter <= 0) {
      return "Password expired.";
    }
    return `Valid for ${counter} seconds.`;
  }

  return (
    <div className="otp">
      <h1>One Time Password Generator</h1>
      <section>
        <input value={password} readOnly />
        <button
          disabled={!!counter && counter > 0}
          onClick={() => handleGeneratePassword()}
        >Generate one time password </button>
        <p>{getPasswordStatus()}</p>

      </section>
      <button
        onClick={() => handleValidatePassword(password)}
      >Validate password</button>
    </div >
  );
}

export default OneTimePassword;
