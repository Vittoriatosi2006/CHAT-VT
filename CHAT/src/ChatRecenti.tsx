import { useRef, useState, useEffect } from "react";

type Conversazione = {
  giorno: string;
  testo: string;
};

export function ChatRecenti() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  const [conversazioni, setConversazioni] = useState<Conversazione[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/conversazioni")
      .then((res) => res.json())
      .then((data) => setConversazioni(data))
      .catch(() => setConversazioni(conversazioniMockate));
  }, []);

  const conversazioniMockate = [
    { giorno: "OGGI", testo: "Ciao! Come sta andando la tua giornata?" },
    {
      giorno: "1 GIORNO FA",
      testo: "Ieri è stato un giorno produttivo, vero?",
    },
    { giorno: "2 GIORNI FA", testo: "Hai visto l’ultima notizia?" },
    { giorno: "3 GIORNI FA", testo: "Ti sei ricordato di fare quella cosa?" },
    {
      giorno: "4 GIORNI FA",
      testo: "Abbiamo pianificato tutto correttamente.",
    },
    { giorno: "5 GIORNI FA", testo: "È stato un weekend rilassante?" },
    { giorno: "6 GIORNI FA", testo: "Hai completato il progetto in tempo?" },
    { giorno: "7 GIORNI FA", testo: "Come è andata la riunione?" },
    { giorno: "8 GIORNI FA", testo: "Ti sei divertito durante la serata?" },
    { giorno: "9 GIORNI FA", testo: "Hai avuto tempo per leggere qualcosa?" },
    {
      giorno: "10 GIORNI FA",
      testo: "È passato così tanto tempo da quella conversazione!",
    },
  ];

  return (
    <div className="wrapperChatRecenti">
      <button className="scroll-btn left" onClick={scrollLeft}>
        <i className="fa-solid fa-chevron-left"></i>
      </button>

      <div className="chatRecenti" ref={scrollRef}>
        {" "}
        //x lo scroll orizzontale
        {conversazioni.map((giorno, index) => (
          <div className="conversazione" key={index}>
            <h1>{giorno.giorno}</h1>
            <span>{giorno.testo}</span>
          </div>
        ))}
      </div>

      <button className="scroll-btn right" onClick={scrollRight}>
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
}
