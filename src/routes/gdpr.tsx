import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { Panel } from "@/components/Panel";
import { GdprRadar } from "@/components/charts/GdprRadar";
import { gdprRadar } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/gdpr")({
  head: () => ({ meta: [{ title: "GDPR Compliance — MediSec SOC" }] }),
  component: () => (
    <AppLayout title="GDPR Compliance" subtitle="Per-principle posture & remediation queue">
      <div className="grid lg:grid-cols-3 gap-5">
        <Panel title="Compliance Radar" className="lg:col-span-1"><GdprRadar /></Panel>
        <Panel title="Principle Scorecard" className="lg:col-span-2">
          <div className="space-y-3">
            {gdprRadar.map((g, i) => (
              <motion.div key={g.metric}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-3 rounded-lg glass">
                <CheckCircle2 className={`h-5 w-5 ${g.score > 90 ? "text-success" : g.score > 80 ? "text-warning" : "text-critical"}`} />
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium">{g.metric}</span>
                    <span className="font-mono text-primary">{g.score}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${g.score}%` }} transition={{ delay: i * 0.05 + 0.2, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-primary to-cyan shadow-[0_0_12px_var(--neon)]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Panel>
      </div>
    </AppLayout>
  ),
});
