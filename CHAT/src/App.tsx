import { JSX } from "react";
import "./app.css";

import { ChatMain } from "./ChatMain";
import { Navbar } from "./Navbar";

function App(): JSX.Element {
  return (
    <div>
      <Navbar />
      <main>
        <ChatMain />
      </main>
    </div>
  );
}

export default App;
