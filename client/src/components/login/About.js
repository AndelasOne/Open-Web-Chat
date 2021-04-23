import { useHistory } from "react-router-dom";

const About = () => {
  const history = useHistory();
  return (
    <div className="about">
      <div className="container">
        <h3>Open Web Chat</h3>
        <p>
          This Projekt makes use of React, Node.js, Socket.io and the NoSQL
          Database MongoDB Atlas!
        </p>
        <h4>Version 1.0.0</h4>
        <h3>Credits</h3>
        <div>
          Icons made by{" "}
          <a href="https://www.freepik.com" title="Freepik">
            Freepik
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>

        <button style={{ margin: 15 }} className="btn" onClick={history.goBack}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export { About };
