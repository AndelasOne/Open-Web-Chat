import { RiSendPlaneFill } from "react-icons/ri";
import { useState } from "react";

const ChatInput = ({ currentUser, postMessage, socket }) => {
  const [inputMessage, setInputMessage] = useState("");

  const onSend = (event) => {
    event.preventDefault(); //keep messages after refresh

    if (!inputMessage) {
      return;
    }

    let today = new Date();
    const timeStamp = today.getHours() + ":" + today.getMinutes();
    const date = today.getDate();
    socket.emit("message", {
      username: currentUser.username,
      message: inputMessage,
      time: timeStamp,
      date: date,
    });

    setInputMessage("");

    postMessage({
      username: currentUser.username,
      message: inputMessage,
      time: timeStamp,
      date: date,
    });
  };

  return (
    <div className="chat-form-input">
      <form id="chat-form" onSubmit={(event) => onSend(event)}>
        <input
          id="msg"
          type="text"
          placeholder="Enter a Message"
          required
          autoComplete="off"
          value={inputMessage}
          onChange={(event) => setInputMessage(event.target.value)}
        />
        <button className="btn">
          <RiSendPlaneFill>Send</RiSendPlaneFill>
        </button>
      </form>
    </div>
  );
};

export { ChatInput };
