import "./login.scss";
import "../../App.scss";

import loginImg from "./login.svg";

import { useState } from "react";
import { RiLoginCircleFill } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import { Popup } from "./Popup";

const serverURL = "http://localhost:4000/";

function Login({ setLoggedInUser, joinChatroom }) {
  const [username, setUsersame] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [loginActive, setLoginActive] = useState(true);

  const toggle = () => setModal(!modal);
  const history = useHistory();

  // Add a User to registered User
  const addUser = async (user) => {
      await fetch(serverURL + "register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  };

  // Login User
  const loginUser = async (username, password) => {
    const res = await fetch(serverURL + "login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    return data;
  };

  // getSingleUser
  const getUser = async (username) => {
    const res = await fetch(serverURL + "register?username=" + username);
    const user = await res.json();
    return user;
  };

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

    const possibleRegisteredUser = await getUser(username); //TODO: fetchSingleUser

    // register User if not exist
    if (!loginActive) {
      if (!possibleRegisteredUser.error) {
        setModalMessage("Username already registered!");
        toggle();

        return;
      } else {
        //Add User
        const newUser = {
          username: username,
          password: password,
        };
        await addUser(newUser);
        setModalMessage("New User registered!");
        toggle();
        return;
      }
    } else {
      if (possibleRegisteredUser.error) {
        setModalMessage("Username not registered!");
        toggle();

        return;
      } else {
        //Sign in user
        const potentialUser = await loginUser(username, password);
        //check if response is error msg
        if (potentialUser.error) {
          setModalMessage(potentialUser.error);
          toggle();
        }
        // Login user
        else {
          setLoggedInUser(potentialUser);
          await joinChatroom(potentialUser.room_name, potentialUser.room_id);
          history.push("./ChatView");
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
                  setLoginActive(!loginActive);
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
