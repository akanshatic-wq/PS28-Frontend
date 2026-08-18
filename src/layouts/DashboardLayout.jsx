import { useState } from "react";

const navigation = [
  "Overview",
  "Incidents",
  "Events",
  "Threat Intelligence",
  "Assets",
  "Attack Graph",
  "Analytics",
  "Recommendations",
  "AI Assistant",
];

export default function DashboardLayout({ children }) {
  const [active, setActive] = useState("Overview");

  return (
    <div className="min-h-screen bg-[#060b14] text-slate-100">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-slate-800/80 bg-[#080e19] lg:block">
        <div className="flex h-16 items-center border-b border-slate-800/80 px-6">
          <div>
            <div className="text-lg font-bold tracking-wide">
             SOC <span className="text-cyan-400">COMMAND</span>              </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
              Security Operations Center
            </div>
          </div>
        </div>

        <nav className="space-y-1 p-4">
          {navigation.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
                active === item
                  ? "bg-cyan-400/10 text-cyan-300"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-5 left-4 right-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Systems Operational
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            Monitoring active
          </p>
        </div>
      </aside>

      <main className="lg:pl-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-800/80 bg-[#060b14]/90 px-6 backdrop-blur">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
              Security Operations Center
            </p>
            <h1 className="text-sm font-semibold">{active}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              LIVE MONITORING
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/10 text-xs font-semibold text-cyan-300">
              AK
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}