import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { Panel } from "@/components/Panel";
import { ThreatForm } from "@/components/ThreatForm";

export const Route = createFileRoute("/threat-analysis")({
  head: () => ({ meta: [{ title: "Threat Analysis — MediSec SOC" }] }),
  component: () => (
    <AppLayout title="Healthcare Threat Analysis" subtitle="LINDDUN-driven privacy threat modeling">
      <Panel title="Application Assessment" subtitle="Configure your healthcare app for instant PET-driven analysis">
        <ThreatForm />
      </Panel>
    </AppLayout>
  ),
});
