import { Outlet, useLocation, useNavigate } from 'react-router-dom';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginPage = location.pathname === '/';

  if (isLoginPage) {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen w-full bg-bg-primary text-text-primary overflow-hidden relative font-mono">
      <div className="noise-overlay"></div>

      {/* Absolute Pinned Navigation */}
      <nav className="absolute top-0 left-0 p-12 z-50 flex flex-col justify-between h-full w-full pointer-events-none">
        {/* Top Left: Massive Header */}
        <h1 className="font-koulen text-[120px] leading-[0.8] tracking-tight pointer-events-auto mix-blend-difference">CMADS</h1>

        {/* Bottom Left: Links */}
        <div className="flex flex-col gap-2 pointer-events-auto">
          {[
            { label: "DASHBOARD", path: "/dashboard" },
            { label: "ARCHITECTURE", path: "/architecture" },
            { label: "DISCONNECT", path: "/" }
          ].map((item) => {
            const isActive = location.pathname.startsWith(item.path) && item.path !== '/';
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`text-left uppercase font-mono text-[14px] transition-none hover:bg-text-primary hover:text-text-secondary ${isActive ? 'bg-text-primary text-text-secondary w-fit px-1' : ''}`}
                style={{ width: 'max-content' }}
              >
                [ {item.label} ]
              </button>
            )
          })}
        </div>
      </nav>

      {/* Main Content Pane with extreme padding */}
      <main className="flex-1 h-full overflow-y-auto relative z-10 px-[15%] pt-[10%] pb-[10%]">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
