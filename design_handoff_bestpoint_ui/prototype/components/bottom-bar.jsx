// Bottom bar: Tabs (Feed/Club/Perfil) + shortcuts dinámicos (4) + botón +
// Persists last used tools in localStorage as an MRU (most-recently-used) list.
// When tools fire, they bump to the front.

const DEFAULT_MRU = ['t_note', 't_task', 't_idea', 't_post'];

function useMRU() {
  const [mru, setMru] = React.useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('bp_mru') || 'null');
      if (Array.isArray(saved) && saved.length >= 4) return saved.slice(0, 8);
    } catch {}
    return DEFAULT_MRU;
  });
  const bump = (toolId) => {
    setMru(prev => {
      const next = [toolId, ...prev.filter(id => id !== toolId)].slice(0, 8);
      try { localStorage.setItem('bp_mru', JSON.stringify(next)); } catch {}
      return next;
    });
  };
  const reset = () => {
    setMru(DEFAULT_MRU);
    try { localStorage.setItem('bp_mru', JSON.stringify(DEFAULT_MRU)); } catch {}
  };
  return [mru, bump, reset];
}

function BottomBar({ tab, setTab, mru, onTool, onPlus, floating = true }) {
  const shortcuts = mru.slice(0, 4).map(id => window.TOOLS.find(t => t.id === id)).filter(Boolean);

  return (
    <div style={{
      position: floating ? 'absolute' : 'relative',
      bottom: floating ? 10 : 0, left: 0, right: 0,
      padding: floating ? '0 12px' : '0',
      zIndex: 40,
      pointerEvents: 'none',
    }}>
      <div style={{
        background: '#FFFCF5',
        border: `2px solid ${THEME.ink}`,
        borderRadius: 26,
        boxShadow: `3px 3px 0 ${THEME.ink}`,
        overflow: 'hidden',
        pointerEvents: 'auto',
      }}>
        {/* Shortcuts row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '8px 8px 6px',
          borderBottom: `1.5px dashed rgba(26,25,24,0.15)`,
        }}>
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: 9,
            color: THEME.inkSoft, textTransform: 'uppercase', letterSpacing: 1,
            writingMode: 'vertical-rl', transform: 'rotate(180deg)',
            padding: '2px 0', fontWeight: 700,
          }}>LIVE</div>
          <div style={{ display: 'flex', gap: 6, flex: 1 }}>
            {shortcuts.map((tool) => {
              const IconComp = window.Icon[tool.icon];
              return (
                <button
                  key={tool.id}
                  onClick={() => onTool(tool.id)}
                  style={{
                    flex: 1, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: 2,
                    padding: '6px 2px', borderRadius: 14,
                    background: tool.color, border: `1.5px solid ${THEME.ink}`,
                    cursor: 'pointer', minWidth: 0,
                    transition: 'transform 0.15s',
                  }}
                  onMouseDown={e => e.currentTarget.style.transform = 'translateY(1px)'}
                  onMouseUp={e => e.currentTarget.style.transform = ''}
                  onMouseLeave={e => e.currentTarget.style.transform = ''}
                >
                  <IconComp size={18} stroke={THEME.ink}/>
                  <div style={{
                    fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                    fontSize: 8.5, color: THEME.ink, letterSpacing: -0.1,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    maxWidth: '100%',
                  }}>{tool.label.replace('Crear ', '').replace('Reportar ', '').replace('Eliminar ', '').replace('Agendar ', '').replace('Editar ', '')}</div>
                </button>
              );
            })}
            <button
              onClick={onPlus}
              style={{
                width: 48, flexShrink: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 2,
                padding: '6px 2px', borderRadius: 14,
                background: THEME.ink, border: `1.5px solid ${THEME.ink}`,
                cursor: 'pointer',
              }}>
              <Icon.Plus size={20} stroke={THEME.bg}/>
              <div style={{
                fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                fontSize: 8.5, color: THEME.bg,
              }}>más</div>
            </button>
          </div>
        </div>

        {/* Tabs row */}
        <div style={{ display: 'flex', padding: '6px 8px 8px', gap: 4 }}>
          <TabButton icon={<Icon.Home size={20}/>} label="Feed" active={tab === 'feed'} onClick={() => setTab('feed')}/>
          <TabButton icon={<Icon.Club size={20}/>} label="Club" active={tab === 'club'} onClick={() => setTab('club')}/>
          <TabButton icon={<Icon.Profile size={20}/>} label="Perfil" active={tab === 'profile'} onClick={() => setTab('profile')}/>
        </div>
      </div>
    </div>
  );
}

function TabButton({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        padding: '8px', borderRadius: 14,
        background: active ? THEME.ink : 'transparent',
        color: active ? THEME.bg : THEME.ink,
        border: 'none', cursor: 'pointer',
        fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 12,
      }}>
      {React.cloneElement(icon, { stroke: active ? THEME.bg : THEME.ink })}
      {label}
    </button>
  );
}

window.BottomBar = BottomBar;
window.useMRU = useMRU;
