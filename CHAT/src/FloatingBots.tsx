export default function FloatingBots() {
  const numBots = 30;

  return (
    <div className="bots-bg">
      {/*creimamo un array di 30 elementi e I prende un elemento alla volta*/}
      {Array.from({ length: numBots }).map((_, i) => (
        <div
          key={i}
          className={`bot bot-${i % 3}`} //assegna a tutti la classe CSS 'bot' e anche 'bot-0', 'bot-1' o 'bot-2'
          style={{
            top: `${Math.random() * 90}%`, //Posizione verticale casuale tra 0% e 90% dello schermo.
            left: `${Math.random() * 90}%`, //Posizione orizzontale casuale tra 0% e 90% dello schermo.
            animationDuration: `${20 + Math.random() * 15}s`, //Durata dell'animazione casuale tra 20s e 35s.
          }}
        >
          <span className="eye left" />
          <span className="eye right" />
        </div>
      ))}
    </div>
  );
}
