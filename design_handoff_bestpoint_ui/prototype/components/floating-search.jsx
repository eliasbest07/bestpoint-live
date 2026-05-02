// Buscador flotante: overlay oscuro, input arriba, resultados filtrados debajo.
// Escribir filtra por coincidencia en label. Cada resultado es un botón con icono + título.
// Al seleccionar -> onSelect(toolId) -> se cierra y hace MRU bump.

function FloatingSearch({ open, onClose, onSelect }) {
  const [q, setQ] = React.useState('');
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      setQ('');
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  const filtered = React.useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return window.TOOLS;
    return window.TOOLS.filter(t => t.label.toLowerCase().includes(query));
  }, [q]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'absolute', inset: 0, zIndex: 90,
        background: 'rgba(26,25,24,0.55)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        display: 'flex', flexDirection: 'column',
        padding: '70px 14px 14px',
        animation: 'bpFadeIn 0.2s',
      }}>
      <style>{`
        @keyframes bpFadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes bpSlideUp { from { transform: translateY(20px); opacity: 0 } to { transform: none; opacity: 1 } }
      `}</style>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#FFFCF5', borderRadius: 26,
          border: `2px solid ${THEME.ink}`,
          boxShadow: `4px 4px 0 ${THEME.coral}`,
          padding: 14, flex: 1, minHeight: 0,
          display: 'flex', flexDirection: 'column',
          animation: 'bpSlideUp 0.3s cubic-bezier(.3,1.2,.4,1)',
        }}>
        {/* Input */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 14px', borderRadius: 16,
          background: THEME.bgAlt, border: `1.5px solid ${THEME.ink}`,
          marginBottom: 12,
        }}>
          <Icon.Search size={18} stroke={THEME.ink}/>
          <input
            ref={inputRef}
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Escribe para buscar..."
            style={{
              flex: 1, border: 'none', background: 'transparent', outline: 'none',
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 16,
              color: THEME.ink,
            }}
          />
          <button onClick={onClose} style={{
            width: 28, height: 28, borderRadius: '50%',
            background: THEME.ink, color: THEME.bg,
            border: 'none', cursor: 'pointer',
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>×</button>
        </div>

        {/* Section label */}
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700,
          color: THEME.inkSoft, textTransform: 'uppercase', letterSpacing: 1,
          padding: '4px 4px 8px',
        }}>{q ? `${filtered.length} resultado${filtered.length === 1 ? '' : 's'}` : 'Acciones'}</div>

        {/* Results grid */}
        <div style={{
          flex: 1, minHeight: 0, overflowY: 'auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8,
          padding: '2px',
        }}>
          {filtered.map((tool) => {
            const IconComp = window.Icon[tool.icon];
            return (
              <button
                key={tool.id}
                onClick={() => onSelect(tool.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '12px', borderRadius: 16,
                  background: '#FFFCF5', border: `1.5px solid ${THEME.ink}`,
                  cursor: 'pointer', textAlign: 'left',
                  boxShadow: `2px 2px 0 ${THEME.ink}`,
                  transition: 'transform 0.12s',
                }}
                onMouseDown={e => e.currentTarget.style.transform = 'translate(1px,1px)'}
                onMouseUp={e => e.currentTarget.style.transform = ''}
                onMouseLeave={e => e.currentTarget.style.transform = ''}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: tool.color, border: `1.5px solid ${THEME.ink}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <IconComp size={18} stroke={THEME.ink}/>
                </div>
                <div style={{
                  fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                  fontSize: 13, color: THEME.ink, lineHeight: 1.2,
                }}>{tool.label}</div>
              </button>
            );
          })}
          {filtered.length === 0 && (
            <div style={{
              gridColumn: '1 / -1', textAlign: 'center', padding: 30,
              fontFamily: 'Inter, sans-serif', fontSize: 13, color: THEME.inkSoft,
            }}>Sin coincidencias para "{q}"</div>
          )}
        </div>
      </div>
    </div>
  );
}

// Toast confirmación al ejecutar una tool
function ToolToast({ message, onDone }) {
  React.useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, [message]);
  if (!message) return null;
  return (
    <div style={{
      position: 'absolute', top: 60, left: '50%',
      transform: 'translateX(-50%)', zIndex: 110,
      padding: '10px 16px', borderRadius: 999,
      background: THEME.ink, color: THEME.bg,
      border: `2px solid ${THEME.bg}`,
      boxShadow: `3px 3px 0 ${THEME.coral}`,
      fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 13,
      whiteSpace: 'nowrap', animation: 'bpSlideUp 0.3s',
    }}>✓ {message}</div>
  );
}

window.FloatingSearch = FloatingSearch;
window.ToolToast = ToolToast;
