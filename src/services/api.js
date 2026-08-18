import {
  dashboardStats,
  incidents,
  events,
  threats,
  devices,
  recommendations,
  incidentTrend,
  severityDistribution,
  riskTrend,
  graphData,
  assistantResponses,
} from "../data/mockData";

export async function getDashboardStats() {
  return dashboardStats;
}

export async function getIncidents() {
  return incidents;
}

export async function getEvents() {
  return events;
}

export async function getThreats() {
  return threats;
}

export async function getDevices() {
  return devices;
}

export async function getRecommendations() {
  return recommendations;
}

export async function getAnalytics() {
  return {
    incidentTrend,
    severityDistribution,
    riskTrend,
  };
}

export async function getGraphData() {
  return graphData;
}

export async function askAssistant(question) {
  const text = question.toLowerCase();

  if (text.includes("highest") || text.includes("risk")) {
    return assistantResponses["highest-risk"];
  }

  if (text.includes("compromised")) {
    return assistantResponses["compromised"];
  }

  if (text.includes("critical") || text.includes("threat")) {
    return assistantResponses["critical"];
  }

  if (text.includes("investigate") || text.includes("first")) {
    return assistantResponses["investigate"];
  }

  return "Based on the current SOC data, I recommend reviewing the highest-risk incidents and compromised assets first.";
}