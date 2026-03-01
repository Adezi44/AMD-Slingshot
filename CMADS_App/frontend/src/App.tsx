import { Outlet, useLocation, useNavigate } from 'react-router-dom';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginPage = location.pathname === '/';
  const isArchitecturePage = location.pathname.startsWith('/architecture');

  if (isLoginPage) {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen w-full bg-bg-primary text-text-primary overflow-hidden relative font-mono">
      <div className="noise-overlay"></div>

      {/* Absolute Pinned Navigation */}
      <nav className="absolute top-0 left-0 pt-8 px-8 pb-2 md:pt-12 md:px-12 md:pb-4 z-50 flex flex-col justify-between h-[100vh] w-full pointer-events-none">
        {/* Top Left: Massive Header */}
        <div className="pointer-events-auto glass-effect w-max px-6 pt-4 pb-2">
          <h1 className="font-koulen text-[80px] md:text-[120px] leading-[0.8] tracking-tight">CMADS</h1>
        </div>

        {/* Bottom Left: Links */}
        <div className="flex flex-col gap-3 pointer-events-auto glass-effect py-6 px-8 w-max">
          {[
            { label: "DASHBOARD", path: "/dashboard" },
            { label: "SYSTEM PIPELINE", path: "/architecture" },
            { label: "DISCONNECT", path: "/" }
          ].map((item) => {
            const isActive = location.pathname.startsWith(item.path) && item.path !== '/';
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`text-left uppercase font-mono text-[14px] transition-none hover:bg-text-primary hover:text-text-secondary ${isActive ? 'bg-text-primary text-text-secondary w-fit px-2 py-1' : 'px-2 py-1'}`}
                style={{ width: 'max-content' }}
              >
                [ {item.label} ]
              </button>
            )
          })}
        </div>
      </nav>

      {/* Main Content Pane */}
      <main className={`flex-1 h-full overflow-y-auto relative z-10 ${isArchitecturePage ? '' : 'px-[15%] pt-[10%] pb-[10%]'}`}>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
