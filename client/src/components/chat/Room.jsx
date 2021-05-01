function Room({ index, room_name, room_id, loggedInUser, joinChatroom }) {
  const onJoin = async () => {
    await joinChatroom(room_name, room_id);
  };
  return (
    <div
      id={index}
      className={"room"}
      style={
        loggedInUser.room_name === room_name
          ? {
              cursor: "pointer",
              paddingBottom: "10px",
              backgroundColor: "#d4f5e1",
            }
          : { cursor: "pointer", paddingBottom: "10px" }
      }
      onClick={onJoin}
    >
      <div className="logo">{room_name[0]}</div>
      <h2 id="room-name">{room_name}</h2>
    </div>
  );
}

export { Room };
