import React from "react";

const Login = ({
  onUsernameChange,
  onPasswordChange,
  login,
  logout,
  loginStatus,
  isAuth,
  checkAuthStatus,
}) => {
  return (
    <div className="login">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username..."
        onChange={onUsernameChange}
      />
      <input
        type="password"
        placeholder="Password..."
        onChange={onPasswordChange}
      />
      {!loginStatus && (
        <button id="loginBtn" onClick={login}>
          Login
        </button>
      )}

      {isAuth && (
        <button onClick={checkAuthStatus}>Check if Authenticated</button>
      )}
    </div>
  );
};

export default Login;
