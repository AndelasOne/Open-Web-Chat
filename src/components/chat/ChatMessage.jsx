import { PropTypes } from "prop-types";
function ChatMessage({ username, msg }) {
  return (
    <div className="message">
      <p class="meta">
        {username} <span>12:12pm</span>
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

export default ChatMessage;
