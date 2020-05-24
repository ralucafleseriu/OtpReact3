import React, { useState, useEffect } from 'react';
import './OneTimePassword.css';
import PropTypes from 'prop-types';

const PasswordGeneration = ({ password, expirationDateTime, onGeneratePassword }) => {

  const [counter, setCounter] = useState();
  const [myInterval, setMyInterval] = useState();

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
    <div>
      <input value={password} readOnly />
      <button
        disabled={!!counter && counter > 0}
        onClick={() => onGeneratePassword()}
      >Generate one time password</button>
      <p>{getPasswordStatus()}</p>

    </div>
  );
}
PasswordGeneration.propTypes = {
  password: PropTypes.string,
  expirationDateTime: PropTypes.instanceOf(Date),
  onGeneratePassword: PropTypes.func
}
export default PasswordGeneration;
