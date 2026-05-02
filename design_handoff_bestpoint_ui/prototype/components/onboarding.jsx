// Onboarding — "original" variante: cards estilo polaroid que se apilan y se despegan
// El usuario hace swipe/click para mandar la card al aire y revelar la siguiente.
// Cada card tiene un pin / sticker / sello y un ilustración placeholder.

const ONBOARDING_CARDS = [
  {
    id: 'o1',
    title: 'Bestpoint es un club',
    subtitle: 'De personas. No de feed.',
    text: 'Un lugar para encontrar gente con la que compartir proyectos, libros, tardes de trabajo.',
    sticker: 'para ti',
    stickerColor: '#FFC83A',
    hue: 25, rot: -6,
  },
  {
    id: 'o2',
    title: 'Publica lo que haces',
    subtitle: 'Fotos, notas, videos.',
    text: 'Compartí tu proceso. Un post a la semana basta para mantener vivo el vínculo.',
    sticker: 'post',
    stickerColor: '#FF5B3A',
    hue: 210, rot: 5,
  },
  {
    id: 'o3',
    title: 'Suscribite y colaborá',
    subtitle: 'Agendas, reuniones, ideas.',
    text: 'Los miembros pueden proponer encuentros, repartir tareas y construir juntos.',
    sticker: 'club',
    stickerColor: '#2FD576',
    hue: 140, rot: -4,
  },
  {
    id: 'o4',
    title: 'Otro nivel de participación',
    subtitle: 'Aportá, no consumás.',
    text: 'Acá no se gana con likes. Se gana con presencia, con aparecer, con cumplir.',
    sticker: 'juntos',
    stickerColor: '#6B5BFF',
    hue: 320, rot: 7,
  },
];

function Onboarding({ onFinish }) {
  const [idx, setIdx] = React.useState(0);
  const [leaving, setLeaving] = React.useState(null); // id of card being thrown

  const next = () => {
    if (leaving) return;
    const cur = ONBOARDING_CARDS[idx];
    setLeaving(cur.id);
    setTimeout(() => {
      setLeaving(null);
      if (idx >= ONBOARDING_CARDS.length - 1) onFinish();
      else setIdx(i => i + 1);
    }, 450);
  };

  const skip = () => onFinish();

  // visible stack: current + next 2
  const visible = ONBOARDING_CARDS.slice(idx, idx + 3);

  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%',
      background: THEME.bg, overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* decor */}
      <svg style={{ position: 'absolute', top: -60, right: -80, opacity: 0.9, zIndex: 0 }} width="260" height="260" viewBox="0 0 200 200">
        <path fill={THEME.coral} opacity="0.18" d="M42.8,-58.1C54.5,-47.4,62.2,-33.3,66.4,-18.1C70.6,-2.9,71.3,13.4,64.9,26.3C58.5,39.2,45,48.7,30.6,56.3C16.2,63.9,0.9,69.6,-14.8,69.5C-30.5,69.4,-46.6,63.4,-56.9,51.6C-67.3,39.8,-71.9,22.1,-72.2,4.4C-72.4,-13.3,-68.3,-31,-57.8,-42.4C-47.3,-53.8,-30.4,-58.9,-14.4,-61.9C1.5,-64.8,17.2,-65.7,32,-68.3" transform="translate(100 100)"/>
      </svg>
      <svg style={{ position: 'absolute', bottom: -80, left: -60, opacity: 0.9, zIndex: 0 }} width="260" height="260" viewBox="0 0 200 200">
        <path fill={THEME.violet} opacity="0.15" d="M38.1,-53.2C48.6,-44.3,55.2,-31.2,60.1,-17.4C65,-3.6,68.3,10.9,63.8,22.2C59.3,33.5,47,41.6,34.1,50.3C21.2,59,7.7,68.3,-7,71.3C-21.7,74.2,-37.6,70.8,-48.2,61.4C-58.7,51.9,-63.9,36.4,-66.5,21C-69.1,5.5,-69.1,-10,-63.7,-22.8C-58.4,-35.5,-47.8,-45.5,-36,-53.1C-24.2,-60.8,-11.2,-66.1,2.1,-69C15.4,-71.9,30.7,-72.4,38.1,-53.2" transform="translate(100 100)"/>
      </svg>

      {/* top bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 22px', position: 'relative', zIndex: 5,
      }}>
        <div style={{
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 20,
          color: THEME.ink, letterSpacing: -0.5,
        }}>
          <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: THEME.coral, marginRight: 6, border: `1.5px solid ${THEME.ink}` }}/>
          bestpoint
        </div>
        <button onClick={skip} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          fontFamily: 'Inter, sans-serif', fontSize: 13, color: THEME.inkMid, fontWeight: 500,
        }}>Saltar</button>
      </div>

      {/* card stack */}
      <div style={{
        flex: 1, position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '0 28px',
      }}>
        {visible.map((card, i) => {
          const isActive = i === 0;
          const isLeaving = leaving === card.id;
          const baseRot = card.rot + (i * -3);
          const translateY = i * 14;
          const scale = 1 - i * 0.04;
          return (
            <div
              key={card.id}
              onClick={isActive ? next : undefined}
              style={{
                position: 'absolute',
                width: 290,
                transform: isLeaving
                  ? `translate(220px, -400px) rotate(40deg) scale(0.8)`
                  : `translateY(${translateY}px) scale(${scale}) rotate(${baseRot}deg)`,
                opacity: isLeaving ? 0 : 1,
                transition: 'transform 0.5s cubic-bezier(.5,1.5,.4,1), opacity 0.35s',
                zIndex: 10 - i,
                cursor: isActive ? 'pointer' : 'default',
                filter: i === 0 ? 'none' : `blur(${i * 0.5}px)`,
              }}
            >
              <OnboardCard card={card} />
            </div>
          );
        })}
      </div>

      {/* bottom cta + dots */}
      <div style={{ padding: '20px 28px 40px', position: 'relative', zIndex: 5 }}>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 20 }}>
          {ONBOARDING_CARDS.map((_, i) => (
            <div key={i} style={{
              width: i === idx ? 24 : 8, height: 8, borderRadius: 999,
              background: i === idx ? THEME.ink : 'rgba(26,25,24,0.2)',
              transition: 'width 0.3s',
            }}/>
          ))}
        </div>
        <button onClick={next} style={{
          width: '100%', height: 56, borderRadius: 999,
          background: THEME.ink, color: THEME.bg,
          border: `2px solid ${THEME.ink}`, cursor: 'pointer',
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 17,
          boxShadow: `3px 3px 0 ${THEME.coral}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        }}>
          {idx === ONBOARDING_CARDS.length - 1 ? 'Entrar al club' : 'Siguiente'}
          <Icon.Arrow size={18} stroke={THEME.bg}/>
        </button>
        <div style={{
          textAlign: 'center', marginTop: 12,
          fontFamily: 'Inter, sans-serif', fontSize: 12, color: THEME.inkSoft,
        }}>Tocá la tarjeta para despegarla</div>
      </div>
    </div>
  );
}

function OnboardCard({ card }) {
  return (
    <div style={{
      background: '#FFFCF5', borderRadius: 24,
      border: `2px solid ${THEME.ink}`,
      padding: 14,
      boxShadow: `6px 6px 0 ${THEME.ink}`,
      position: 'relative',
    }}>
      {/* pin / sticker */}
      <div style={{ position: 'absolute', top: -14, right: 18, zIndex: 2 }}>
        <Sticker color={card.stickerColor} rotate={8}>{card.sticker}</Sticker>
      </div>

      {/* illustration placeholder */}
      <div style={{
        height: 180, borderRadius: 16, overflow: 'hidden',
        border: `2px solid ${THEME.ink}`, marginBottom: 14,
        background: `hsl(${card.hue} 75% 85%)`,
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `repeating-linear-gradient(135deg, transparent 0 18px, hsl(${card.hue} 70% 78%) 18px 20px)`,
        }}/>
        {/* abstract shape */}
        <svg style={{ position: 'absolute', inset: 0 }} width="100%" height="100%" viewBox="0 0 260 180">
          <circle cx="80" cy="90" r="42" fill={`hsl(${card.hue} 80% 70%)`} stroke={THEME.ink} strokeWidth="2"/>
          <rect x="130" y="50" width="90" height="80" rx="14" fill={`hsl(${(card.hue+40)%360} 75% 75%)`} stroke={THEME.ink} strokeWidth="2" transform="rotate(6 175 90)"/>
          <circle cx="195" cy="135" r="12" fill={THEME.yellow} stroke={THEME.ink} strokeWidth="2"/>
        </svg>
        <div style={{
          position: 'absolute', bottom: 8, left: 8,
          background: '#FFFCF5', padding: '3px 8px', borderRadius: 6,
          border: `1.5px solid ${THEME.ink}`,
          fontFamily: 'ui-monospace, monospace', fontSize: 10,
          color: THEME.ink,
        }}>ilustración {card.id}</div>
      </div>

      <div style={{
        fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600,
        color: THEME.coral, textTransform: 'uppercase', letterSpacing: 1,
        marginBottom: 4,
      }}>{card.subtitle}</div>
      <div style={{
        fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 24,
        color: THEME.ink, lineHeight: 1.1, marginBottom: 8, textWrap: 'balance',
      }}>{card.title}</div>
      <div style={{
        fontFamily: 'Inter, sans-serif', fontSize: 14, color: THEME.inkMid, lineHeight: 1.4,
      }}>{card.text}</div>
    </div>
  );
}

window.Onboarding = Onboarding;
