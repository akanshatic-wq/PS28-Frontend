import { useEffect, useMemo, useState, useRef } from "react";

/* =========================================================
   MOCK DATA (stand-ins for ../services/api)
   ========================================================= */

function seedRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}
const rnd = seedRandom(42);

const SEVERITIES = ["CRITICAL", "HIGH", "MEDIUM", "LOW"];
const STATUSES = ["INVESTIGATING", "OPEN", "RESOLVED"];
const TITLES = [
  "Unusual outbound traffic to unregistered host",
  "Privilege escalation attempt on domain controller",
  "Malware signature detected in mail gateway",
  "Brute-force login pattern from external IP",
  "Anomalous data exfiltration volume",
  "Unauthorized API key usage detected",
  "Lateral movement across segmented VLAN",
  "Suspicious process injection on endpoint",
  "DNS tunneling behavior flagged",
  "Credential stuffing attempt on auth service",
  "Ransomware indicator matched on file share",
  "Unpatched CVE actively probed",
];

function genIncidents() {
  return Array.from({ length: 24 }).map((_, i) => {
    const severity = SEVERITIES[Math.floor(rnd() * SEVERITIES.length)];
    const base = { CRITICAL: 85, HIGH: 68, MEDIUM: 45, LOW: 15 }[severity];
    return {
      id: `INC-${String(4200 + i)}`,
      title: TITLES[Math.floor(rnd() * TITLES.length)],
      severity,
      riskScore: Math.min(99, Math.round(base + rnd() * 14)),
      status: STATUSES[Math.floor(rnd() * STATUSES.length)],
    };
  });
}

function getDashboardStats() {
  return Promise.resolve({
    totalIncidents: 24,
    criticalIncidents: 6,
    activeThreats: 11,
    assetsAtRisk: 37,
    openInvestigations: 9,
    overallRiskScore: 74,
  });
}
function getIncidents() {
  return Promise.resolve(genIncidents());
}
function getAnalytics() {
  return Promise.resolve({
    incidentTrend: [
      { day: "Aug 12", incidents: 5 },
      { day: "Aug 13", incidents: 8 },
      { day: "Aug 14", incidents: 4 },
      { day: "Aug 15", incidents: 11 },
      { day: "Aug 16", incidents: 7 },
      { day: "Aug 17", incidents: 13 },
      { day: "Aug 18", incidents: 9 },
    ],
    riskTrend: [
      { day: "Aug 12", score: 52 },
      { day: "Aug 13", score: 58 },
      { day: "Aug 14", score: 49 },
      { day: "Aug 15", score: 71 },
      { day: "Aug 16", score: 64 },
      { day: "Aug 17", score: 79 },
      { day: "Aug 18", score: 74 },
    ],
    severityDistribution: [
      { severity: "CRITICAL", count: 6 },
      { severity: "HIGH", count: 8 },
      { severity: "MEDIUM", count: 7 },
      { severity: "LOW", count: 3 },
    ],
  });
}

/* =========================================================
   DESIGN TOKENS (referenced via inline style / className)
   ========================================================= */
// bg-void   #05070a
// panel     #0a0f16  / border #1b2733
// signal    #00ffa6  (phosphor)
// critical  #ff3b5c
// high      #ff9f1c
// medium    #ffd23f
// ink       #e7f1f0
// muted     #64798a

const SEV_COLOR = {
  CRITICAL: "#ff3b5c",
  HIGH: "#ff9f1c",
  MEDIUM: "#ffd23f",
  LOW: "#00ffa6",
};

export default function Overview() {
  const [stats, setStats] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("ALL");
  const [clock, setClock] = useState(new Date());

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [dashboardStats, incidentData, analyticsData] =
          await Promise.all([
            getDashboardStats(),
            getIncidents(),
            getAnalytics(),
          ]);

        setStats(dashboardStats);
        setIncidents(incidentData || []);
        setAnalytics(analyticsData);
      } catch (error) {
        console.error("Dashboard loading failed:", error);
      }
    }

    loadDashboard();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const filteredIncidents = useMemo(() => {
    return incidents
      .filter((incident) => {
        const query = search.toLowerCase();

        const matchesSearch =
          incident.id?.toLowerCase().includes(query) ||
          incident.title?.toLowerCase().includes(query);

        const matchesSeverity =
          severityFilter === "ALL" || incident.severity === severityFilter;

        return matchesSearch && matchesSeverity;
      })
      .slice(0, 8);
  }, [incidents, search, severityFilter]);

  if (!stats || !analytics) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#05070a] text-[#64798a]">
        <GlobalStyle />
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-[#1b2733] border-t-[#00ffa6]" />
          <p className="font-mono text-[11px] uppercase tracking-[0.25em]">
            Initializing security operations center
          </p>
        </div>
      </div>
    );
  }

  const maxIncidents = Math.max(
    ...analytics.incidentTrend.map((x) => x.incidents),
    1
  );
  const maxRisk = Math.max(...analytics.riskTrend.map((x) => x.score), 1);

  return (
    <div className="scanlines relative min-h-screen overflow-x-hidden bg-[#05070a] font-sans text-[#e7f1f0]">
      <GlobalStyle />
      <div className="vignette pointer-events-none fixed inset-0 z-0" />

      {/* HEADER */}
      <header className="relative z-10 border-b border-[#1b2733] bg-[#070b10]/90 backdrop-blur">
        <div className="mx-auto max-w-[1600px] px-6 py-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ffa6] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00ffa6]" />
                </span>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.35em] text-[#00ffa6]">
                  Live Monitoring
                </span>
              </div>

              <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-[#e7f1f0]">
                SOC <span className="text-[#00ffa6]">Overview</span>
              </h1>

              <p className="mt-1 font-mono text-[11px] text-[#64798a]">
                Real-time security posture &amp; threat monitoring
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded border border-[#1b2733] bg-[#0a0f16] px-4 py-2">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#64798a]">
                  System Status
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00ffa6] shadow-[0_0_8px_#00ffa6]" />
                  <span className="font-mono text-xs font-medium text-[#00ffa6]">
                    Operational
                  </span>
                </div>
              </div>

              <div className="rounded border border-[#1b2733] bg-[#0a0f16] px-4 py-2">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#64798a]">
                  Local Time
                </p>
                <p className="mt-1 font-mono text-xs tabular-nums text-[#e7f1f0]">
                  {clock.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="relative z-10 mx-auto max-w-[1600px] space-y-6 px-6 py-6">
        {/* KPI GRID */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          <MetricCard label="Total Incidents" value={stats.totalIncidents} hex="#00ffa6" />
          <MetricCard label="Critical Incidents" value={stats.criticalIncidents} hex="#ff3b5c" />
          <MetricCard label="Active Threats" value={stats.activeThreats} hex="#ff9f1c" />
          <MetricCard label="Assets at Risk" value={stats.assetsAtRisk} hex="#ffd23f" />
          <MetricCard label="Open Investigations" value={stats.openInvestigations} hex="#a78bfa" />
          <MetricCard label="Risk Score" value={`${stats.overallRiskScore}/100`} hex="#ff3b5c" />
        </div>

        {/* CHARTS */}
        <div className="grid gap-5 lg:grid-cols-2">
          <Panel title="Incident Trend" subtitle="Security incidents · Last 7 days">
            <BarChart data={analytics.incidentTrend} field="incidents" max={maxIncidents} hex="#00ffa6" />
          </Panel>

          <Panel title="Risk Trend" subtitle="Security risk score · Last 7 days">
            <BarChart data={analytics.riskTrend} field="score" max={maxRisk} hex="#ff3b5c" />
          </Panel>
        </div>

        {/* SEVERITY + RISK RADAR */}
        <div className="grid gap-5 lg:grid-cols-3">
          <Panel
            title="Severity Distribution"
            subtitle="Current incident classification"
            className="lg:col-span-2"
          >
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {analytics.severityDistribution.map((item) => {
                const hex = SEV_COLOR[item.severity];
                return (
                  <div
                    key={item.severity}
                    className="rounded border p-4 transition hover:-translate-y-0.5"
                    style={{
                      borderColor: `${hex}33`,
                      background: "#0a0f16",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="font-mono text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: hex }}
                      >
                        {item.severity}
                      </span>
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: hex, boxShadow: `0 0 8px ${hex}` }}
                      />
                    </div>

                    <p className="mt-4 font-display text-2xl font-bold text-[#e7f1f0]">
                      {item.count}
                    </p>

                    <div className="mt-3 h-1 rounded-full bg-[#151c26]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.min(
                            100,
                            (item.count / Math.max(stats.totalIncidents, 1)) * 100
                          )}%`,
                          background: hex,
                          boxShadow: `0 0 6px ${hex}`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>

          {/* SIGNATURE: THREAT RADAR */}
          <Panel title="Security Risk" subtitle="Overall security posture">
            <ThreatRadar score={stats.overallRiskScore} incidents={incidents} />
          </Panel>
        </div>

        {/* INCIDENT TABLE */}
        <section className="relative overflow-hidden rounded-lg border border-[#1b2733] bg-[#070b10]">
          <Corner />
          <div className="flex flex-col gap-3 border-b border-[#1b2733] px-5 py-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-sm font-bold uppercase tracking-widest text-[#e7f1f0]">
                Recent Incidents
              </h2>
              <p className="mt-1 font-mono text-[10px] text-[#64798a]">
                Latest security activity requiring attention
              </p>
            </div>

            <div className="flex gap-2">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search incidents..."
                className="h-8 w-48 rounded border border-[#1b2733] bg-[#05070a] px-3 font-mono text-xs text-[#e7f1f0] outline-none placeholder:text-[#3a4855] focus:border-[#00ffa6]/50 focus-visible:ring-1 focus-visible:ring-[#00ffa6]/50"
              />
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="h-8 rounded border border-[#1b2733] bg-[#05070a] px-2 font-mono text-xs text-[#9fb0bd] outline-none focus-visible:ring-1 focus-visible:ring-[#00ffa6]/50"
              >
                <option value="ALL">All Severity</option>
                <option value="CRITICAL">Critical</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr className="border-b border-[#1b2733] bg-[#0a0f16]">
                  {["Incident ID", "Description", "Severity", "Risk Score", "Status"].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#64798a]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredIncidents.map((incident) => {
                  const hex = SEV_COLOR[incident.severity] || "#64798a";
                  return (
                    <tr
                      key={incident.id}
                      className="border-b border-[#151c26] transition hover:bg-[#00ffa6]/[0.03]"
                      style={{ borderLeft: `2px solid ${hex}55` }}
                    >
                      <td className="px-5 py-4">
                        <span className="font-mono text-xs font-semibold text-[#00ffa6]">
                          {incident.id}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-xs font-medium text-[#e7f1f0]">{incident.title}</p>
                        <p className="mt-1 font-mono text-[10px] text-[#64798a]">
                          Security event detected
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <SeverityBadge severity={incident.severity} />
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className="font-mono text-xs font-semibold"
                          style={{
                            color:
                              incident.riskScore >= 85
                                ? "#ff3b5c"
                                : incident.riskScore >= 70
                                ? "#ff9f1c"
                                : "#9fb0bd",
                          }}
                        >
                          {incident.riskScore}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={incident.status} />
                      </td>
                    </tr>
                  );
                })}

                {filteredIncidents.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-5 py-10 text-center font-mono text-xs text-[#64798a]">
                      No incidents found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-[#1b2733] bg-[#0a0f16] px-5 py-3">
            <span className="font-mono text-[10px] text-[#64798a]">
              Showing {filteredIncidents.length} incidents
            </span>
            <span className="flex items-center gap-2 font-mono text-[10px] text-[#00ffa6]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00ffa6] shadow-[0_0_6px_#00ffa6]" />
              SOC Monitoring · Live
            </span>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="flex flex-col justify-between gap-2 border-t border-[#1b2733] pt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-[#3a4855] md:flex-row">
          <span>PS28 Security Operations Center</span>
          <span>Threat Intelligence · Incident Response · Monitoring</span>
        </footer>
      </main>
    </div>
  );
}

/* =========================================================
   COMPONENTS
   ========================================================= */

function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

      /* reset so bare h1/h2/p tags don't fall back to oversized UA defaults */
      h1, h2, h3, p { margin: 0; font-size: inherit; font-weight: inherit; line-height: inherit; }

      .font-display { font-family: 'Barlow Condensed', 'Inter', sans-serif; line-height: 1; }
      .font-mono, table, input, select { font-family: 'JetBrains Mono', ui-monospace, monospace; }
      .font-sans { font-family: 'Inter', system-ui, sans-serif; }

      .scanlines::before {
        content: "";
        position: fixed;
        inset: 0;
        z-index: 1;
        pointer-events: none;
        background: repeating-linear-gradient(
          0deg,
          rgba(255,255,255,0.012) 0px,
          rgba(255,255,255,0.012) 1px,
          transparent 1px,
          transparent 3px
        );
      }
      .vignette {
        background: radial-gradient(ellipse at 50% 0%, rgba(0,255,166,0.05), transparent 55%),
                    radial-gradient(ellipse at 100% 100%, rgba(255,59,92,0.05), transparent 50%);
      }

      @keyframes radar-sweep {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .radar-sweep { animation: radar-sweep 4s linear infinite; transform-origin: 50% 50%; }

      @keyframes blip-pulse {
        0%, 100% { opacity: 0.55; }
        50% { opacity: 1; }
      }
      .blip { animation: blip-pulse 2.4s ease-in-out infinite; }

      @media (prefers-reduced-motion: reduce) {
        .radar-sweep, .blip, .animate-ping, .animate-spin { animation: none !important; }
      }
    `}</style>
  );
}

function Corner() {
  const base =
    "pointer-events-none absolute h-3 w-3 border-[#00ffa6]/40";
  return (
    <>
      <span className={`${base} left-0 top-0 border-l-2 border-t-2`} />
      <span className={`${base} right-0 top-0 border-r-2 border-t-2`} />
      <span className={`${base} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${base} bottom-0 right-0 border-b-2 border-r-2`} />
    </>
  );
}

function MetricCard({ label, value, hex }) {
  return (
    <div
      className="relative overflow-hidden rounded-lg border border-[#1b2733] bg-[#070b10] p-4 transition hover:-translate-y-0.5 hover:border-[#2a3a48]"
    >
      <span
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: hex, boxShadow: `0 0 10px ${hex}` }}
      />
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#64798a]">
          {label}
        </span>
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: hex, boxShadow: `0 0 6px ${hex}` }}
        />
      </div>

      <p className="mt-3 font-display text-2xl font-bold tracking-tight text-[#e7f1f0]">
        {value}
      </p>

      <div className="mt-2 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#00ffa6]" />
        <span className="font-mono text-[9px] text-[#64798a]">Live data</span>
      </div>
    </div>
  );
}

function Panel({ title, subtitle, children, className = "" }) {
  return (
    <section
      className={`relative overflow-hidden rounded-lg border border-[#1b2733] bg-[#070b10] p-5 ${className}`}
    >
      <Corner />
      <div className="mb-5">
        <h2 className="font-display text-sm font-bold uppercase tracking-widest text-[#e7f1f0]">
          {title}
        </h2>
        <p className="mt-1 font-mono text-[10px] text-[#64798a]">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

function BarChart({ data, field, max, hex }) {
  return (
    <div className="relative h-56">
      <div className="absolute inset-0 flex flex-col justify-between">
        {[4, 3, 2, 1, 0].map((line) => (
          <div key={line} className="border-t border-[#151c26]" />
        ))}
      </div>

      <div className="relative flex h-full items-end gap-3 px-2 pb-6 pt-5">
        {data.map((item) => {
          const height = Math.max(8, (item[field] / max) * 175);
          return (
            <div key={item.day} className="group flex h-full flex-1 flex-col justify-end">
              <div className="relative flex flex-1 items-end justify-center">
                <span
                  className="absolute bottom-full mb-2 hidden rounded border px-2 py-1 font-mono text-[10px] group-hover:block"
                  style={{ borderColor: `${hex}44`, background: "#0a0f16", color: hex }}
                >
                  {item[field]}
                </span>
                <div
                  className="w-full max-w-10 rounded-t transition-all duration-200"
                  style={{
                    height: `${height}px`,
                    background: `linear-gradient(180deg, ${hex}, ${hex}66)`,
                    boxShadow: `0 0 10px ${hex}33`,
                  }}
                />
              </div>
              <span className="mt-2 text-center font-mono text-[10px] text-[#3a4855]">
                {item.day.replace("Aug ", "")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ThreatRadar({ score, incidents }) {
  // Place a blip per incident: angle from id hash, radius from riskScore (higher risk = closer to center)
  const blips = useMemo(() => {
    return incidents.slice(0, 18).map((inc, i) => {
      const angle = ((i * 47) % 360) * (Math.PI / 180);
      const radius = 92 - (inc.riskScore / 100) * 78; // higher risk -> nearer center
      const cx = 110 + radius * Math.cos(angle);
      const cy = 110 + radius * Math.sin(angle);
      return { ...inc, cx, cy };
    });
  }, [incidents]);

  const band =
    score >= 70 ? { label: "High", hex: "#ff3b5c" } :
    score >= 40 ? { label: "Medium", hex: "#ffd23f" } :
    { label: "Low", hex: "#00ffa6" };

  return (
    <div>
      <div className="flex items-end gap-2">
        <span className="font-display text-4xl font-bold" style={{ color: band.hex }}>
          {score}
        </span>
        <span className="mb-1 font-mono text-xs text-[#64798a]">/ 100</span>
      </div>

      <div className="relative mx-auto mt-4 h-[220px] w-[220px]">
        <svg viewBox="0 0 220 220" className="h-full w-full">
          {[92, 66, 40].map((r) => (
            <circle key={r} cx="110" cy="110" r={r} fill="none" stroke="#1b2733" strokeWidth="1" />
          ))}
          <line x1="110" y1="18" x2="110" y2="202" stroke="#151c26" strokeWidth="1" />
          <line x1="18" y1="110" x2="202" y2="110" stroke="#151c26" strokeWidth="1" />

          <g className="radar-sweep">
            <defs>
              <linearGradient id="sweepGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={band.hex} stopOpacity="0" />
                <stop offset="100%" stopColor={band.hex} stopOpacity="0.35" />
              </linearGradient>
            </defs>
            <path d="M110,110 L110,18 A92,92 0 0,1 168,42 Z" fill="url(#sweepGrad)" />
          </g>

          {blips.map((b) => (
            <circle
              key={b.id}
              className="blip"
              cx={b.cx}
              cy={b.cy}
              r={b.severity === "CRITICAL" ? 3.5 : 2.5}
              fill={SEV_COLOR[b.severity]}
              style={{ filter: `drop-shadow(0 0 3px ${SEV_COLOR[b.severity]})` }}
            />
          ))}

          <circle cx="110" cy="110" r="3" fill={band.hex} />
        </svg>
      </div>

      <div className="mt-3 flex justify-center gap-4 font-mono text-[9px] uppercase tracking-wider">
        <span className="flex items-center gap-1 text-[#00ffa6]"><i className="h-1.5 w-1.5 rounded-full bg-[#00ffa6]" />Low</span>
        <span className="flex items-center gap-1 text-[#ffd23f]"><i className="h-1.5 w-1.5 rounded-full bg-[#ffd23f]" />Medium</span>
        <span className="flex items-center gap-1 text-[#ff3b5c]"><i className="h-1.5 w-1.5 rounded-full bg-[#ff3b5c]" />High</span>
      </div>

      <div
        className="mt-5 rounded border p-3"
        style={{ borderColor: `${band.hex}22`, background: `${band.hex}0d` }}
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ background: band.hex }} />
          <span className="font-mono text-xs font-semibold" style={{ color: band.hex }}>
            {band.label === "High" ? "Elevated risk detected" : `${band.label} risk level`}
          </span>
        </div>
        <p className="mt-2 font-mono text-[11px] leading-relaxed text-[#64798a]">
          {band.label === "High"
            ? "Multiple active incidents require investigation."
            : "Posture within acceptable operating range."}
        </p>
      </div>
    </div>
  );
}

function SeverityBadge({ severity }) {
  const hex = SEV_COLOR[severity] || "#64798a";
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded border px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wide"
      style={{ borderColor: `${hex}33`, background: `${hex}14`, color: hex }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: hex }} />
      {severity}
    </span>
  );
}

function StatusBadge({ status }) {
  const styles = {
    INVESTIGATING: { hex: "#00d9ff" },
    OPEN: { hex: "#ff9f1c" },
    RESOLVED: { hex: "#00ffa6" },
  };
  const hex = styles[status]?.hex || "#64798a";
  return (
    <span
      className="inline-flex rounded border px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-wide"
      style={{ borderColor: `${hex}33`, background: `${hex}14`, color: hex }}
    >
      {status}
    </span>
  );
}