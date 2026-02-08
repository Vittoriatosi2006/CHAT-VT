import { JSX } from "react";
import { Link, useLocation } from "react-router-dom";

export function Navbar(): JSX.Element {
  const location = useLocation(); //permette di sapere in che route siamo

  const isChat = location.pathname === "/";
  const isRecenti = location.pathname === "/recenti";

  return (
    <div className="bottoni">
      <Link to="/">
        <button className={`chatVG ${isChat ? "active" : ""}`}>
          <span> Chat VG </span>
        </button>
      </Link>
      <Link to="/recenti">
        <button className={`chat-recenti ${isRecenti ? "active" : ""}`}>
          <span> Chat Recenti </span>
        </button>
      </Link>
    </div>
  );
}
