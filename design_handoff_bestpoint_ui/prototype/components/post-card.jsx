// Post card para el feed + fila de destacados

function Highlights() {
  const now = new Date();
  const curHour = now.getHours() + now.getMinutes() / 60;
  // parse time "HH:MM" -> numeric hour
  const parse = (t) => {
    if (t === 'ahora') return curHour;
    if (t === 'mañana') return curHour + 24;
    const [h, m] = t.split(':').map(Number);
    return h + (m || 0) / 60;
  };
  return (
    <div style={{
      display: 'flex', gap: 10, overflowX: 'auto',
      padding: '4px 18px 14px', scrollbarWidth: 'none',
    }}>
      <style>{`.hl-row::-webkit-scrollbar{display:none} @keyframes bpPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.15)}}`}</style>
      <div className="hl-row" style={{ display: 'flex', gap: 10 }}>
        {window.HIGHLIGHTS.map(h => {
          const tNum = parse(h.time);
          const diff = tNum - curHour;
          const soon = !h.live && diff > 0 && diff < 2; // próximas 2hs
          const past = !h.live && diff < 0 && h.time !== 'mañana';
          return (
            <div key={h.id} style={{
              flexShrink: 0, textAlign: 'center', cursor: 'pointer',
              opacity: past ? 0.45 : 1,
            }}>
              <div style={{
                position: 'relative',
                width: 56, height: 56, borderRadius: '50%',
                border: `2px solid ${THEME.ink}`,
                background: `hsl(${h.hue} 75% 80%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: soon ? `2px 2px 0 ${THEME.coral}` : `2px 2px 0 ${THEME.ink}`,
              }}>
                {h.live && (
                  <div style={{
                    position: 'absolute', top: -4, right: -4,
                    background: THEME.coral, borderRadius: 999,
                    padding: '1px 6px', fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 800, fontSize: 8, color: '#fff',
                    border: `1.5px solid ${THEME.ink}`, letterSpacing: 0.5,
                    animation: 'bpPulse 1.4s infinite',
                  }}>LIVE</div>
                )}
                {soon && (
                  <div style={{
                    position: 'absolute', top: -4, right: -4,
                    background: THEME.yellow, borderRadius: 999,
                    padding: '1px 5px', fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 800, fontSize: 7, color: THEME.ink,
                    border: `1.5px solid ${THEME.ink}`, letterSpacing: 0.5,
                  }}>PRONTO</div>
                )}
                <svg width="28" height="28" viewBox="0 0 28 28">
                  <circle cx="10" cy="12" r="6" fill={`hsl(${(h.hue+40)%360} 75% 70%)`} stroke={THEME.ink} strokeWidth="1.5"/>
                  <rect x="14" y="10" width="10" height="10" rx="2" fill={`hsl(${(h.hue+80)%360} 75% 75%)`} stroke={THEME.ink} strokeWidth="1.5"/>
                </svg>
              </div>
              <div style={{
                marginTop: 4, fontFamily: 'Space Grotesk, sans-serif', fontSize: 11,
                fontWeight: 700, color: THEME.ink, lineHeight: 1.1,
              }}>{h.label}</div>
              <div style={{
                fontFamily: 'ui-monospace, monospace', fontSize: 9,
                color: h.live ? THEME.coral : THEME.inkSoft, fontWeight: 700,
                marginTop: 1,
              }}>{h.time}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PostCard({ post, onAction }) {
  return (
    <div style={{
      background: '#FFFCF5', borderRadius: 22,
      border: `2px solid ${THEME.ink}`,
      boxShadow: `3px 3px 0 ${THEME.ink}`,
      marginBottom: 14, overflow: 'hidden',
    }}>
      {/* Author row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 14px 8px',
      }}>
        <Avatar name={post.author.name} size={34} hue={post.author.hue}/>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 14,
            color: THEME.ink,
          }}>{post.author.name}</div>
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: 11, color: THEME.inkSoft,
          }}>{post.time}</div>
        </div>
        <div style={{
          padding: '2px 10px', borderRadius: 999,
          background: post.tagColor, border: `1.5px solid ${THEME.ink}`,
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 10,
          color: THEME.ink,
        }}>{post.tag}</div>
      </div>

      {/* Media */}
      {post.type !== 'text' && post.type !== 'poll' && (
        <div style={{ padding: '0 14px' }}>
          <div style={{
            position: 'relative',
            height: 180, borderRadius: 16, overflow: 'hidden',
            border: `2px solid ${THEME.ink}`,
            background: `hsl(${post.hue} 75% 82%)`,
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: `repeating-linear-gradient(45deg, transparent 0 14px, hsl(${post.hue} 70% 76%) 14px 16px)`,
            }}/>
            <svg style={{ position: 'absolute', inset: 0 }} width="100%" height="100%" viewBox="0 0 300 180" preserveAspectRatio="xMidYMid slice">
              <circle cx="70" cy="90" r="40" fill={`hsl(${post.hue} 80% 72%)`} stroke={THEME.ink} strokeWidth="2"/>
              <rect x="140" y="40" width="110" height="100" rx="14" fill={`hsl(${(post.hue+40)%360} 75% 78%)`} stroke={THEME.ink} strokeWidth="2" transform="rotate(4 195 90)"/>
            </svg>
            {post.type === 'video' && (
              <div style={{
                position: 'absolute', inset: 0, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: THEME.ink, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 4px 12px rgba(0,0,0,0.3)`,
                  border: `2.5px solid ${THEME.bg}`,
                }}>
                  <Icon.Play size={22} fill={THEME.bg}/>
                </div>
              </div>
            )}
            <div style={{
              position: 'absolute', bottom: 8, left: 8,
              background: '#FFFCF5', padding: '3px 8px', borderRadius: 6,
              border: `1.5px solid ${THEME.ink}`,
              fontFamily: 'ui-monospace, monospace', fontSize: 10, color: THEME.ink,
            }}>{post.label}</div>
          </div>
        </div>
      )}

      {/* Poll */}
      {post.type === 'poll' && (
        <div style={{ padding: '0 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {post.poll.map((opt, i) => (
            <div key={i} style={{
              position: 'relative', height: 34, borderRadius: 10,
              background: THEME.bgAlt, border: `1.5px solid ${THEME.ink}`,
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0, width: `${opt.pct}%`,
                background: i === 0 ? THEME.coral : i === 1 ? THEME.violet : THEME.green,
                opacity: 0.4,
              }}/>
              <div style={{
                position: 'absolute', inset: 0, display: 'flex',
                alignItems: 'center', justifyContent: 'space-between',
                padding: '0 12px',
                fontFamily: 'Inter, sans-serif', fontSize: 13,
                fontWeight: 600, color: THEME.ink,
              }}>
                <span>{opt.label}</span>
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800 }}>{opt.pct}%</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div style={{ padding: '12px 14px 4px' }}>
        <div style={{
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 16,
          color: THEME.ink, lineHeight: 1.2, marginBottom: 4, textWrap: 'balance',
        }}>{post.title}</div>
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: 13, color: THEME.inkMid,
          lineHeight: 1.45,
        }}>{post.text}</div>
      </div>

      {/* Actions */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '10px 14px 14px',
      }}>
        <button
          onClick={() => onAction && onAction('t_comment')}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 12px', borderRadius: 999,
            background: THEME.bgAlt, border: `1.5px solid ${THEME.ink}`,
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 12,
            color: THEME.ink, cursor: 'pointer',
          }}>
          <Icon.Comment size={14}/> {post.comments}
        </button>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 12px', borderRadius: 999,
          background: 'transparent', border: `1.5px solid ${THEME.ink}`,
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 12,
          color: THEME.ink, cursor: 'pointer',
        }}>
          <Icon.Heart size={14}/> {post.likes}
        </button>
        <div style={{ flex: 1 }}/>
        <button style={{
          width: 30, height: 30, borderRadius: 999,
          background: 'transparent', border: `1.5px solid ${THEME.ink}`,
          cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon.Arrow size={12}/>
        </button>
      </div>
    </div>
  );
}

// "Scroll horizontal" del feed: una pila de posts compacta que se puede scrollear lateralmente
function HorizontalPostRow({ posts, onAction }) {
  return (
    <div style={{ padding: '0 18px 10px' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 10,
      }}>
        <div style={{
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 15,
          color: THEME.ink,
        }}>Del club · hoy</div>
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: 11, color: THEME.inkSoft,
        }}>desliza →</div>
      </div>
      <div style={{
        display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4,
        scrollbarWidth: 'none',
      }}>
        <style>{`.hp-row::-webkit-scrollbar{display:none}`}</style>
        <div className="hp-row" style={{ display: 'flex', gap: 10 }}>
          {posts.map(p => (
            <div key={p.id} style={{
              flexShrink: 0, width: 160,
              background: '#FFFCF5', borderRadius: 18,
              border: `2px solid ${THEME.ink}`,
              boxShadow: `2px 2px 0 ${THEME.ink}`,
              overflow: 'hidden', cursor: 'pointer',
            }}>
              <div style={{
                height: 90, position: 'relative',
                background: `hsl(${p.hue} 75% 80%)`,
                borderBottom: `2px solid ${THEME.ink}`,
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `repeating-linear-gradient(45deg, transparent 0 10px, hsl(${p.hue} 70% 74%) 10px 12px)`,
                }}/>
                <div style={{
                  position: 'absolute', top: 6, left: 6,
                  padding: '1px 6px', borderRadius: 999,
                  background: p.tagColor, border: `1.5px solid ${THEME.ink}`,
                  fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 8,
                  color: THEME.ink,
                }}>{p.tag}</div>
              </div>
              <div style={{ padding: 10 }}>
                <div style={{
                  fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 12,
                  color: THEME.ink, lineHeight: 1.2, marginBottom: 4,
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>{p.title}</div>
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 10, color: THEME.inkSoft,
                }}>{p.author.name} · {p.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

window.PostCard = PostCard;
window.Highlights = Highlights;
window.HorizontalPostRow = HorizontalPostRow;
