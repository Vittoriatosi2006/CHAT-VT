import { useState, useRef, useEffect } from "react";

export function ChatMain() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [started, setStarted] = useState(false);

  const botReplies = [
    "Ciao! Come posso aiutarti oggi?",
    "Interessante, raccontami di più.",
    "Non sono sicuro di capire, puoi spiegarti?",
    "Ah, capisco!",
    "Posso suggerirti qualcosa?",
  ];
  // Scegli risposta casuale
  function getRandomReply() {
    const randomIndex = Math.floor(Math.random() * botReplies.length);
    return botReplies[randomIndex];
  }

  //collegato al div vuoto
  const messagesEndRef = useRef(null);
  //quando le scritte arrivano infondo alla pagina scrolla da solo
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  // Invio messaggio
  function handleSend() {
    //se il messsaggio è vuoto non viene invaito
    if (input.trim() === "") return;

    const userMessage = { role: "user", text: input };

    //svuota l'input dopo l'invio
    setInput("");
    setStarted(true);

    const loaderMessage = { role: "bot", text: null, isLoading: true };
    // prende i messaggi prima e aggiunge il nuovo
    setMessages((prev) => [...prev, userMessage, loaderMessage]);

    setTimeout(() => {
      const botMessage = { role: "bot", text: getRandomReply() };
      setMessages((prev) =>
        prev.map((msg) => (msg.isLoading ? botMessage : msg)),
      );
    }, 1500);
  }

  return (
    <div className="container">
      {!started && <h1>In cosa possiamo essere utile?</h1>}

      <div className={`chat-wrapper ${started ? "chat-started" : ""}`}>
        <div className="chat-area">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={msg.role === "user" ? "msg-user" : "msg-bot"}
            >
              {msg.isLoading ? <div className="loader"></div> : msg.text}
            </div>
          ))}
          {/*div vuoto x lo scroll collegato a useRef */}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-completo">
          <button className="aggiungi">
            <i className="fa-solid fa-plus"></i>
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
            <i className="fa-solid fa-microphone fa-lg"></i>
          </button>

          <button className="invio" onClick={handleSend}>
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
