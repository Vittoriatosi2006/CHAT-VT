import { useState, useRef, useEffect, JSX } from "react";

type Message = {
  role: "user" | "bot";
  text: string | null;
  isLoading?: boolean;
};

export function ChatMain(): JSX.Element {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [started, setStarted] = useState<boolean>(false);
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);

  const botReplies: string[] = [
    "Ciao! Come posso aiutarti oggi?",
    "Interessante, raccontami di più.",
    "Non sono sicuro di capire, puoi spiegarti?",
    "Ah, capisco!",
    "Posso suggerirti qualcosa?",
  ];
  function getRandomReply(lista: string[]): string {
    const randomIndex = Math.floor(Math.random() * lista.length);
    return lista[randomIndex];
  }

  const h1Replies: string[] = [
    "Ciao utente",
    "Allora, ti butti?",
    "Da dove iniziamo?",
    "Come posso aiutarti?",
  ];
  //lo useState serve perche senno l'h1 cambierebbe a ogni scritta aggiunta nell'input
  const [h1Text] = useState(() => getRandomReply(h1Replies));

  //collegato al div vuoto
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  //quando le scritte arrivano infondo alla pagina scrolla da solo
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  // Invio messaggio
  function handleSend(): void {
    //se il messsaggio è vuoto non viene invaito
    if (input.trim() === "") return;

    const userMessage: Message = {
      role: "user",
      text: input,
    };

    //svuota l'input dopo l'invio
    setInput("");
    setStarted(true);
    setIsBotTyping(true);

    const loaderMessage: Message = {
      role: "bot",
      text: null,
      isLoading: true,
    };
    // prende i messaggi prima e aggiunge il nuovo
    setMessages((prev) => [...prev, userMessage, loaderMessage]);

    setTimeout(() => {
      const botMessage: Message = {
        role: "bot",
        text: getRandomReply(botReplies),
      };

      setMessages((prev) =>
        prev.map((msg) => (msg.isLoading ? botMessage : msg)),
      );

      setIsBotTyping(false); //il bot ha finito e l'input si può usare di nuovo
    }, 1500);
  }

  return (
    <div className="container">
      {!started && <h1>{h1Text}</h1>}

      <div className={`chat-wrapper ${started ? "chat-started" : ""}`}>
        <div className="chat-area">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={msg.role === "user" ? "msg-user" : "msg-bot"}
            >
              {msg.isLoading ? <div className="loader" /> : msg.text}
            </div>
          ))}
          {/*div vuoto x lo scroll collegato a useRef */}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-completo">
          <button className="aggiungi">
            <i className="fa-solid fa-plus" />
          </button>

          <input
            className="chat-input"
            type="text"
            placeholder={isBotTyping ? "" : "Fai una domanda"}
            disabled={isBotTyping}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <button className="detta">
            <i className="fa-solid fa-microphone fa-lg" />
          </button>

          <button className="invio" onClick={handleSend} disabled={isBotTyping}>
            <i className="fa-solid fa-paper-plane" />
          </button>
        </div>
      </div>
    </div>
  );
}
