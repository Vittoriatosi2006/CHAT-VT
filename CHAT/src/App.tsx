import { JSX } from "react";
import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ChatMain } from "./ChatMain";
import { Navbar } from "./Navbar";
import { ChatRecenti } from "./ChatRecenti";
import FloatingBots from "./FloatingBots";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <FloatingBots />
      <div className="container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<ChatMain />} />
            <Route path="/recenti" element={<ChatRecenti />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
