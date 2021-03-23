import React, { useState, useEffect } from "react";

import MatchReview from "./container/MatchReview";
import Registration from "./container/Auth/Registration";
import Login from "./container/Auth/Login";
import Axios from "axios";

import "./App.css";

function App() {
  // registration
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  // login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn) {
        setIsAuthenticated(true);
      }
    });
  }, []);

  const userAuthenticated = () => {
    Axios.get("http://localhost:3001/auth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response.data);
    });
  };

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (!response.data.auth) {
        console.log(response);
        setIsAuthenticated(false);
      } else {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        setIsAuthenticated(true);
      }
    });
  };

  const logout = () => {
    Axios.get("http://localhost:3001/logout").then((response) => {
      console.log(response);
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    });
  };

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      {isAuthenticated && <MatchReview />}

      {!isAuthenticated && (
        <div className="loginForm">
          <h1>Auth</h1>
          {isRegistrationOpen && (
            <Registration
              onUsernameChange={(e) => {
                setUsernameReg(e.target.value);
              }}
              onPasswordChange={(e) => {
                setPasswordReg(e.target.value);
              }}
              register={register}
            />
          )}
          {!isRegistrationOpen && (
            <Login
              onUsernameChange={(e) => {
                setUsername(e.target.value);
              }}
              onPasswordChange={(e) => {
                setPassword(e.target.value);
              }}
              login={login}
              logout={logout}
              checkAuthStatus={userAuthenticated}
              isAuth={isAuthenticated}
            />
          )}
        </div>
      )}

      {isAuthenticated && (
        <button id="logoutBtn" onClick={logout}>
          Logout
        </button>
      )}
      {!isRegistrationOpen && !isAuthenticated && (
        <button id="registerBtn" onClick={() => setIsRegistrationOpen(true)}>
          Register
        </button>
      )}
      {isRegistrationOpen && !isAuthenticated && (
        <button id="loginBtn" onClick={() => setIsRegistrationOpen(false)}>
          Login
        </button>
      )}
    </div>
  );
}

export default App;
