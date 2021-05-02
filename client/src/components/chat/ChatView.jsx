import "./Chat.scss";
import { Link } from "react-router-dom";
import { Header } from "./Header";
import { ChatMainContent } from "./ChatMainContent";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { useEffect, useContext } from "react";
import { SocketContext } from "../../socket";
import { Room } from "./Room";
import { Route, Redirect } from "react-router-dom";

function ChatView({
  loggedInUser,
  onLeave,
  setLoggedInUser,
  chatMessages,
  setChatMessages,
  chatRooms,
  setChatRooms,
  joinChatroom,
}) {
  const socket = useContext(SocketContext);

  useEffect(() => {
    const getMessages = () => {
      socket.on(
        "message",
        ({ username, message, room_id, room_name, time }) => {
          setChatMessages([
            ...chatMessages,
            { username, message, room_id, room_name, time },
          ]);
        }
      );
    };

    const getRooms = () => {
      socket.on("addRoom", (room) => {
        setChatRooms([
          ...chatRooms,
          { room_name: room.room_name, room_id: room.room_id },
        ]);
        console.log("Room Add received");
      });

      socket.on("deleteRoom", (roomname) => {
        setChatRooms(chatRooms.filter((room) => room.room_name !== roomname));
        console.log("Room Delete received");
      });
    };

    getRooms();
    getMessages();

    return () => {
      socket.off("message");
      socket.off("addRoom");
      socket.off("deleteRoom");
    };
  });

  const displayChat = () => {
    const reverseChatMessages = [].concat(chatMessages).reverse();
    return reverseChatMessages.map(({ username, message, time }, index) => (
      <ChatMessage
        key={index}
        username={username}
        msg={message}
        timeStamp={time}
        loggedinUser={loggedInUser}
      />
    ));
  };

  const displayRooms = () => {
    return chatRooms.map(({ room_name, room_id }, index) => (
      <Room
        key={index}
        room_name={room_name}
        room_id={room_id}
        loggedInUser={loggedInUser}
        joinChatroom={joinChatroom}
      />
    ));
  };

  return (
    <Route exact path="/ChatView">
      {loggedInUser === null && <Redirect to="/" />}

      <div className="chatview-container">
        <Header
          loggedInUser={loggedInUser}
          onLeave={onLeave}
          setLoggedInUser={setLoggedInUser}
          socket={socket}
          chatRooms={chatRooms}
        />
        <ChatMainContent renderChat={displayChat} renderRooms={displayRooms} />
        <ChatInput currentUser={loggedInUser} socket={socket} />
        <h4>
          Version 1.0.0 <Link to="/About">About</Link>
        </h4>
      </div>
    </Route>
  );
}

export { ChatView };
