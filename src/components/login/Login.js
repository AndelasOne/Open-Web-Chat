import loginImg from "./login.svg";
import "./login.scss";
import "../../App.scss";

import { React, useState } from "react";
import { RiLoginCircleFill } from "react-icons/ri";
import { useHistory } from "react-router-dom";

function Login({
  loginActive,
  setLoginState,
  fetchSingleUser,
  addUser,
  setLoggedInUser,
  changeUserStatus,
}) {
  const [username, setUsersame] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  // Register and Login
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      alert("Please enter a Username!");
      return;
    }
    if (!password) {
      alert("Please enter a Password!");
      return;
    }

    const possibleRegisteredUser = await fetchSingleUser(username);

    // register User if not exist
    if (!loginActive) {
      if (possibleRegisteredUser !== undefined) {
        alert("Username already registered.");
        return;
      } else {
        //Add User
        const newUser = {
          username: username,
          password: password,
          status: "logged_out",
        };
        await addUser(newUser);
        console.log("New User added!");
      }
    } else {
      if (possibleRegisteredUser === undefined) {
        alert("Username not registered.");
        return;
      } else {
        //Sign in user
        if (possibleRegisteredUser.password === password) {
          setLoggedInUser(possibleRegisteredUser);
          //update user status on server
          await changeUserStatus(possibleRegisteredUser, "logged_in");
          history.push("./ChatView");
        } else {
          alert("Password incorrect!");
        }
      }
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="base-container">
          <div className="login-header">
            {loginActive ? "Login" : "Register"}
          </div>
          <div className="login-content">
            <div className="login-img">
              <img src={loginImg} alt="" />
            </div>
            <div className="form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  onChange={(event) => setUsersame(event.target.value)}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  onChange={(event) => setPassword(event.target.value)}
                ></input>
              </div>
              <p
                onClick={() => {
                  setLoginState(!loginActive);
                }}
                style={{ cursor: "pointer" }}
              >
                {loginActive ? "Register" : "Login"} <RiLoginCircleFill />
              </p>
            </div>
            <div className="footer">
              <button className="btn" type="button" onClick={onSubmit}>
                {loginActive ? "Login" : "Register"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
