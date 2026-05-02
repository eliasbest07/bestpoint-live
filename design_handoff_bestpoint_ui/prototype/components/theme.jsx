// Bestpoint theme — playful community
const THEME = {
  bg: '#FFF6E9',        // warm cream
  bgAlt: '#FFEFD8',     // slightly darker
  ink: '#1A1918',
  inkMid: '#4A4743',
  inkSoft: '#8A857D',
  stroke: '#1A1918',
  card: '#FFFFFF',
  coral: '#FF5B3A',
  green: '#2FD576',
  violet: '#6B5BFF',
  yellow: '#FFC83A',
  sky: '#9FD9F7',
  pink: '#FFB5C2',
};

window.THEME = THEME;

// Sticker / placeholder imagery
function StripePlaceholder({ hue = 30, label = 'imagen', rotate = 0, width = '100%', height = 180, radius = 20 }) {
  const bg = `hsl(${hue} 80% 85%)`;
  const stripe = `hsl(${hue} 70% 78%)`;
  return (
    <div style={{
      width, height, borderRadius: radius,
      background: `repeating-linear-gradient(45deg, ${bg} 0 12px, ${stripe} 12px 24px)`,
      border: `2px solid ${THEME.ink}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transform: `rotate(${rotate}deg)`,
      fontFamily: 'ui-monospace, monospace', fontSize: 11,
      color: THEME.ink, position: 'relative', overflow: 'hidden',
    }}>
      <span style={{ background: THEME.bg, padding: '4px 8px', borderRadius: 6, border: `1.5px solid ${THEME.ink}` }}>{label}</span>
    </div>
  );
}

// Avatar circle with initial
function Avatar({ name = 'MC', size = 40, hue = 20, border = true }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `hsl(${hue} 75% 75%)`,
      border: border ? `2px solid ${THEME.ink}` : 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
      fontSize: size * 0.38, color: THEME.ink, flexShrink: 0,
    }}>{name.slice(0, 2).toUpperCase()}</div>
  );
}

// Sticker - small rotated chip
function Sticker({ children, color = THEME.yellow, rotate = -3, style = {} }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '6px 12px', borderRadius: 999,
      background: color, border: `1.5px solid ${THEME.ink}`,
      transform: `rotate(${rotate}deg)`,
      fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
      fontSize: 12, color: THEME.ink,
      boxShadow: `2px 2px 0 ${THEME.ink}`,
      ...style,
    }}>{children}</div>
  );
}

// Blob SVG background
function Blob({ color = THEME.coral, size = 200, rotate = 0, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ transform: `rotate(${rotate}deg)`, ...style }}>
      <path fill={color} d="M42.8,-58.1C54.5,-47.4,62.2,-33.3,66.4,-18.1C70.6,-2.9,71.3,13.4,64.9,26.3C58.5,39.2,45,48.7,30.6,56.3C16.2,63.9,0.9,69.6,-14.8,69.5C-30.5,69.4,-46.6,63.4,-56.9,51.6C-67.3,39.8,-71.9,22.1,-72.2,4.4C-72.4,-13.3,-68.3,-31,-57.8,-42.4C-47.3,-53.8,-30.4,-58.9,-14.4,-61.9C1.5,-64.8,17.2,-65.7,32,-68.3" transform="translate(100 100)"/>
    </svg>
  );
}

window.StripePlaceholder = StripePlaceholder;
window.Avatar = Avatar;
window.Sticker = Sticker;
window.Blob = Blob;
