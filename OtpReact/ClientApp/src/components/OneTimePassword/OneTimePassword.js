import React, { useState } from 'react';
import './OneTimePassword.css';
import { validatePassword, generatePassword } from './OneTimePasswordApis';
import PasswordGeneration from './PasswordGeneration';

const OneTimePassword = () => {

  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [expirationDateTime, setExpirationDateTime] = useState();

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
      setExpirationDateTime();
    }
  }


  return (
    <div className="otp">
      <h1>One Time Password Generator</h1>
      <PasswordGeneration
        password={password}
        expirationDateTime={expirationDateTime}
        onGeneratePassword={handleGeneratePassword}
      />
      <button
        onClick={() => handleValidatePassword(password)}
      >Validate password</button>
    </div >
  );
}

export default OneTimePassword;
