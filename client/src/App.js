import "./App.scss";

import { Login } from "./components/login/Login";
import { ChatView } from "./components/chat/ChatView";
import { About } from "./components/login/About";

import { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { SocketContext, socket } from "./socket";

const serverURL = "http://localhost:4000/";

const App = () => {
  
  const [loggedInUser, setLoggedInUser] = useState(undefined);
  

  // //Fetch all registered users
  // const fetchRegisteredUsers = async () => {
  //   const res = await fetch(serverURL + "registeredUsers/");
  //   const users = await res.json();
  //   return users;
  // };

  // //TODO: cleanup Fetch Single user
  // const fetchSingleUser = async (name) => {
  //   const res = await fetch(
  //     serverURL + "registeredUsers?" + `username=${name}`
  //   );
  //   const user = await res.json();
  //   return user[0];
  // };

  // Login + Logout User
  const changeUserStatus = async (username, loginStatus) => {
    const updateUserStatus = { username: username, status: loginStatus };
    console.log(updateUserStatus);

    const res = await fetch(serverURL + "register", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateUserStatus),
    });
    const data = res.json();
    return data
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
                  setLoggedInUser={setLoggedInUser}
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
