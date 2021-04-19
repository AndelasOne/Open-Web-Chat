import ChatSidebar from "./ChatSidebar";
import ChatMessages from "./ChatMessages";

function ChatMainContent() {
  return (
    <div className="chat-main">
      <ChatSidebar />
      <ChatMessages />
    </div>
  );
}

export default ChatMainContent;
