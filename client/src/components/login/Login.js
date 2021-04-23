import "./login.scss";
import "../../App.scss";

import loginImg from "./login.svg";

import { useState } from "react";
import { RiLoginCircleFill } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import { Popup } from "./Popup";

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
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const toggle = () => setModal(!modal);
  const history = useHistory();

  // Register and Login
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      setModalMessage("Please enter a Username!");
      toggle();
      return;
    }
    if (!password) {
      setModalMessage("Please enter a Password!");
      toggle();
      return;
    }

    const possibleRegisteredUser = await fetchSingleUser(username);

    // register User if not exist
    if (!loginActive) {
      if (possibleRegisteredUser !== undefined) {
        setModalMessage("Username already registered!");
        toggle();

        return;
      } else {
        //Add User
        const newUser = {
          username: username,
          password: password,
          status: "logged_out",
        };
        await addUser(newUser);
        setModalMessage("New User registered!");
        toggle();
      }
    } else {
      if (possibleRegisteredUser === undefined) {
        setModalMessage("Username not registered!");
        toggle();

        return;
      } else {
        //Sign in user
        if (possibleRegisteredUser.password === password) {
          setLoggedInUser(possibleRegisteredUser);
          toggle();

          //update user status on server
          await changeUserStatus(possibleRegisteredUser, "logged_in");
          history.push("./ChatView");
        } else {
          setModalMessage("Password incorrect!");
          toggle();
        }
      }
    }
  };

  return (
    <div className="login">
      <Popup modal={modal} toggle={toggle} msg={modalMessage} />
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
              <button className="btn" type="button" onClick={onSubmit}>
                {loginActive ? "Login" : "Register"}
              </button>
            </div>
            <div className="footer"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Login };
