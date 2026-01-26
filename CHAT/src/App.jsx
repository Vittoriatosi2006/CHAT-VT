import "./app.css";

import { ChatMain } from "./ChatMain";
import { Navbar } from "./Navbar";

function App() {
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
