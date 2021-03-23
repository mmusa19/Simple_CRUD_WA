import React from "react";

const Registration = ({ onUsernameChange, onPasswordChange, register }) => {
  return (
    <div className="registration">
      <h2>Registration Form</h2>
      <label>Username</label>
      <input type="text" onChange={onUsernameChange} />
      <label>Password</label>
      <input type="text" onChange={onPasswordChange} />
      <button onClick={register} id="submitBtn">
        Submit
      </button>
    </div>
  );
};

export default Registration;
