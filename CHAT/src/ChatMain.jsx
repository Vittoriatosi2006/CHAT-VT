import { useState } from "react";

export function ChatMain() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [started, setStarted] = useState(false);

  function handleSend() {
    // se il messaggio è vuoto, non viene inviato
    if (input.trim() === "") return;

    // oggetto x il messaggio utente
    const userMessage = {
      role: "user",
      text: input,
    };

    // prende i messaggi prima e aggiunge il nuovo
    setMessages((prev) => [...prev, userMessage]);

    // svuota l'input dopo l'invio
    setInput("");
    setStarted(true);
  }

  return (
    <div class="container">
      {!started && <h1>In cosa possiamo essere utile?</h1>}

      <div className={`chat-wrapper ${started ? "chat-started" : ""}`}>
        {/* area messaggi */}
        <div className="chat-area">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={msg.role === "user" ? "msg-user" : "msg-bot"}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="input-completo">
          <button className="aggiungi">
            <i class="fa-solid fa-plus"></i>
          </button>
          <input
            className="chat-input"
            type="text"
            placeholder="Fai una domanda"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <button className="detta">
            <i class="fa-solid fa-microphone  fa-lg"></i>
          </button>

          {/* bottone di invio */}
          <button className="assistente-vocale" onClick={handleSend}>
            <img
              src="/assistenteVocale.png"
              alt="icon"
              className="img-assistenteVocale"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
