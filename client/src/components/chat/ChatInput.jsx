import { RiSendPlaneFill } from "react-icons/ri";
import { useState } from "react";

const ChatInput = ({ currentUser, socket }) => {
  const [inputMessage, setInputMessage] = useState("");

  const onSend = (event) => {
    event.preventDefault();

    if (!inputMessage) {
      return;
    }

    const today = new Date();
    const timeStamp =
      ("0" + today.getHours()).slice(-2) +
      ":" +
      ("0" + today.getMinutes()).slice(-2);
    const date = today.getDate();

    socket.emit("message", {
      username: currentUser.username,
      message: inputMessage,
      room_id: currentUser.room_id,
      room_name: currentUser.room_name,
      time: timeStamp,
      date: date,
    });

    setInputMessage("");
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
          style={{ marginInline: "5px" }}
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
