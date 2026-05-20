export const stats = {
  totalThreats: 1248,
  criticalThreats: 37,
  gdprScore: 92,
  privacyRisk: 28,
  petRecs: 14,
};

export const severityData = [
  { name: "Critical", value: 37, color: "oklch(0.65 0.25 20)" },
  { name: "High", value: 124, color: "oklch(0.82 0.18 50)" },
  { name: "Medium", value: 412, color: "oklch(0.82 0.18 80)" },
  { name: "Low", value: 675, color: "oklch(0.78 0.18 160)" },
];

export const linddunData = [
  { category: "Linkability", count: 82 },
  { category: "Identifiability", count: 145 },
  { category: "Non-repudiation", count: 34 },
  { category: "Detectability", count: 67 },
  { category: "Disclosure", count: 203 },
  { category: "Unawareness", count: 91 },
  { category: "Non-compliance", count: 48 },
];

export const gdprRadar = [
  { metric: "Consent", score: 94 },
  { metric: "Data Min.", score: 86 },
  { metric: "Encryption", score: 98 },
  { metric: "Access Ctrl", score: 89 },
  { metric: "Retention", score: 78 },
  { metric: "Breach Notif.", score: 92 },
];

export const riskTrend = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  risk: 30 + Math.round(Math.sin(i / 2) * 18 + Math.random() * 12),
  mitigated: 60 + Math.round(Math.cos(i / 3) * 15 + Math.random() * 10),
}));

export type Threat = {
  id: string;
  asset: string;
  category: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  status: "Open" | "Mitigated" | "Investigating";
  detected: string;
};

export const threats: Threat[] = [
  { id: "THR-2041", asset: "PatientPortal API", category: "Disclosure", severity: "Critical", status: "Open", detected: "2026-05-19" },
  { id: "THR-2042", asset: "EHR Sync Service", category: "Identifiability", severity: "High", status: "Investigating", detected: "2026-05-18" },
  { id: "THR-2043", asset: "Telehealth Stream", category: "Linkability", severity: "Medium", status: "Mitigated", detected: "2026-05-18" },
  { id: "THR-2044", asset: "Lab Results DB", category: "Disclosure", severity: "High", status: "Open", detected: "2026-05-17" },
  { id: "THR-2045", asset: "Wearables Ingest", category: "Detectability", severity: "Low", status: "Mitigated", detected: "2026-05-17" },
  { id: "THR-2046", asset: "Billing Gateway", category: "Non-compliance", severity: "Critical", status: "Open", detected: "2026-05-16" },
  { id: "THR-2047", asset: "Imaging PACS", category: "Unawareness", severity: "Medium", status: "Investigating", detected: "2026-05-16" },
  { id: "THR-2048", asset: "Consent Manager", category: "Non-repudiation", severity: "Low", status: "Mitigated", detected: "2026-05-15" },
  { id: "THR-2049", asset: "Pharmacy Bridge", category: "Identifiability", severity: "High", status: "Open", detected: "2026-05-15" },
  { id: "THR-2050", asset: "Genomics Vault", category: "Disclosure", severity: "Critical", status: "Investigating", detected: "2026-05-14" },
];

export const reports = [
  { id: "RPT-001", title: "Q2 2026 GDPR Compliance Audit", date: "2026-05-15", size: "2.4 MB", type: "Compliance" },
  { id: "RPT-002", title: "LINDDUN Threat Model — PatientPortal", date: "2026-05-10", size: "1.8 MB", type: "Threat Model" },
  { id: "RPT-003", title: "Privacy Risk Assessment — Telehealth", date: "2026-05-05", size: "3.1 MB", type: "Risk" },
  { id: "RPT-004", title: "PET Implementation Roadmap", date: "2026-04-28", size: "1.2 MB", type: "Strategy" },
  { id: "RPT-005", title: "Incident Response — THR-2041", date: "2026-04-22", size: "0.9 MB", type: "Incident" },
  { id: "RPT-006", title: "Annual SOC Privacy Review", date: "2026-04-10", size: "5.6 MB", type: "Audit" },
];
