function ChatSidebar({ renderRooms }) {
  return (
    <div className="chat-sidebar">
      <div style={{ minWidth: "200px" }}></div>
      {renderRooms()}
    </div>
  );
}

export { ChatSidebar };
