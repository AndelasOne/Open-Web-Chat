function ChatMessage({ loggedinUser, username, msg, index, timeStamp }) {
  return (
    <div
      className="message"
      id={index}
      style={
        loggedinUser.username === username
          ? { float: "right", clear: "both", background: "#b0ffd0" }
          : { float: "left", clear: "both" }
      }
    >
      <p className="meta">
        {username} <span>{timeStamp}pm</span>
      </p>
      <p className="text">{msg}</p>
    </div>
  );
}
//catch errors without typescript
ChatMessage.defaultProps = {
  username: "Unknown User",
  msg:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,repudiandae.",
};

export { ChatMessage };
