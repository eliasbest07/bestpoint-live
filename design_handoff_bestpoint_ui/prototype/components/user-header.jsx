// Header del usuario — hora GRANDE como protagonista
// El ring de rendimiento se mueve a un panel flotante más visible (PerformanceFloat)

function UserHeader({ onAvatarClick }) {
  const u = window.USER;
  const now = new Date();
  const hour = now.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' });
  const dayLabel = now.toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'short' });

  return (
    <div style={{ padding: '14px 18px 10px' }}>
      {/* Big time block */}
      <div style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        marginBottom: 12,
      }}>
        <div>
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: 11, color: THEME.inkSoft,
            textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600,
          }}>{dayLabel}</div>
          <div style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800,
            fontSize: 56, lineHeight: 0.95, letterSpacing: -2.5,
            color: THEME.ink,
          }}>{hour}</div>
        </div>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4,
        }}>
          <button
            onClick={onAvatarClick}
            style={{
              padding: 0, background: 'transparent', border: 'none', cursor: 'pointer',
              borderRadius: '50%',
            }}>
            <Avatar name={u.name} size={44} hue={u.hue}/>
          </button>
          <div style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 12,
            color: THEME.ink,
          }}>{u.name.split(' ')[0]}</div>
        </div>
      </div>

      {/* Quick stats row */}
      <div style={{
        display: 'flex', gap: 6, alignItems: 'center',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          background: THEME.yellow, border: `1.5px solid ${THEME.ink}`,
          borderRadius: 999, padding: '4px 10px',
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 11,
          color: THEME.ink, boxShadow: `2px 2px 0 ${THEME.ink}`,
        }}>Lv.{u.level} · {u.levelName}</div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 3,
          background: '#FFFCF5', border: `1.5px solid ${THEME.ink}`,
          borderRadius: 999, padding: '4px 10px',
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 11,
          color: THEME.ink,
        }}>
          <Icon.Flame size={13}/> {u.streak} días
        </div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          background: '#FFFCF5', border: `1.5px solid ${THEME.ink}`,
          borderRadius: 999, padding: '4px 10px 4px 4px',
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 11,
          color: THEME.ink,
        }}>
          <Icon.Coin size={16}/> {u.coins.toLocaleString('es')}
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// Panel flotante de rendimiento
// Aparece como pestaña colapsada en el borde, se expande con tap
// ────────────────────────────────────────────────
function PerformanceFloat({ open, setOpen }) {
  const u = window.USER;
  const perf = u.performance;

  // Big ring dimensions
  const R = 44, C = 2 * Math.PI * R;
  const offset = C - (perf / 100) * C;

  // level thresholds
  const nextAt = 25;
  const remaining = nextAt - perf;

  return (
    <div style={{
      position: 'absolute', right: open ? 10 : 0, top: 120,
      zIndex: 50, transition: 'right 0.3s cubic-bezier(.3,1.2,.4,1)',
    }}>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 12px 8px 10px',
            background: THEME.coral, color: '#fff',
            border: `2px solid ${THEME.ink}`,
            borderRight: 'none',
            borderRadius: '14px 0 0 14px',
            boxShadow: `-2px 3px 0 ${THEME.ink}`,
            cursor: 'pointer',
          }}>
          <div style={{
            width: 26, height: 26, borderRadius: '50%',
            background: '#fff', border: `1.5px solid ${THEME.ink}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 10,
            color: THEME.ink,
          }}>{perf}%</div>
          <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: 8,
              textTransform: 'uppercase', letterSpacing: 1, opacity: 0.9, fontWeight: 600,
            }}>rendimiento</div>
            <div style={{
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 12,
            }}>tu semana</div>
          </div>
        </button>
      ) : (
        <div style={{
          width: 240, background: '#FFFCF5',
          border: `2px solid ${THEME.ink}`, borderRadius: 22,
          boxShadow: `4px 4px 0 ${THEME.coral}`,
          padding: 14, position: 'relative',
          animation: 'bpSlideUp 0.25s',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 10,
          }}>
            <div style={{
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 13,
              color: THEME.ink, letterSpacing: -0.2,
            }}>Rendimiento</div>
            <button onClick={() => setOpen(false)} style={{
              width: 22, height: 22, borderRadius: '50%',
              background: THEME.ink, color: THEME.bg, border: 'none', cursor: 'pointer',
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>×</button>
          </div>

          {/* Big ring */}
          <div style={{
            position: 'relative', width: 110, height: 110, margin: '4px auto 12px',
          }}>
            <svg width="110" height="110" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="55" cy="55" r={R} fill="none" stroke="rgba(26,25,24,0.08)" strokeWidth="10"/>
              <circle cx="55" cy="55" r={R} fill="none" stroke={THEME.coral} strokeWidth="10"
                strokeDasharray={C} strokeDashoffset={offset} strokeLinecap="round"/>
            </svg>
            <div style={{
              position: 'absolute', inset: 0, display: 'flex',
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 36,
                letterSpacing: -1, color: THEME.ink, lineHeight: 1,
              }}>{perf}<span style={{ fontSize: 16 }}>%</span></div>
              <div style={{
                fontFamily: 'Inter, sans-serif', fontSize: 9,
                textTransform: 'uppercase', letterSpacing: 1,
                color: THEME.inkSoft, fontWeight: 600,
              }}>esta semana</div>
            </div>
          </div>

          {/* Micro bars — últimos 7 días */}
          <div style={{
            display: 'flex', gap: 4, alignItems: 'flex-end',
            height: 32, marginBottom: 10,
          }}>
            {[12, 8, 15, 5, 18, 10, 14].map((v, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <div style={{
                  width: '100%', height: v, background: i === 6 ? THEME.coral : THEME.ink,
                  borderRadius: 3,
                }}/>
                <div style={{
                  fontFamily: 'ui-monospace, monospace', fontSize: 8, color: THEME.inkSoft,
                }}>{'LMXJVSD'[i]}</div>
              </div>
            ))}
          </div>

          <div style={{
            padding: '8px 10px', borderRadius: 12,
            background: THEME.bgAlt, border: `1.5px dashed ${THEME.ink}`,
            fontFamily: 'Inter, sans-serif', fontSize: 11, color: THEME.inkMid,
            lineHeight: 1.4,
          }}>
            <b style={{ color: THEME.ink, fontFamily: 'Space Grotesk, sans-serif' }}>
              Te faltan {remaining}% para Lv.{u.level + 1}
            </b>
            <div>Publicá 1 post o uníte a una reunión para subir.</div>
          </div>
        </div>
      )}
    </div>
  );
}

window.UserHeader = UserHeader;
window.PerformanceFloat = PerformanceFloat;
