"use client";

import { useMemo, useState } from "react";

type Choice = { id: string; label: string; hint: string; icon: string };
type Step = { eyebrow: string; title: string; subtitle: string; choices: Choice[] };

const steps: Step[] = [
  {
    eyebrow: "Modo coqueteo",
    title: "¿Con qué energía quieres empezar este juego?",
    subtitle: "Elige tu nivel de picardía. Nosotros ponemos la frase; tú decides hasta dónde.",
    choices: [
      { id: "juego", label: "Sarcasmo coqueto", hint: "Hazme reír y luego hablamos", icon: "✦" },
      { id: "directa", label: "Directo al grano", hint: "Sin rodeos: dime qué te llamó la atención", icon: "↗" },
      { id: "traviesa", label: "Modo travieso", hint: "Doble sentido, mirada incluida", icon: "⚡" },
    ],
  },
  {
    eyebrow: "Primer impacto",
    title: "¿Qué quieres que note primero de ti?",
    subtitle: "Nada de cumplidos de tarjeta. Vamos con algo que sí provoque una sonrisa.",
    choices: [
      { id: "mirada", label: "Mi mirada", hint: "Esa que dice más de lo que admite", icon: "◉" },
      { id: "actitud", label: "Mi actitud", hint: "Seguridad que no pasa desapercibida", icon: "⚡" },
      { id: "sonrisa", label: "Mi sonrisa", hint: "Parece inocente... parece", icon: "☺" },
    ],
  },
  {
    eyebrow: "Sube la chispa",
    title: "Ahora elige la pregunta que pone esto interesante",
    subtitle: "Picante sin pasarse. Si te hace sonreír antes de responder, funciona.",
    choices: [
      { id: "peligro", label: "¿Qué sería más peligroso?", hint: "La primera mirada o quedarnos hablando a solas", icon: "⚡" },
      { id: "inocente", label: "¿Provocas o te haces la inocente?", hint: "Una pregunta con trampa y sonrisa", icon: "😏" },
      { id: "reto", label: "¿Te atreves a una apuesta?", hint: "Quien pierda elige el postre... o paga el reto", icon: "◆" },
    ],
  },
  {
    eyebrow: "Saca esto del chat",
    title: "¿En qué plan comprobamos si la química es real?",
    subtitle: "Elige el escenario. La tensión divertida la ponemos entre los dos.",
    choices: [
      { id: "cine", label: "Cine con distracciones", hint: "Película, crispetas y ver quién mira a quién", icon: "▶" },
      { id: "paseo", label: "Atardecer con reto", hint: "Caminata, conversación y una apuesta pendiente", icon: "◡" },
      { id: "comida", label: "Ruta de sabores", hint: "Probar algo nuevo y pelear por el último bocado", icon: "♨" },
      { id: "creativo", label: "Plan con competencia", hint: "Pintar, bailar o jugar: perder también puede ser premio", icon: "✎" },
      { id: "cafe", label: "Café que se alarga", hint: "Empieza con café; lo demás lo decide la química", icon: "☕" },
    ],
  },
  {
    eyebrow: "La jugada extra",
    title: "¿Qué detalle le ponemos para subirle el nivel?",
    subtitle: "Pequeño, inesperado y con suficiente picardía para recordarlo.",
    choices: [
      { id: "playlist", label: "Playlist con mensaje oculto", hint: "Tres canciones para adivinar la intención", icon: "♫" },
      { id: "postre", label: "Postre a medias", hint: "Una cucharita, dos sospechosos", icon: "◇" },
      { id: "sorpresa", label: "Una apuesta con premio", hint: "El reto se acuerda entre los dos", icon: "✦" },
      { id: "foto", label: "La selfie que delata", hint: "Solo si ambos quieren dejar evidencia", icon: "◉" },
    ],
  },
  {
    eyebrow: "Hora de la travesura",
    title: "¿Cuándo ponemos a prueba esta química?",
    subtitle: "Escoge el momento; la excusa ya la tenemos.",
    choices: [
      { id: "viernes", label: "Viernes en la noche", hint: "Para empezar el fin de semana con peligro", icon: "☾" },
      { id: "sabado", label: "Sábado sin afán", hint: "Tiempo de sobra para que el plan se alargue", icon: "☀" },
      { id: "domingo", label: "Domingo con excusa", hint: "Un plan tranquilo que puede ponerse interesante", icon: "☁" },
      { id: "coordinar", label: "Sorpréndeme con la hora", hint: "Lo cuadramos juntos, sin perder el misterio", icon: "↔" },
    ],
  },
  {
    eyebrow: "Reglas del juego",
    title: "¿Qué pacto hacemos para la primera cita?",
    subtitle: "Coquetear sí; adivinar límites, no. Elige la regla que manda.",
    choices: [
      { id: "presente", label: "Nada de mirar el teléfono", hint: "La distracción debería estar al frente", icon: "◎" },
      { id: "risa", label: "El que se sonroje pierde", hint: "Y quien pierda acepta un reto acordado", icon: "☺" },
      { id: "comodidad", label: "Si gusta, se dice; si no, también", hint: "La confianza siempre va primero", icon: "✓" },
    ],
  },
  {
    eyebrow: "La decisión final",
    title: "¿Seguimos jugando fuera de la pantalla?",
    subtitle: "Tú decides si hay cita, más conversación o si la chispa se queda aquí.",
    choices: [
      { id: "si", label: "Sí, acepto el reto", hint: "Quiero comprobar esa química en persona", icon: "⚡" },
      { id: "despacio", label: "Sigue coqueteando", hint: "Vas bien, pero todavía te falta convencerme", icon: "→" },
      { id: "no", label: "Prefiero dejarlo aquí", hint: "Gracias por entenderlo", icon: "✓" },
    ],
  },
];

const compliments: Record<string, string> = {
  mirada: "Esa mirada debería venir con advertencia: distrae más de lo permitido.",
  actitud: "Tienes esa seguridad que hace difícil mirarte solo una vez.",
  sonrisa: "Tu sonrisa parece inocente, pero tengo serias dudas sobre sus intenciones.",
};

const dateNames: Record<string, string> = {
  cine: "ir al cine, compartir crispetas y descubrir quién distrae primero a quién",
  cafe: "tomar un café que tenga permiso de convertirse en otro plan",
  paseo: "ver el atardecer, conversar y dejar una apuesta pendiente",
  comida: "hacer una ruta de sabores y discutir quién merece el último bocado",
  creativo: "competir en algo creativo donde perder también tenga premio",
};

const planVisuals: Record<string, { src: string; alt: string; caption: string }> = {
  cine: { src: "/dates/cinema-date.webp", alt: "Ilustración de una cita en el cine", caption: "Luces, película y crispetas" },
  paseo: { src: "/dates/sunset-date.webp", alt: "Ilustración de un picnic al atardecer", caption: "Atardecer, picnic y conversación" },
  comida: { src: "/dates/food-date.webp", alt: "Ilustración de una ruta gastronómica en pareja", caption: "Sabores nuevos para compartir" },
  creativo: { src: "/dates/creative-date.webp", alt: "Ilustración de una cita creativa", caption: "Crear algo juntos" },
  cafe: { src: "/dates/coffee-date.webp", alt: "Ilustración de una cita en una cafetería", caption: "Café, calma y una buena charla" },
};

const moments: Record<string, string> = {
  viernes: "Viernes en la noche",
  sabado: "Sábado en la tarde",
  domingo: "Domingo tranquilo",
  coordinar: "Lo coordinamos juntos",
};

const toneIntros: Record<string, string> = {
  juego: "Te propongo algo: yo intento conquistarte con humor y tú intentas no sonreír. Spoiler: vas perdiendo.",
  directa: "Voy sin rodeos: me llamaste la atención y ahora quiero saber si tu conversación es igual de peligrosa.",
  traviesa: "No sé si eres una buena idea, pero definitivamente pareces la clase de problema que provoca conocer.",
};

function Sparkles() {
  return <div className="sparkles" aria-hidden="true"><span>✦</span><span>♥</span><span>✦</span><span>♥</span></div>;
}

export default function Home() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResponse, setShowResponse] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const current = steps[step];
  const selectedId = answers[step];
  const selected = current?.choices.find((choice) => choice.id === selectedId);
  const isFinished = step === steps.length;

  const response = useMemo(() => {
    if (!selectedId) return "";
    if (step === 0) return toneIntros[selectedId];
    if (step === 1) return compliments[selectedId];
    if (step === 2) {
      const lines: Record<string, string> = {
        peligro: "La primera mirada. Porque si dura más de tres segundos, ya ninguno puede fingir que no pasó nada.",
        inocente: "Mi apuesta: provocas y luego pones cara de que no sabes de qué estoy hablando. ¿Me equivoco?",
        reto: "Acepto. Pero el premio lo acordamos juntos; así nadie se arrepiente de haber ganado.",
      };
      return lines[selectedId];
    }
    if (step === 3) return `Entonces te propongo ${dateNames[selectedId]}. ¿Te animas?`;
    if (step === 4) {
      const lines: Record<string, string> = {
        playlist: "Tres canciones, tres indirectas. Si adivinas las tres, te debo un premio.",
        postre: "Trato hecho: una cucharita y dos personas fingiendo que no querían el último bocado.",
        sorpresa: "La apuesta va, pero el premio se negocia entre los dos. Así se pone más interesante.",
        foto: "Una selfie espontánea, solo si ambos queremos. La química también merece evidencia.",
      };
      return lines[selectedId];
    }
    if (step === 5) return selectedId === "coordinar" ? "Perfecto. Tú pones una opción, yo pongo otra y dejamos que la química desempate." : `${moments[selectedId]} queda marcado. Yo llevo el plan; tú esa mirada peligrosa.`;
    if (step === 6) {
      const lines: Record<string, string> = {
        presente: "Prometido: el teléfono se guarda. Si voy a distraerme, prefiero que sea contigo.",
        risa: "Acepto. Pero si me haces sonrojar primero, el reto lo eliges tú.",
        comodidad: "Trato hecho: la química se disfruta más cuando podemos decir claramente qué sí y qué no.",
      };
      return lines[selectedId];
    }
    if (step === 7) {
      if (selectedId === "si") return "Aceptado. Ahora falta descubrir si en persona sostienes esa mirada igual de bien.";
      if (selectedId === "despacio") return "Perfecto. Entonces sigo coqueteando; todavía no he usado mis mejores cartas.";
      return "Gracias por decirlo con claridad. Tu decisión se respeta, siempre.";
    }
    return "";
  }, [selectedId, step]);

  function choose(id: string) {
    setAnswers((previous) => ({ ...previous, [step]: id }));
    setShowResponse(true);
  }

  function next() {
    setShowResponse(false);
    if (step === 2) {
      setStep(3);
      setShowLevelUp(true);
      return;
    }
    setStep((value) => Math.min(value + 1, steps.length));
  }

  function back() {
    if (showResponse) setShowResponse(false);
    else setStep((value) => Math.max(0, value - 1));
  }

  function reset() {
    setAnswers({});
    setStep(0);
    setShowResponse(false);
    setShowLevelUp(false);
    setStarted(false);
  }

  const finalChoice = answers[7];
  const dateChoice = answers[3];
  const momentChoice = answers[5];
  const activeVisual = planVisuals[dateChoice];

  return (
    <main className="site-shell">
      <div className="orb orb-one" aria-hidden="true" />
      <div className="orb orb-two" aria-hidden="true" />
      <nav className="nav" aria-label="Navegación principal">
        <button className="brand" onClick={reset} aria-label="Volver al inicio"><span className="brand-mark">C</span><span>Conecta Bonito</span></button>
        <div className="nav-note"><span>⚡</span> Cero frases aburridas</div>
      </nav>

      {!started ? (
        <section className="hero">
          <div className="hero-copy">
            <div className="kicker"><span /> El juego empieza aquí</div>
            <h1>Vamos a ver si hay <em>química.</em></h1>
            <p className="hero-lead">Preguntas con picardía, respuestas que coquetean y un plan para descubrir si esa tensión también funciona fuera de la pantalla.</p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => setStarted(true)}>Entrar al juego <span>→</span></button>
              <div className="time-note"><span>◷</span> 4 minutos de pura química</div>
            </div>
            <div className="trust-row">
              <div><span className="trust-icon">⚡</span><p><strong>Cero cursilería</strong><small>Más chispa, menos discurso</small></p></div>
              <div><span className="trust-icon">✓</span><p><strong>Tú marcas el límite</strong><small>El juego siempre es de dos</small></p></div>
            </div>
          </div>
          <div className="hero-visual" aria-label="Vista previa de la experiencia">
            <Sparkles />
            <div className="mini-card mini-card-back"><span>PLAN CON PELIGRO</span><strong>Cine con<br />distracciones</strong><i>⚡</i></div>
            <div className="preview-card">
              <div className="preview-top"><span>Conecta Bonito</span><b>1 / 8</b></div>
              <div className="portrait-badge" aria-hidden="true"><span>⚡</span></div>
              <p className="preview-label">MODO COQUETEO</p>
              <h2>¿Con qué energía empezamos?</h2>
              <div className="preview-option active"><span>✦</span><b>Sarcasmo coqueto</b><i>✓</i></div>
              <div className="preview-option"><span>↗</span><b>Directo al grano</b></div>
              <div className="preview-option"><span>⚡</span><b>Modo travieso</b></div>
              <div className="preview-footer">Tú eliges cuánto sube el juego <span>⚡</span></div>
            </div>
            <div className="floating-pill">😏 Aquí hay tensión</div>
          </div>
        </section>
      ) : (
        <section className="experience">
          <aside className="journey-panel">
            <div><div className="kicker light"><span /> {step < 3 ? "Nivel 1 · Enciende la chispa" : "Nivel 2 · Sácalo del chat"}</div><h2>¿Hasta dónde llega la química?</h2><p>Tú eliges la jugada. Nosotros ponemos las frases que no suenan copiadas.</p></div>
            <ol className="steps-list">
              {steps.map((item, index) => (
                <li key={item.eyebrow} className={index === step ? "active" : index < step ? "done" : ""}>
                  <span>{index < step || isFinished ? "✓" : index + 1}</span>
                  <div><strong>{item.eyebrow}</strong><small>{index === 3 && step < 3 ? "Siguiente nivel" : index < step ? "Listo" : index === step ? "Ahora" : "Después"}</small></div>
                </li>
              ))}
            </ol>
            <div className="respect-note"><span>✓</span><p><strong>Regla del juego</strong><small>Atrevido sí; insistente nunca.</small></p></div>
          </aside>

          <div className="interaction-panel">
            <div className="mobile-progress"><span>{Math.min(step + 1, steps.length)} de {steps.length} · {step < 3 ? "Enciende la chispa" : "Sácalo del chat"}</span><div><i style={{ width: `${Math.min(((step + 1) / steps.length) * 100, 100)}%` }} /></div></div>
            {showLevelUp ? (
              <div className="level-up-card" aria-live="polite">
                <div className="level-orbit" aria-hidden="true"><span>✦</span><b>2</b><i>♥</i></div>
                <p className="question-eyebrow">La química está encendida</p>
                <h2>Nivel 2 desbloqueado</h2>
                <p>El hielo ya se derritió. Ahora elige dónde comprobamos si esta química también funciona cara a cara.</p>
                <div className="level-perks"><span>🎬 Plan con tensión</span><span>😏 Retos coquetos</span><span>⚡ Cero aburrimiento</span></div>
                <button className="primary-button" onClick={() => setShowLevelUp(false)}>Sacar esto del chat <span>→</span></button>
              </div>
            ) : !isFinished ? (
              <div className="question-card" key={`${step}-${showResponse ? "response" : "question"}`}>
                <div className="question-number">0{step + 1}</div>
                {!showResponse ? (
                  <>
                    <p className="question-eyebrow">{current.eyebrow}</p>
                    <h2>{current.title}</h2>
                    <p className="question-subtitle">{current.subtitle}</p>
                    <div className="choices" role="radiogroup" aria-label={current.title}>
                      {current.choices.map((choice) => (
                        <button key={choice.id} className={`choice ${selectedId === choice.id ? "selected" : ""}`} onClick={() => choose(choice.id)} role="radio" aria-checked={selectedId === choice.id}>
                          <span className="choice-icon">{choice.icon}</span>
                          <span className="choice-copy"><strong>{choice.label}</strong><small>{choice.hint}</small></span>
                          <span className="choice-radio">{selectedId === choice.id ? "✓" : ""}</span>
                        </button>
                      ))}
                    </div>
                    {step > 0 && <button className="back-button" onClick={back}>← Volver</button>}
                  </>
                ) : (
                  <div className="response-view" aria-live="polite">
                    {step >= 3 && step <= 6 && activeVisual ? (
                      <div className="response-visual">
                        <img src={activeVisual.src} alt={activeVisual.alt} />
                        <span>{activeVisual.caption}</span>
                      </div>
                    ) : <div className="response-sticker"><span>{step === 7 && selectedId === "no" ? "✓" : "♥"}</span></div>}
                    <p className="question-eyebrow">Tu próxima jugada</p>
                    <blockquote>“{response}”</blockquote>
                    <p className="picked">Elegiste: <strong>{selected?.label}</strong></p>
                    <div className="response-actions">
                      <button className="primary-button" onClick={next}>{step === 7 ? "Ver nuestro final" : "Siguiente paso"} <span>→</span></button>
                      <button className="text-button" onClick={back}>Cambiar respuesta</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className={`final-card ${finalChoice === "no" ? "gentle" : ""}`}>
                <div className="final-burst" aria-hidden="true"><span>✦</span><i>♥</i><b>✦</b></div>
                <div className="final-icon">{finalChoice === "no" ? "✓" : "♥"}</div>
                <p className="question-eyebrow">Esto apenas se pone interesante</p>
                {finalChoice === "si" && <><h2>Reto aceptado.</h2><p>Queda oficialmente pendiente {dateNames[dateChoice]}. La pregunta ya no es si hay plan, sino quién va a ponerse nervioso primero.</p>{activeVisual && <div className="final-visual"><img src={activeVisual.src} alt={activeVisual.alt} /></div>}<div className="date-ticket"><span>PRIMERA CITA</span><strong>{steps[3].choices.find((c) => c.id === dateChoice)?.label}</strong><small>{moments[momentChoice]} · Lugar por elegir juntos</small></div></>}
                {finalChoice === "despacio" && <><h2>El juego continúa.</h2><p>Sin afán. Todavía quedan miradas, indirectas y buenas excusas para seguir hablando.</p></>}
                {finalChoice === "no" && <><h2>Gracias por ser clara.</h2><p>Saber retirarse con estilo también cuenta. Tu decisión se respeta sin preguntas ni presión.</p></>}
                <button className="primary-button" onClick={reset}>Jugar otra vez <span>↻</span></button>
              </div>
            )}
          </div>
        </section>
      )}
      <footer><span>Hecho para coquetear, no para presionar.</span><b>⚡</b><span>Conecta Bonito © 2026</span></footer>
    </main>
  );
}
