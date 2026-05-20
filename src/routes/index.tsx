import { createFileRoute } from "@tanstack/react-router";
import { ShieldAlert, AlertOctagon, FileCheck2, Activity, Lightbulb } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatCard } from "@/components/StatCard";
import { Panel } from "@/components/Panel";
import { SeverityPie } from "@/components/charts/SeverityPie";
import { LinddunBar } from "@/components/charts/LinddunBar";
import { GdprRadar } from "@/components/charts/GdprRadar";
import { RiskTrend } from "@/components/charts/RiskTrend";
import { stats } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Dashboard — MediSec SOC" }, { name: "description", content: "Healthcare privacy intelligence command center." }] }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <AppLayout title="Privacy Intelligence Dashboard" subtitle="Real-time healthcare threat & GDPR posture">
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 mb-6">
        <StatCard label="Total Threats" value={stats.totalThreats.toLocaleString()} delta="+42 last 24h" icon={ShieldAlert} tone="primary" index={0} />
        <StatCard label="Critical Threats" value={stats.criticalThreats} delta="3 unresolved" icon={AlertOctagon} tone="critical" index={1} />
        <StatCard label="GDPR Compliance" value={`${stats.gdprScore}%`} delta="+2.4% MoM" icon={FileCheck2} tone="success" index={2} />
        <StatCard label="Privacy Risk Score" value={stats.privacyRisk} delta="Low-Medium" icon={Activity} tone="warning" index={3} />
        <StatCard label="PET Recommendations" value={stats.petRecs} delta="6 high priority" icon={Lightbulb} tone="primary" index={4} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2 mb-5">
        <Panel title="Threat Severity Distribution" subtitle="By criticality"><SeverityPie /></Panel>
        <Panel title="LINDDUN Threat Categories" subtitle="Privacy threat taxonomy"><LinddunBar /></Panel>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="GDPR Compliance Posture" subtitle="Per principle"><GdprRadar /></Panel>
        <Panel title="Risk vs Mitigation Trend" subtitle="12-month view"><RiskTrend /></Panel>
      </div>
    </AppLayout>
  );
}
