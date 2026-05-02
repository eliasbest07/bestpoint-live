// Variantes del onboarding, feed y buscador — se montan lazy al cambiar de tab

// ────────────────────────────────────────────────
// ONBOARDING — 3 variantes
// ────────────────────────────────────────────────

// V1: Polaroids apiladas (la principal, ya en Onboarding)
// V2: Ticket / boleto vertical que se desliza
function OnboardingV2() {
  const [idx, setIdx] = React.useState(0);
  const cards = ONBOARDING_CARDS;
  const next = () => setIdx(i => (i + 1) % cards.length);
  const card = cards[idx];
  return (
    <div style={{
      width: '100%', height: '100%', background: THEME.bg,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: 24, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 16,
        color: THEME.ink, marginBottom: 18, alignSelf: 'flex-start',
      }}>
        <span style={{ display: 'inline-block', width: 9, height: 9, borderRadius: '50%', background: THEME.coral, marginRight: 6, border: `1.5px solid ${THEME.ink}` }}/>
        bestpoint
      </div>

      <div
        onClick={next}
        style={{
          flex: 1, width: '100%', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
        <div style={{
          width: 240, background: '#FFFCF5',
          border: `2px solid ${THEME.ink}`, borderRadius: 20,
          boxShadow: `4px 4px 0 ${THEME.ink}`,
          overflow: 'hidden', position: 'relative',
        }}>
          {/* perforated top */}
          <div style={{
            height: 8, background: `radial-gradient(circle at 4px 0, ${THEME.bg} 3px, ${THEME.ink} 3.5px, transparent 4px) 0 0 / 10px 8px repeat-x`,
          }}/>
          <div style={{ padding: '12px 14px', borderBottom: `2px dashed ${THEME.ink}` }}>
            <div style={{
              fontFamily: 'ui-monospace', fontSize: 10, color: THEME.inkSoft,
              textTransform: 'uppercase', letterSpacing: 1,
            }}>TICKET · {idx + 1}/{cards.length}</div>
            <div style={{
              fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 20,
              color: THEME.ink, textWrap: 'balance', letterSpacing: -0.3,
            }}>{card.title}</div>
          </div>
          <div style={{
            height: 120, background: `hsl(${card.hue} 75% 85%)`,
            borderBottom: `2px dashed ${THEME.ink}`, position: 'relative',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: `repeating-linear-gradient(-45deg, transparent 0 16px, hsl(${card.hue} 70% 76%) 16px 18px)`,
            }}/>
            <Sticker color={card.stickerColor} rotate={-8} style={{ position: 'absolute', top: 12, right: 12 }}>{card.sticker}</Sticker>
          </div>
          <div style={{ padding: 14 }}>
            <div style={{ fontFamily: 'Inter', fontSize: 12, color: THEME.inkMid, lineHeight: 1.4 }}>
              {card.text}
            </div>
          </div>
          <div style={{ height: 8, background: `radial-gradient(circle at 4px 8px, ${THEME.bg} 3px, ${THEME.ink} 3.5px, transparent 4px) 0 0 / 10px 8px repeat-x` }}/>
        </div>
      </div>

      <div style={{
        fontFamily: 'Inter', fontSize: 11, color: THEME.inkSoft,
        marginTop: 14,
      }}>tap para siguiente</div>
    </div>
  );
}

// V3: Stickers dispersos en mural — tap para rotar a uno
function OnboardingV3() {
  const [idx, setIdx] = React.useState(0);
  const cards = ONBOARDING_CARDS;
  return (
    <div style={{
      width: '100%', height: '100%', background: THEME.bg,
      position: 'relative', overflow: 'hidden', padding: 20,
    }}>
      <div style={{
        fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 16,
        color: THEME.ink, marginBottom: 10,
      }}>
        <span style={{ display: 'inline-block', width: 9, height: 9, borderRadius: '50%', background: THEME.coral, marginRight: 6, border: `1.5px solid ${THEME.ink}` }}/>
        bestpoint · mural
      </div>

      {/* Scattered stickers */}
      {cards.map((c, i) => {
        const active = i === idx;
        const positions = [
          { top: 80, left: 20, rot: -8 },
          { top: 150, right: 20, rot: 6 },
          { top: 260, left: 40, rot: 10 },
          { top: 340, right: 30, rot: -5 },
        ][i];
        return (
          <div
            key={c.id}
            onClick={() => setIdx(i)}
            style={{
              position: 'absolute', width: 180, cursor: 'pointer',
              padding: 12, borderRadius: 16,
              background: active ? '#FFFCF5' : `hsl(${c.hue} 75% 88%)`,
              border: `2px solid ${THEME.ink}`,
              boxShadow: active ? `5px 5px 0 ${THEME.coral}` : `3px 3px 0 ${THEME.ink}`,
              transform: `rotate(${active ? 0 : positions.rot}deg) scale(${active ? 1.05 : 1})`,
              transition: 'all 0.3s',
              zIndex: active ? 10 : 5,
              ...positions,
            }}>
            <Sticker color={c.stickerColor} rotate={-4} style={{ marginBottom: 6 }}>{c.sticker}</Sticker>
            <div style={{
              fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 14,
              color: THEME.ink, lineHeight: 1.1, textWrap: 'balance',
            }}>{c.title}</div>
            {active && (
              <div style={{
                fontFamily: 'Inter', fontSize: 11, color: THEME.inkMid,
                marginTop: 6, lineHeight: 1.4,
              }}>{c.text}</div>
            )}
          </div>
        );
      })}

      <div style={{
        position: 'absolute', bottom: 20, left: 20, right: 20,
        padding: '10px 16px', borderRadius: 14,
        background: THEME.ink, color: THEME.bg,
        fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 13,
        textAlign: 'center',
      }}>Tocá los stickers · {idx + 1} de {cards.length}</div>
    </div>
  );
}

// ────────────────────────────────────────────────
// FEED — 3 variantes
// ────────────────────────────────────────────────

// V1: el principal (ya existe)
// V2: Timeline vertical con línea
function FeedVariantTimeline() {
  const [mru, bump] = useMRU();
  return (
    <div style={{ width: '100%', height: '100%', background: THEME.bg, overflow: 'auto', paddingBottom: 170, position: 'relative' }}>
      <UserHeader />
      <div style={{ padding: '10px 18px' }}>
        <div style={{
          fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 20,
          color: THEME.ink, marginBottom: 14,
        }}>Timeline</div>
        <div style={{ position: 'relative', paddingLeft: 28 }}>
          <div style={{
            position: 'absolute', left: 12, top: 8, bottom: 20,
            width: 2, background: THEME.ink,
          }}/>
          {window.POSTS.map((p, i) => (
            <div key={p.id} style={{ position: 'relative', marginBottom: 14 }}>
              <div style={{
                position: 'absolute', left: -22, top: 12,
                width: 18, height: 18, borderRadius: '50%',
                background: p.tagColor, border: `2px solid ${THEME.ink}`,
              }}/>
              <div style={{
                background: '#FFFCF5', border: `2px solid ${THEME.ink}`,
                borderRadius: 18, padding: 12,
                boxShadow: `2px 2px 0 ${THEME.ink}`,
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6,
                }}>
                  <Avatar name={p.author.name} size={22} hue={p.author.hue}/>
                  <div style={{
                    fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 12,
                  }}>{p.author.name}</div>
                  <div style={{ flex: 1 }}/>
                  <div style={{
                    fontFamily: 'ui-monospace', fontSize: 10, color: THEME.inkSoft,
                  }}>{p.time}</div>
                </div>
                <div style={{
                  fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 14,
                  lineHeight: 1.2, marginBottom: 4,
                }}>{p.title}</div>
                <div style={{
                  fontFamily: 'Inter', fontSize: 12, color: THEME.inkMid, lineHeight: 1.4,
                }}>{p.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomBar tab="feed" setTab={() => {}} mru={mru} onTool={bump} onPlus={() => {}}/>
    </div>
  );
}

// V3: Mural / collage mixto (grid asimétrico)
function FeedVariantMural() {
  const [mru, bump] = useMRU();
  return (
    <div style={{ width: '100%', height: '100%', background: THEME.bg, overflow: 'auto', paddingBottom: 170, position: 'relative' }}>
      <UserHeader />
      <div style={{ padding: '6px 18px' }}>
        <div style={{
          fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 20,
          color: THEME.ink, marginBottom: 10,
        }}>Mural</div>
        <div style={{
          columnCount: 2, columnGap: 8,
        }}>
          {window.POSTS.map((p, i) => (
            <div key={p.id} style={{
              breakInside: 'avoid', marginBottom: 8,
              background: '#FFFCF5', border: `2px solid ${THEME.ink}`,
              borderRadius: 16, overflow: 'hidden',
              boxShadow: `2px 2px 0 ${THEME.ink}`,
              transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 0.8}deg)`,
            }}>
              <div style={{
                height: 80 + (i % 3) * 20,
                background: `hsl(${p.hue} 75% 80%)`,
                position: 'relative',
                borderBottom: `1.5px solid ${THEME.ink}`,
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `repeating-linear-gradient(45deg, transparent 0 10px, hsl(${p.hue} 70% 74%) 10px 12px)`,
                }}/>
              </div>
              <div style={{ padding: 10 }}>
                <div style={{
                  fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 12,
                  lineHeight: 1.2, marginBottom: 4,
                }}>{p.title}</div>
                <div style={{
                  fontFamily: 'Inter', fontSize: 10, color: THEME.inkSoft,
                }}>{p.author.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomBar tab="feed" setTab={() => {}} mru={mru} onTool={bump} onPlus={() => {}}/>
    </div>
  );
}

// V1 wrapper (principal)
function FeedVariantPrincipal() {
  return <BestpointApp startOnboarding={false}/>;
}

// ────────────────────────────────────────────────
// BUSCADOR — 3 variantes
// ────────────────────────────────────────────────

// V1: el principal — grid 2 col (ya existe)
// V2: Lista densa tipo command palette
function SearchVariantCommand() {
  const [q, setQ] = React.useState('');
  const filtered = window.TOOLS.filter(t => t.label.toLowerCase().includes(q.toLowerCase()));
  return (
    <div style={{ width: '100%', height: '100%', background: 'rgba(26,25,24,0.7)', backdropFilter: 'blur(4px)', padding: '70px 14px 14px' }}>
      <div style={{
        background: '#FFFCF5', borderRadius: 22, border: `2px solid ${THEME.ink}`,
        boxShadow: `4px 4px 0 ${THEME.coral}`, padding: 12,
        height: 'calc(100% - 30px)', display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 12px', borderBottom: `1.5px solid ${THEME.ink}`,
          marginBottom: 8,
        }}>
          <span style={{ fontFamily: 'ui-monospace', color: THEME.coral, fontWeight: 700 }}>›</span>
          <input
            autoFocus value={q} onChange={e => setQ(e.target.value)}
            placeholder="escribe un comando..."
            style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontFamily: 'ui-monospace', fontSize: 14, color: THEME.ink }}
          />
          <span style={{
            fontFamily: 'ui-monospace', fontSize: 10, color: THEME.inkSoft,
            border: `1px solid ${THEME.ink}`, padding: '1px 6px', borderRadius: 4,
          }}>esc</span>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filtered.map((tool, i) => {
            const IconComp = Icon[tool.icon];
            return (
              <div key={tool.id} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 10,
                background: i === 0 ? THEME.bgAlt : 'transparent',
                marginBottom: 2, cursor: 'pointer',
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: tool.color, border: `1.5px solid ${THEME.ink}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <IconComp size={14}/>
                </div>
                <div style={{
                  flex: 1, fontFamily: 'Inter', fontSize: 13, fontWeight: 600,
                }}>{tool.label}</div>
                <span style={{
                  fontFamily: 'ui-monospace', fontSize: 10, color: THEME.inkSoft,
                }}>{i === 0 ? '↵ ejecutar' : ''}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// V3: Buscador tipo "rueda" radial / chips horizontales
function SearchVariantRadial() {
  const [q, setQ] = React.useState('');
  const filtered = window.TOOLS.filter(t => t.label.toLowerCase().includes(q.toLowerCase()));
  return (
    <div style={{ width: '100%', height: '100%', background: 'rgba(26,25,24,0.65)', backdropFilter: 'blur(4px)',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 14 }}>
      <div style={{
        background: '#FFFCF5', borderRadius: 26, border: `2px solid ${THEME.ink}`,
        boxShadow: `4px 4px 0 ${THEME.coral}`, padding: 14,
      }}>
        <div style={{
          fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 14,
          color: THEME.ink, marginBottom: 10,
        }}>¿Qué querés hacer?</div>
        <input
          autoFocus value={q} onChange={e => setQ(e.target.value)}
          placeholder="escribe..."
          style={{ width: '100%', padding: '10px 14px', borderRadius: 14,
            background: THEME.bgAlt, border: `1.5px solid ${THEME.ink}`,
            fontFamily: 'Space Grotesk', fontSize: 14, fontWeight: 600,
            outline: 'none', marginBottom: 12, boxSizing: 'border-box',
          }}
        />
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 6, maxHeight: 280, overflowY: 'auto',
        }}>
          {filtered.map(tool => {
            const IconComp = Icon[tool.icon];
            return (
              <div key={tool.id} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 10px 6px 6px', borderRadius: 999,
                background: tool.color, border: `1.5px solid ${THEME.ink}`,
                boxShadow: `2px 2px 0 ${THEME.ink}`, cursor: 'pointer',
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: '#FFFCF5', border: `1px solid ${THEME.ink}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <IconComp size={12}/>
                </div>
                <div style={{
                  fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 11,
                  color: THEME.ink,
                }}>{tool.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// V1 wrapper (principal) — muestra el buscador abierto sobre el feed
function SearchVariantPrincipal() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <BestpointApp startOnboarding={false}/>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* hint: se puede abrir tocando el + */}
      </div>
    </div>
  );
}

// Mount helpers
window.mountVariants = function(kind) {
  const { createRoot } = ReactDOM;
  if (kind === 'onb') {
    const host = document.getElementById('onb-variants');
    host.innerHTML = `
      <div class="variant-card"><h4>V1 · Polaroids apiladas</h4><p>Tarjetas con sombra dura, sello girado y una ilustración dentro. Se despegan hacia el aire al tocar.</p><div class="vstage" id="onb-v1"></div></div>
      <div class="variant-card"><h4>V2 · Boleto perforado</h4><p>Un ticket impreso con bordes dentados. Cada tap avanza al siguiente boleto.</p><div class="vstage" id="onb-v2"></div></div>
      <div class="variant-card"><h4>V3 · Mural de stickers</h4><p>Stickers desordenados. Al tocar uno, se agranda y revela el mensaje completo.</p><div class="vstage" id="onb-v3"></div></div>
    `;
    createRoot(document.getElementById('onb-v1')).render(<Phone width={320} height={640}><Onboarding onFinish={() => {}}/></Phone>);
    createRoot(document.getElementById('onb-v2')).render(<Phone width={320} height={640}><OnboardingV2/></Phone>);
    createRoot(document.getElementById('onb-v3')).render(<Phone width={320} height={640}><OnboardingV3/></Phone>);
  }
  if (kind === 'feed') {
    const host = document.getElementById('feed-variants');
    host.innerHTML = `
      <div class="variant-card"><h4>V1 · Principal</h4><p>Header con ring de rendimiento, destacados, scroll horizontal + feed vertical de posts.</p><div class="vstage" id="feed-v1"></div></div>
      <div class="variant-card"><h4>V2 · Timeline</h4><p>Línea temporal con nodos coloreados por tipo. Ideal cuando el orden cronológico manda.</p><div class="vstage" id="feed-v2"></div></div>
      <div class="variant-card"><h4>V3 · Mural</h4><p>Grid asimétrico estilo Pinterest con leve rotación. Más visual, menos estructurado.</p><div class="vstage" id="feed-v3"></div></div>
    `;
    createRoot(document.getElementById('feed-v1')).render(<Phone width={320} height={640}><FeedVariantPrincipal/></Phone>);
    createRoot(document.getElementById('feed-v2')).render(<Phone width={320} height={640}><FeedVariantTimeline/></Phone>);
    createRoot(document.getElementById('feed-v3')).render(<Phone width={320} height={640}><FeedVariantMural/></Phone>);
  }
  if (kind === 'search') {
    const host = document.getElementById('search-variants');
    host.innerHTML = `
      <div class="variant-card"><h4>V1 · Grid 2 col</h4><p>El principal. Botones grandes con icono coloreado + título. Buena accesibilidad en móvil.</p><div class="vstage" id="search-v1"></div></div>
      <div class="variant-card"><h4>V2 · Command palette</h4><p>Lista densa estilo terminal. Para usuarios power — rápido con teclado.</p><div class="vstage" id="search-v2"></div></div>
      <div class="variant-card"><h4>V3 · Chips flotantes</h4><p>Sheet abajo con chips pastillados. Sensación más lúdica, más "club".</p><div class="vstage" id="search-v3"></div></div>
    `;
    createRoot(document.getElementById('search-v1')).render(
      <Phone width={320} height={640}>
        <SearchVariantPrincipal/>
      </Phone>
    );
    createRoot(document.getElementById('search-v2')).render(<Phone width={320} height={640}><SearchVariantCommand/></Phone>);
    createRoot(document.getElementById('search-v3')).render(<Phone width={320} height={640}><SearchVariantRadial/></Phone>);
  }
};

Object.assign(window, {
  OnboardingV2, OnboardingV3,
  FeedVariantTimeline, FeedVariantMural, FeedVariantPrincipal,
  SearchVariantCommand, SearchVariantRadial, SearchVariantPrincipal,
});
