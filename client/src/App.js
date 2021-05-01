import "./App.scss";

import { Login } from "./components/login/Login";
import { ChatView } from "./components/chat/ChatView";
import { About } from "./components/login/About";

import { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { SocketContext, socket } from "./socket";

const serverURL = "http://localhost:4000/";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);

  // fetch ChatMessages
  const loadChatMessages = async (room_name, room_id) => {
    const res = await fetch(serverURL + "message?room_name=" + room_name+ "&room_id="+room_id);
    const data = await res.json();
    return data;
  };

  // load ChatRooms
  const loadChatRooms = async () => {
    const res = await fetch(serverURL + "room");
    const data = await res.json();
    return data;
  };

  // join chatroom
  const joinChatroom = async (room_name, room_id) => {
    //Change Room in User
    if (loggedInUser !==undefined && loggedInUser.room_name !== room_name){
      changeUserRoomStatus(room_name, room_id);
    }
  
    const messages = await loadChatMessages(room_name, room_id);
    const chatRooms = await loadChatRooms();

    setChatMessages(messages);
    setChatRooms(chatRooms);
  };

  // change Room Status of User
  const changeUserRoomStatus = (room_name, room_id) => {
    const updatedUser = {username: loggedInUser.username, room_id: room_id, room_name: room_name, status: loggedInUser.status};
    setLoggedInUser(updatedUser);
  };

  // Login + Logout User
  const changeUserStatus = async (username, loginStatus) => {
    const updateUserStatus = { username: username, status: loginStatus };

    await fetch(serverURL + "register", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateUserStatus),
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
                  setLoggedInUser={setLoggedInUser}
                  loggedInUser={loggedInUser}
                  joinChatroom={joinChatroom}
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
                  chatMessages={chatMessages}
                  setChatMessages={setChatMessages}
                  joinChatroom={joinChatroom}
                  chatRooms={chatRooms}
                  setChatRooms={setChatRooms}
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
