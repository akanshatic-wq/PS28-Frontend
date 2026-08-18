import { useEffect, useState } from "react";
import {
  getDashboardStats,
  getIncidents,
  getAnalytics,
} from "../services/api";

export default function Overview() {
  const [stats, setStats] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
      const [dashboardStats, incidentData, analyticsData] =
        await Promise.all([
          getDashboardStats(),
          getIncidents(),
          getAnalytics(),
        ]);

      setStats(dashboardStats);
      setIncidents(incidentData);
      setAnalytics(analyticsData);
    }

    loadDashboard();
  }, []);

  if (!stats || !analytics) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
        Loading SOC dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <div className="mb-8">
        <p className="mb-1 text-sm text-slate-400">
          SECURITY OPERATIONS CENTER
        </p>

        <h1 className="text-3xl font-bold">
          SOC Overview
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Real-time security posture and threat monitoring
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Kpi title="Total Incidents" value={stats.totalIncidents} />
        <Kpi title="Critical Incidents" value={stats.criticalIncidents} />
        <Kpi title="Active Threats" value={stats.activeThreats} />
        <Kpi title="Assets at Risk" value={stats.assetsAtRisk} />
        <Kpi title="Open Investigations" value={stats.openInvestigations} />
        <Kpi title="Risk Score" value={`${stats.overallRiskScore}/100`} />
      </div>

      {/* CHART AREA */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">

        <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="mb-4 text-lg font-semibold">
            Incident Trend
          </h2>

          <div className="flex h-56 items-end gap-3">
            {analytics.incidentTrend.map((item) => (
              <div
                key={item.day}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <div
                  className="w-full rounded-t bg-cyan-500/70"
                  style={{
                    height: `${item.incidents * 5}px`,
                  }}
                  title={`${item.incidents} incidents`}
                />

                <span className="text-[10px] text-slate-500">
                  {item.day.replace("Aug ", "")}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="mb-4 text-lg font-semibold">
            Risk Trend
          </h2>

          <div className="flex h-56 items-end gap-3">
            {analytics.riskTrend.map((item) => (
              <div
                key={item.day}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <div
                  className="w-full rounded-t bg-red-500/70"
                  style={{
                    height: `${item.score * 2}px`,
                  }}
                  title={`Risk score: ${item.score}`}
                />

                <span className="text-[10px] text-slate-500">
                  {item.day.replace("Aug ", "")}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* SEVERITY */}
      <section className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-5">
        <h2 className="mb-5 text-lg font-semibold">
          Severity Distribution
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {analytics.severityDistribution.map((item) => (
            <div
              key={item.severity}
              className="rounded-lg border border-slate-800 bg-slate-950 p-4"
            >
              <p className="text-sm text-slate-400">
                {item.severity}
              </p>

              <p className="mt-2 text-2xl font-bold">
                {item.count}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* RECENT INCIDENTS */}
      <section className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Recent Incidents
          </h2>

          <span className="text-xs text-slate-500">
            Latest security activity
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-800 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-3 py-3">ID</th>
                <th className="px-3 py-3">Incident</th>
                <th className="px-3 py-3">Severity</th>
                <th className="px-3 py-3">Risk</th>
                <th className="px-3 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {incidents.slice(0, 5).map((incident) => (
                <tr
                  key={incident.id}
                  className="border-b border-slate-900 hover:bg-slate-800/40"
                >
                  <td className="px-3 py-4 font-mono text-cyan-400">
                    {incident.id}
                  </td>

                  <td className="px-3 py-4">
                    {incident.title}
                  </td>

                  <td className="px-3 py-4">
                    <span className="rounded-md bg-red-500/10 px-2 py-1 text-xs font-semibold text-red-400">
                      {incident.severity}
                    </span>
                  </td>

                  <td className="px-3 py-4 font-semibold">
                    {incident.riskScore}
                  </td>

                  <td className="px-3 py-4 text-slate-400">
                    {incident.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Kpi({ title, value }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-100">
        {value}
      </p>
    </div>
  );
}