export default function FloatingBots() {
  const numBots = 30; // adesso 30 bot

  return (
    <div className="bots-bg">
      {Array.from({ length: numBots }).map((_, i) => (
        <div
          key={i}
          className={`bot bot-${i % 3}`} // assegna keyframes 0,1,2 ciclicamente
          style={{
            top: `${Math.random() * 90}%`, // posizione verticale casuale
            left: `${Math.random() * 90}%`, // posizione orizzontale casuale
            animationDuration: `${20 + Math.random() * 15}s`, // durata casuale tra 20s e 35s
          }}
        >
          <span className="eye left" />
          <span className="eye right" />
        </div>
      ))}
    </div>
  );
}
