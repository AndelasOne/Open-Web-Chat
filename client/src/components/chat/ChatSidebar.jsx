import { Room } from "./Room";
function ChatSidebar({ renderRooms }) {
  const datenbanken_index = 0;
  const datenbanken_room = "Datenbanken";
  return (
    <div className="chat-sidebar">
      <Room index={datenbanken_index} roome_name={datenbanken_room} />
      {renderRooms()}
    </div>
  );
}

export { ChatSidebar };
