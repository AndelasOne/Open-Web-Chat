import logo from "./openwebchat.svg";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { AddRoom } from "./AddRoom";

const Header = ({
  onLeave,
  loggedInUser,
  setLoggedInUser,
  socket,
  chatRooms,
}) => {
  const history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const logOut = async () => {
    await onLeave(loggedInUser.username, "logged_out");
    history.push("/");
    setLoggedInUser(undefined);
  };

  const logIn = () => {
    history.push("/");
  };

  return (
    <header className="chat-header">
      <img src={logo} alt="" />
      <h1>Open Web Chat</h1>
      <div className="column" style={{ float: "right", paddingRight: "10px" }}>
        <div className="row">
          <button
            style={{ paddingBottom: "5px" }}
            className="btn"
            type="button"
            onClick={loggedInUser !== undefined ? logOut : logIn}
          >
            {loggedInUser !== undefined ? "Logout" : "Login"}
          </button>
        </div>
        <div className="row" style={{ float: "right", paddingTop: "5px" }}>
          <AddRoom
            toggleDropdown={toggle}
            dropdownOpen={dropdownOpen}
            socket={socket}
            chatRooms={chatRooms}
          />
        </div>
      </div>
    </header>
  );
};

export { Header };
