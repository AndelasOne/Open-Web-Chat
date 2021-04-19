import { Link } from "react-router-dom";
import Header from "./Header";
import ChatMainContent from "./ChatMainContent";
import "./Chat.scss";
import ChatInput from "./ChatInput";
function ChatView({ loggedInUser, onLeave, setLoggedInUser }) {
  return (
    <div className="chatview-container">
      <Header
        loggedInUser={loggedInUser}
        onLeave={onLeave}
        setLoggedInUser={setLoggedInUser}
      />
      <ChatMainContent />
      <ChatInput />
      <h4>Version 1.0.0</h4>
      <Link to="/">Go Back</Link>
    </div>
  );
}

export default ChatView;
