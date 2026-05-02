// Custom phone frame — cleaner, playful, no iOS status chrome
// Uses the passed THEME color for background tint

function Phone({ children, width = 380, height = 800, bg, noScroll = false }) {
  const bgColor = bg || window.THEME.bg;
  return (
    <div style={{
      width, height, borderRadius: 44, position: 'relative',
      background: '#0A0908', padding: 8,
      boxShadow: '0 30px 60px -10px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.12)',
      flexShrink: 0,
    }}>
      <div style={{
        width: '100%', height: '100%', borderRadius: 36, overflow: 'hidden',
        background: bgColor, position: 'relative',
      }}>
        {/* tiny island */}
        <div style={{
          position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
          width: 92, height: 26, borderRadius: 20, background: '#0A0908', zIndex: 100,
        }} />
        {/* status text (left/right), placed on the sides of island */}
        <div style={{
          position: 'absolute', top: 14, left: 24, zIndex: 101,
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 14,
          color: window.THEME.ink,
        }}>9:41</div>
        <div style={{
          position: 'absolute', top: 14, right: 24, zIndex: 101,
          display: 'flex', gap: 5, alignItems: 'center',
        }}>
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <rect x="0" y="6" width="2.5" height="4" rx="0.4" fill={window.THEME.ink}/>
            <rect x="4" y="4" width="2.5" height="6" rx="0.4" fill={window.THEME.ink}/>
            <rect x="8" y="2" width="2.5" height="8" rx="0.4" fill={window.THEME.ink}/>
            <rect x="12" y="0" width="2.5" height="10" rx="0.4" fill={window.THEME.ink}/>
          </svg>
          <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
            <rect x="0.5" y="0.5" width="18" height="9" rx="2" stroke={window.THEME.ink} fill="none"/>
            <rect x="2" y="2" width="15" height="6" rx="1" fill={window.THEME.ink}/>
          </svg>
        </div>
        {/* content area, below status */}
        <div style={{
          position: 'absolute', inset: 0, paddingTop: 46,
          overflow: noScroll ? 'hidden' : 'auto',
          display: 'flex', flexDirection: 'column',
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}

window.Phone = Phone;
