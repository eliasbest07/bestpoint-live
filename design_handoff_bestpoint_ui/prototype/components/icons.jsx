// Custom hand-drawn-ish icons for Bestpoint
// Rounded, a bit imperfect, community vibe

const Icon = {
  Note: ({ size = 24, stroke = 'currentColor', fill = 'none' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4.5c0-.8.7-1.5 1.5-1.5h9l4 4v13c0 .8-.7 1.5-1.5 1.5h-11.5c-.8 0-1.5-.7-1.5-1.5v-15.5z"/>
      <path d="M15 3v4h4"/>
      <path d="M8 12h8M8 16h5"/>
    </svg>
  ),
  Task: ({ size = 24, stroke = 'currentColor', fill = 'none' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="4" width="17" height="16.5" rx="3"/>
      <path d="M8 11.5l2.5 2.5 5-5"/>
    </svg>
  ),
  Idea: ({ size = 24, stroke = 'currentColor', fill = 'none' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6M10 21h4"/>
      <path d="M12 3a6 6 0 00-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0012 3z"/>
    </svg>
  ),
  Agenda: ({ size = 24, stroke = 'currentColor', fill = 'none' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/>
      <path d="M3.5 10h17M8 3v4M16 3v4"/>
      <circle cx="8.5" cy="14" r=".8" fill={stroke}/>
      <circle cx="12" cy="14" r=".8" fill={stroke}/>
      <circle cx="15.5" cy="14" r=".8" fill={stroke}/>
    </svg>
  ),
  Meeting: ({ size = 24, stroke = 'currentColor', fill = 'none' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="3"/>
      <circle cx="16" cy="10.5" r="2.2"/>
      <path d="M3 19c.5-3 3-5 6-5s5.5 2 6 5"/>
      <path d="M14 16c.5-2 2-3 4-3s3 .8 3.5 2.5"/>
    </svg>
  ),
  Poll: ({ size = 24, stroke = 'currentColor', fill = 'none' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 20V10M12 20V4M19 20v-7"/>
    </svg>
  ),
  Post: ({ size = 24, stroke = 'currentColor', fill = 'none' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="3"/>
      <path d="M3 9h18"/>
      <circle cx="7" cy="6.5" r=".6" fill={stroke}/>
      <circle cx="9.5" cy="6.5" r=".6" fill={stroke}/>
    </svg>
  ),
  Comment: ({ size = 24, stroke = 'currentColor', fill = 'none' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8c-1 0-2-.2-3-.5L4 21l1.5-3.5C4.5 16 4 14 4 12z"/>
    </svg>
  ),
  Search: ({ size = 24, stroke = 'currentColor', fill = 'none' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7"/>
      <path d="M20 20l-3.5-3.5"/>
    </svg>
  ),
  Edit: ({ size = 24, stroke = 'currentColor', fill = 'none' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3l4 4-12 12H5v-4L17 3z"/>
    </svg>
  ),
  Delete: ({ size = 24, stroke = 'currentColor', fill = 'none' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h16M10 4h4l1 3H9l1-3z"/>
      <path d="M6 7l1 13h10l1-13M10 11v6M14 11v6"/>
    </svg>
  ),
  Progress: ({ size = 24, stroke = 'currentColor', fill = 'none' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19V5M4 19h16"/>
      <path d="M7 15l4-4 3 3 5-6"/>
    </svg>
  ),
  Plus: ({ size = 24, stroke = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round">
      <path d="M12 5v14M5 12h14"/>
    </svg>
  ),
  Home: ({ size = 24, stroke = 'currentColor', fill = 'none' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-9z"/>
    </svg>
  ),
  Club: ({ size = 24, stroke = 'currentColor', fill = 'none' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l2.5 5 5.5.8-4 4 1 5.5-5-2.7-5 2.7 1-5.5-4-4 5.5-.8z"/>
    </svg>
  ),
  Profile: ({ size = 24, stroke = 'currentColor', fill = 'none' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 21c0-4 4-7 8-7s8 3 8 7"/>
    </svg>
  ),
  Play: ({ size = 24, fill = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <path d="M8 5.5v13l11-6.5z"/>
    </svg>
  ),
  Heart: ({ size = 24, stroke = 'currentColor', fill = 'none' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20s-7-4.5-7-10a4.5 4.5 0 018-3 4.5 4.5 0 018 3c0 5.5-9 10-9 10z"/>
    </svg>
  ),
  Coin: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="#FFC83A"/>
      <circle cx="12" cy="12" r="7.5" fill="#FFDD7A" stroke="#D89A00" strokeWidth="1"/>
      <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="900" fill="#7A4E00" fontFamily="system-ui">B</text>
    </svg>
  ),
  Bolt: ({ size = 24, fill = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/>
    </svg>
  ),
  Arrow: ({ size = 16, stroke = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 5l7 7-7 7"/>
    </svg>
  ),
  Flame: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#FF5B3A">
      <path d="M12 2s4 5 4 9a4 4 0 01-8 0c0-1 .5-2 1-2.5C9 11 12 9 12 2z"/>
      <path d="M12 22a6 6 0 006-6c0-2-1-3.5-2-5-.5 3-2 4-3 4-2 0-2-2-1-4-2 1-4 3-4 5a4 4 0 004 6z" fill="#FFC83A"/>
    </svg>
  ),
};

window.Icon = Icon;
