import { useHistory } from "react-router-dom";

const Header = ({ onLeave, loggedInUser, setLoggedInUser }) => {
  const history = useHistory();

  const logOut = async () => {
    await onLeave(loggedInUser, "logged_out");
    setLoggedInUser(undefined);
  };

  return (
    <header className="chat-header">
      <h1>Open Web Chat</h1>
      <button
        className="btn"
        type="button"
        onClick={loggedInUser !== undefined ? logOut : history.goBack()}
      >
        {loggedInUser !== undefined ? "Logout" : "Login"}
      </button>
    </header>
  );
};

export default Header;
