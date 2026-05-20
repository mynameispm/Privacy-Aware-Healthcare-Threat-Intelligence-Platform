import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { Panel } from "@/components/Panel";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — MediSec SOC" }] }),
  component: () => (
    <AppLayout title="Settings" subtitle="SOC platform configuration">
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Organization">
          <div className="space-y-3 text-sm">
            <Row label="Organization" value="MediSec Health Network" />
            <Row label="Region" value="EU-West (GDPR)" />
            <Row label="Tier" value="Enterprise" />
          </div>
        </Panel>
        <Panel title="Security">
          <div className="space-y-3 text-sm">
            <Row label="MFA" value="Required" />
            <Row label="Session Timeout" value="15 min" />
            <Row label="Audit Logging" value="Enabled" />
          </div>
        </Panel>
        <Panel title="Notifications" className="lg:col-span-2">
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <Row label="Critical Alerts" value="Email + SMS" />
            <Row label="Daily Digest" value="08:00 UTC" />
            <Row label="Weekly Report" value="Monday 06:00" />
          </div>
        </Panel>
      </div>
    </AppLayout>
  ),
});

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-border last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
