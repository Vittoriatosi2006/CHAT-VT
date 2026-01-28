import { JSX } from "react";

export function Navbar(): JSX.Element {
  return (
    <div>
      <select>
        <option className="first-option">Chat VG</option>
        <option className="first-option">Premium</option>
      </select>
    </div>
  );
}
