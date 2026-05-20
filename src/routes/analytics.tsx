import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { Panel } from "@/components/Panel";
import { RiskTrend } from "@/components/charts/RiskTrend";
import { LinddunBar } from "@/components/charts/LinddunBar";
import { SeverityPie } from "@/components/charts/SeverityPie";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Analytics — MediSec SOC" }] }),
  component: () => (
    <AppLayout title="Analytics" subtitle="Deep-dive trends across the privacy fleet">
      <div className="grid gap-5">
        <Panel title="Risk vs Mitigation — 12-month"><RiskTrend /></Panel>
        <div className="grid lg:grid-cols-2 gap-5">
          <Panel title="LINDDUN Distribution"><LinddunBar /></Panel>
          <Panel title="Severity Breakdown"><SeverityPie /></Panel>
        </div>
      </div>
    </AppLayout>
  ),
});
