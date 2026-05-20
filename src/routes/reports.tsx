import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { Panel } from "@/components/Panel";
import { reports } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { Download, FileText, FileDown } from "lucide-react";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports — MediSec SOC" }] }),
  component: ReportsPage,
});

function downloadStub(title: string) {
  const blob = new Blob([`MediSec SOC Report\n\n${title}\nGenerated: ${new Date().toISOString()}`], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `${title.replace(/\s+/g, "_")}.pdf`; a.click();
  URL.revokeObjectURL(url);
}

function ReportsPage() {
  return (
    <AppLayout title="Reports" subtitle="Generated compliance & threat artifacts">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 mb-6">
        {reports.slice(0, 3).map((r, i) => (
          <motion.div key={r.id}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="relative glass-strong rounded-xl p-5 overflow-hidden group">
            <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br from-primary/40 to-cyan/10 blur-2xl opacity-60 group-hover:opacity-100 transition" />
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className="h-10 w-10 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded bg-cyan/15 text-cyan border border-cyan/30">{r.type}</span>
              </div>
              <h3 className="font-display font-semibold mb-2 leading-snug">{r.title}</h3>
              <p className="text-xs text-muted-foreground font-mono">{r.date} · {r.size}</p>
              <button onClick={() => downloadStub(r.title)}
                className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-primary to-cyan text-primary-foreground font-medium text-sm flex items-center justify-center gap-2 shadow-[0_0_16px_var(--neon)] hover:shadow-[0_0_28px_var(--neon)] transition">
                <Download className="h-4 w-4" /> Download PDF
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <Panel title="Report History" subtitle="All generated artifacts">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/40 text-xs uppercase tracking-wider text-muted-foreground">
                <th className="text-left px-4 py-3">ID</th>
                <th className="text-left px-4 py-3">Title</th>
                <th className="text-left px-4 py-3">Type</th>
                <th className="text-left px-4 py-3">Date</th>
                <th className="text-left px-4 py-3">Size</th>
                <th className="text-right px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r, i) => (
                <motion.tr key={r.id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="border-t border-border hover:bg-primary/5 transition">
                  <td className="px-4 py-3 font-mono text-primary text-xs">{r.id}</td>
                  <td className="px-4 py-3">{r.title}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{r.type}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{r.date}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{r.size}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => downloadStub(r.title)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary/15 border border-primary/30 text-primary text-xs hover:bg-primary/25 transition">
                      <FileDown className="h-3.5 w-3.5" /> Export
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </AppLayout>
  );
}
