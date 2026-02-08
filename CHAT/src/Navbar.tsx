import { JSX } from "react";
import { Link } from "react-router-dom";

export function Navbar(): JSX.Element {
  return (
    <div className="bottoni">
      <Link to="/">
        <button className="chatVG">
          <span> Chat VG </span>{" "}
        </button>
      </Link>
      <Link to="/recenti">
        <button className="chat-recenti"> Chat Recenti </button>
      </Link>
    </div>
  );
}
