function ChatMessage({ loggedinUser, username, msg, index, timeStamp }) {
  return (
    <div
      className="message"
      id={index}
      style={
        loggedinUser.username === username
          ? { alignSelf: "flex-end", clear: "both", background: "#b0ffd0" }
          : { alignSelf: "flex-start", clear: "both" }
      }
    >
      <p className="meta">
        {username} <span>{timeStamp}</span>
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
