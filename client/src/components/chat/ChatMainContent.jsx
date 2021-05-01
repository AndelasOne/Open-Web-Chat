import { ChatSidebar } from "./ChatSidebar";

function ChatMainContent({ renderChat, renderRooms }) {
  return (
    <div className="chat-main chat-maincontent ">
      <ChatSidebar renderRooms={renderRooms} />

      <div id="messages" className="chat-messages">
        {renderChat()}
      </div>
    </div>
  );
}

export { ChatMainContent };
