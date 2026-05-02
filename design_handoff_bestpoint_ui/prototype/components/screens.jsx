// Screens: Feed, Club (simple), Perfil (simple)

function FeedScreen({ onAction, onAvatarClick }) {
  return (
    <div style={{ paddingBottom: 170 }}>
      <UserHeader onAvatarClick={onAvatarClick}/>
      <Highlights />
      <HorizontalPostRow posts={window.POSTS.slice(0, 4)} onAction={onAction}/>

      <div style={{
        padding: '6px 18px 10px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 20,
          color: THEME.ink, letterSpacing: -0.4,
        }}>El feed</div>
        <div style={{
          padding: '3px 10px', borderRadius: 999,
          background: THEME.green, border: `1.5px solid ${THEME.ink}`,
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 10,
          color: THEME.ink,
        }}>3 nuevos</div>
      </div>

      <div style={{ padding: '0 18px' }}>
        {window.POSTS.map(p => (
          <PostCard key={p.id} post={p} onAction={onAction}/>
        ))}
      </div>
    </div>
  );
}

function ClubScreen() {
  return (
    <div style={{ padding: '14px 18px 170px' }}>
      <div style={{
        fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 28,
        color: THEME.ink, letterSpacing: -0.6, marginBottom: 4,
      }}>Tu club</div>
      <div style={{
        fontFamily: 'Inter, sans-serif', fontSize: 13, color: THEME.inkMid, marginBottom: 18,
      }}>14 miembros activos esta semana</div>

      {/* Reunión próxima */}
      <div style={{
        background: THEME.violet, color: '#fff',
        border: `2px solid ${THEME.ink}`, borderRadius: 22,
        boxShadow: `3px 3px 0 ${THEME.ink}`,
        padding: 16, marginBottom: 14, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -30, right: -30, opacity: 0.3,
        }}>
          <Icon.Meeting size={140} stroke="#fff"/>
        </div>
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: 1, opacity: 0.9, marginBottom: 4,
        }}>próxima reunión</div>
        <div style={{
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 20,
          marginBottom: 8, textWrap: 'balance', letterSpacing: -0.3,
        }}>Jueves 22, 19:00hs</div>
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: 13, opacity: 0.95, marginBottom: 12,
        }}>Taller abierto: escritura creativa</div>
        <div style={{ display: 'flex', gap: -8, alignItems: 'center' }}>
          {[140, 25, 210, 320, 50].map((h, i) => (
            <div key={i} style={{ marginLeft: i === 0 ? 0 : -8, zIndex: 5 - i }}>
              <Avatar name={`U${i}`} size={26} hue={h}/>
            </div>
          ))}
          <div style={{
            marginLeft: 8, fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 12, fontWeight: 700,
          }}>+9 van</div>
        </div>
      </div>

      {/* Agendas activas */}
      <div style={{
        fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 16,
        color: THEME.ink, marginBottom: 10, marginTop: 6,
      }}>Agendas activas</div>
      {[
        { t: 'Lectura de abril', n: 'Diego T.', hue: 25, progress: 60 },
        { t: 'Sprint de contenido', n: 'Sofía M.', hue: 140, progress: 30 },
        { t: 'Piloto onboarding', n: 'Lucas R.', hue: 210, progress: 85 },
      ].map((a, i) => (
        <div key={i} style={{
          background: '#FFFCF5', border: `2px solid ${THEME.ink}`,
          borderRadius: 18, padding: 12, marginBottom: 8,
          boxShadow: `2px 2px 0 ${THEME.ink}`,
          display: 'flex', gap: 10, alignItems: 'center',
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: `hsl(${a.hue} 75% 80%)`,
            border: `1.5px solid ${THEME.ink}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Icon.Agenda size={20}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 14,
              color: THEME.ink,
            }}>{a.t}</div>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: 11, color: THEME.inkSoft,
              marginBottom: 6,
            }}>por {a.n}</div>
            <div style={{
              height: 6, borderRadius: 99,
              background: THEME.bgAlt, border: `1px solid ${THEME.ink}`,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0, width: `${a.progress}%`,
                background: THEME.coral,
              }}/>
            </div>
          </div>
          <div style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 13,
            color: THEME.ink,
          }}>{a.progress}%</div>
        </div>
      ))}
    </div>
  );
}

function ProfileScreen() {
  const u = window.USER;
  return (
    <div style={{ padding: '14px 18px 170px' }}>
      <div style={{
        background: '#FFFCF5', border: `2px solid ${THEME.ink}`,
        borderRadius: 22, padding: 18, boxShadow: `3px 3px 0 ${THEME.ink}`,
        textAlign: 'center', marginBottom: 14, position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <Sticker color={THEME.yellow} rotate={6}>Lv.{u.level}</Sticker>
        </div>
        <div style={{ display: 'inline-block', marginBottom: 10 }}>
          <Avatar name={u.name} size={80} hue={u.hue}/>
        </div>
        <div style={{
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 22,
          color: THEME.ink, letterSpacing: -0.4,
        }}>{u.name}</div>
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: 13, color: THEME.inkMid, marginBottom: 14,
        }}>{u.levelName} · 4 meses en el club</div>

        <div style={{ display: 'flex', gap: 8 }}>
          <Stat label="Rendimiento" value={`${u.performance}%`} color={THEME.coral}/>
          <Stat label="Coins" value={u.coins.toLocaleString('es')} color={THEME.yellow}/>
          <Stat label="Racha" value={`${u.streak}d`} color={THEME.green}/>
        </div>
      </div>

      <div style={{
        fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 16,
        color: THEME.ink, marginBottom: 10,
      }}>Tus últimas notas</div>
      {['Cómo mejorar la agenda semanal', 'Lista lecturas abril', 'Ideas para el pódcast'].map((t, i) => (
        <div key={i} style={{
          background: '#FFFCF5', border: `2px solid ${THEME.ink}`,
          borderRadius: 14, padding: '10px 12px', marginBottom: 6,
          display: 'flex', alignItems: 'center', gap: 10,
          boxShadow: `2px 2px 0 ${THEME.ink}`,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: [THEME.yellow, THEME.violet, THEME.green][i],
            border: `1.5px solid ${THEME.ink}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon.Note size={14}/>
          </div>
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: 13, color: THEME.ink, flex: 1,
          }}>{t}</div>
          <Icon.Arrow size={14} stroke={THEME.inkSoft}/>
        </div>
      ))}
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div style={{
      flex: 1, padding: '10px 6px', borderRadius: 14,
      background: color, border: `1.5px solid ${THEME.ink}`,
    }}>
      <div style={{
        fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 18,
        color: THEME.ink, letterSpacing: -0.3,
      }}>{value}</div>
      <div style={{
        fontFamily: 'Inter, sans-serif', fontSize: 10, color: THEME.ink, opacity: 0.8,
        fontWeight: 600,
      }}>{label}</div>
    </div>
  );
}

window.FeedScreen = FeedScreen;
window.ClubScreen = ClubScreen;
window.ProfileScreen = ProfileScreen;
