function Room({ roome_name, changeRoom }) {
  return (
    <div
      className="room"
      style={{ cursor: "pointer", paddingBottom: "10px" }}
      onClick={changeRoom}
    >
      <div className="logo">{roome_name[0]}</div>
      <h2 id="room-name">{roome_name}</h2>
    </div>
  );
}

export { Room };
