import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <h3>Version 1.0.0</h3>
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

      <Link to="/">Go Back</Link>
    </div>
  );
};

export default About;
