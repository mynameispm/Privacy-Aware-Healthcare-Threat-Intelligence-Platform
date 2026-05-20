import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { Panel } from "@/components/Panel";
import { ThreatTable } from "@/components/ThreatTable";

export const Route = createFileRoute("/threat-matrix")({
  head: () => ({ meta: [{ title: "Threat Matrix — MediSec SOC" }] }),
  component: () => (
    <AppLayout title="Threat Matrix" subtitle="Active threat registry across all healthcare assets">
      <Panel title="Active Threats" subtitle="Search, sort and filter the live matrix">
        <ThreatTable />
      </Panel>
    </AppLayout>
  ),
});
