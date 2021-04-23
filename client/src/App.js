import "./App.scss";

import { Login } from "./components/login/Login";
import { ChatView } from "./components/chat/ChatView";
import { About } from "./components/login/About";

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { SocketContext, socket } from "./socket";

const App = () => {
  const [loginActive, setLoginActive] = useState(true);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(undefined);

  const serverURL = "http://localhost:5000/";

  useEffect(() => {
    const getRegisteredUsers = async () => {
      const usersFromServer = await fetchRegisteredUsers();
      setRegisteredUsers(usersFromServer);
    };
    getRegisteredUsers();
  }, []);

  //Fetch all registered users
  const fetchRegisteredUsers = async () => {
    const res = await fetch(serverURL + "registeredUsers/");
    const users = await res.json();
    return users;
  };

  //Fetch Single user
  const fetchSingleUser = async (name) => {
    const res = await fetch(
      serverURL + "registeredUsers?" + `username=${name}`
    );
    const user = await res.json();
    return user[0];
  };

  // Add a User to registered User
  const addUser = async (user) => {
    const id = Math.floor(Math.random() * 999999) + 1; //generate random id
    const newRegisteredUser = { id, ...user };
    console.log(newRegisteredUser);

    setRegisteredUsers([...registeredUsers, newRegisteredUser]);

    await fetch(serverURL + "registeredUsers/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRegisteredUser),
    });
  };

  // Login + Logout User
  const changeUserStatus = async (user, loginStatus) => {
    const changedUser = { ...user, status: loginStatus };
    console.log(changedUser);

    await fetch(serverURL + `registeredUsers/${changedUser.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changedUser),
    });
  };

  return (
    <Router>
      <SocketContext.Provider value={socket}>
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              <div className="App">
                <Login
                  loginActive={loginActive}
                  setLoginState={setLoginActive}
                  fetchSingleUser={fetchSingleUser}
                  addUser={addUser}
                  setLoggedInUser={setLoggedInUser}
                  changeUserStatus={changeUserStatus}
                />
              </div>
            </>
          )}
        ></Route>
        <Route
          path="/ChatView"
          exact
          render={(props) => (
            <>
              <div className="App">
                <ChatView
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                  onLeave={changeUserStatus}
                />
              </div>
            </>
          )}
        ></Route>
        <Route path="/About" component={About}></Route>
      </SocketContext.Provider>
    </Router>
  );
};
export { App };
