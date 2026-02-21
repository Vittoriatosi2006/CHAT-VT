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

  const h1Replies: string[] = [
    "Ciao! 👋😊",
    "Allora, ti butti? 🚀😏",
    "Da dove iniziamo? 🧭✨",
    "Come posso aiutarti? 🤝💡",
  ];
  function getRandomReply(lista: string[]): string {
    const randomIndex = Math.floor(Math.random() * lista.length);
    return lista[randomIndex];
  }
  //lo useState serve perche senno l'h1 cambierebbe a ogni scritta aggiunta nell'input
  const [h1Text] = useState(() => getRandomReply(h1Replies));

  //collegato al div vuoto
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  //quando le scritte arrivano infondo alla pagina scrolla da solo
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  // function handleSend(): void {
  //   //se i bot sta scrivendo, il messaggio  scritto in input non viene inviato
  //   if (isBotTyping) return;
  //   //se il messsaggio è vuoto non viene invaito
  //   if (input.trim() === "") return;

  //   const userMessage: Message = {
  //     role: "user",
  //     text: input,
  //   };

  //   //svuota l'input dopo l'invio
  //   setInput("");
  //   setStarted(true);
  //   setIsBotTyping(true);

  //   const loaderMessage: Message = {
  //     role: "bot",
  //     text: null,
  //     isLoading: true,
  //   };
  //   // prende i messaggi prima e aggiunge il nuovo
  //   setMessages((prev) => [...prev, userMessage, loaderMessage]);

  //   setTimeout(() => {
  //     const botMessage: Message = {
  //       role: "bot",
  //       text: getRandomReply(botReplies),
  //     };

  //     setMessages((prev) =>
  //       prev.map((msg) => (msg.isLoading ? botMessage : msg)),
  //     );

  //     setIsBotTyping(false); //il bot ha finito e l'input si può usare di nuovo
  //   }, 1500);
  // }

  async function handleSend(): Promise<void> {
    if (isBotTyping) return;
    if (input.trim() === "") return;

    const userMessage: Message = {
      role: "user",
      text: input,
    };

    setInput("");
    setStarted(true);
    setIsBotTyping(true);

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }), //invia l'input dell'utente dal server (da oggetto js a testo json)
      });

      const data = await response.json(); //ricevo la risposta del bot dal server (da testo json a oggetto js)

      const botMessage: Message = {
        role: "bot",
        text: data.reply, //risposta del bot dal server
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsBotTyping(false);
    } catch (error) {
      setTimeout(() => {
        const botMessage: Message = {
          role: "bot",
          text: getRandomReply(botReplies),
        };

        setMessages((prev) => [...prev, botMessage]);
        setIsBotTyping(false);
      }, 1500);
    }
  }

  return (
    <div className="chatMain">
      {!started && <h1>{h1Text}</h1>}

      <div className={`chat-wrapper ${started ? "chat-started" : "empty"}`}>
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
          <input
            className="chat-input"
            type="text"
            placeholder={isBotTyping ? "" : "Fai una domanda"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button className="invio" onClick={handleSend} disabled={isBotTyping}>
            {isBotTyping ? (
              <i className="fa-solid fa-spinner fa-spin fa-lg" />
            ) : (
              <i className="fa-solid fa-paper-plane" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
