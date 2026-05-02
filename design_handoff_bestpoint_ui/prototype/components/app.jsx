// App principal — integra onboarding + tabs + bottom bar + search
// El "flujo inicial" completo.

function BestpointApp({ startOnboarding = true }) {
  const [showOnboarding, setShowOnboarding] = React.useState(startOnboarding);
  const [tab, setTab] = React.useState('feed');
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [toast, setToast] = React.useState('');
  const [perfOpen, setPerfOpen] = React.useState(false);
  const [mru, bumpMRU, resetMRU] = useMRU();

  const handleTool = (toolId) => {
    const tool = window.TOOLS.find(t => t.id === toolId);
    if (!tool) return;
    bumpMRU(toolId);
    setSearchOpen(false);
    setToast(`${tool.label} abierto`);
  };

  if (showOnboarding) {
    return <Onboarding onFinish={() => setShowOnboarding(false)} />;
  }

  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%',
      background: THEME.bg, overflow: 'hidden',
    }}>
      {/* Scrollable content */}
      <div style={{
        position: 'absolute', inset: 0, overflowY: 'auto',
      }}>
        {tab === 'feed' && <FeedScreen onAction={handleTool} onAvatarClick={() => setPerfOpen(o => !o)}/>}
        {tab === 'club' && <ClubScreen/>}
        {tab === 'profile' && <ProfileScreen/>}
      </div>

      {tab === 'feed' && <PerformanceFloat open={perfOpen} setOpen={setPerfOpen}/>}

      <ToolToast message={toast} onDone={() => setToast('')}/>

      <BottomBar
        tab={tab}
        setTab={setTab}
        mru={mru}
        onTool={handleTool}
        onPlus={() => setSearchOpen(true)}
      />

      <FloatingSearch
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={handleTool}
      />

      {/* Debug reset (tiny, bottom-right while developing) */}
      <button
        onClick={() => { resetMRU(); setShowOnboarding(true); }}
        title="Reset onboarding + MRU"
        style={{
          position: 'absolute', top: 6, right: 6, zIndex: 200,
          width: 20, height: 20, borderRadius: '50%',
          background: 'transparent', border: 'none', cursor: 'pointer',
          opacity: 0.2, fontSize: 10,
        }}>↺</button>
    </div>
  );
}

window.BestpointApp = BestpointApp;
