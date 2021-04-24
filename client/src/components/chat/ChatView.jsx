import "./Chat.scss";
import { Link } from "react-router-dom";
import { Header } from "./Header";
import { ChatMainContent } from "./ChatMainContent";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../socket";
import { Room } from "./Room";

const serverURL = "http://localhost:5000/datenbanken/";

// // fetch ChatMessages
// const fetchChatMessages = async () => {
//   const res = await fetch(serverURL);
//   const data = await res.json();
//   return data;
// };

function ChatView({ loggedInUser, onLeave, setLoggedInUser }) {
  const [chatMessages, setChatMessages] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);

  const socket = useContext(SocketContext);

  useEffect(() => {
    const getMessages = () => {
      socket.on("message", ({ username, message, time }) => {
        setChatMessages([...chatMessages, { username, message, time }]);
        console.log("Message received");
        console.log(chatMessages.length);
      });

      socket.on("room", (roomname) => {
        setChatRooms([...chatRooms, roomname]);
        console.log("Room received");
        console.log(chatRooms.length);
      });
    };
    getMessages();
  });

  // post a new message to chat window
  const postMessage = async (message) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newMessage = { id, ...message };
    setChatMessages([...chatMessages, newMessage]);

    // Request Server to save Message
    //TODO: Change Request
    await fetch(serverURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMessage),
    });
  };

  const displyChat = () => {
    console.log(chatMessages);
    return chatMessages.map(({ username, message, time }, index) => (
      <ChatMessage
        index={index}
        username={username}
        msg={message}
        timeStamp={time}
        loggedinUser={loggedInUser}
      />
    ));
  };

  const displayRooms = () => {
    return chatRooms.map((roomname, index) => (
      <Room index={index} roomname={roomname} />
    ));
  };

  return (
    <div className="chatview-container">
      <Header
        loggedInUser={loggedInUser}
        onLeave={onLeave}
        setLoggedInUser={setLoggedInUser}
      />
      <ChatMainContent
        renderChat={displyChat}
        renderRooms={displayRooms}
        loggedinUser={loggedInUser}
      />
      <ChatInput
        currentUser={loggedInUser}
        postMessage={postMessage}
        socket={socket}
      />
      <h4>
        Version 1.0.0 <Link to="/About">About</Link>
      </h4>
    </div>
  );
}

export { ChatView };
