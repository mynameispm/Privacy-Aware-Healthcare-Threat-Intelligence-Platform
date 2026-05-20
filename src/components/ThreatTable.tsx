import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpDown, Search } from "lucide-react";
import { threats, type Threat } from "@/lib/mock-data";

type SortKey = keyof Threat;

const sevColor: Record<Threat["severity"], string> = {
  Critical: "bg-critical/20 text-critical border-critical/40",
  High: "bg-warning/20 text-warning border-warning/40",
  Medium: "bg-cyan/20 text-cyan border-cyan/40",
  Low: "bg-success/20 text-success border-success/40",
};

const statusColor: Record<Threat["status"], string> = {
  Open: "bg-critical/15 text-critical",
  Investigating: "bg-warning/15 text-warning",
  Mitigated: "bg-success/15 text-success",
};

export function ThreatTable() {
  const [q, setQ] = useState("");
  const [sev, setSev] = useState<string>("All");
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "detected", dir: -1 });

  const rows = useMemo(() => {
    let r = threats.filter((t) =>
      (sev === "All" || t.severity === sev) &&
      (q === "" || `${t.id} ${t.asset} ${t.category}`.toLowerCase().includes(q.toLowerCase()))
    );
    r = [...r].sort((a, b) => (a[sort.key] > b[sort.key] ? 1 : -1) * sort.dir);
    return r;
  }, [q, sev, sort]);

  const toggle = (key: SortKey) =>
    setSort((s) => ({ key, dir: s.key === key ? (s.dir === 1 ? -1 : 1) : 1 }));

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-input border border-border flex-1 min-w-[200px]">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search threats by ID, asset, category..."
            className="bg-transparent text-sm outline-none flex-1"
          />
        </div>
        <div className="flex gap-1 p-1 rounded-lg bg-input border border-border">
          {["All", "Critical", "High", "Medium", "Low"].map((s) => (
            <button
              key={s}
              onClick={() => setSev(s)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
                sev === s ? "bg-primary text-primary-foreground shadow-[0_0_12px_var(--neon)]" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary/40 text-xs uppercase tracking-wider text-muted-foreground">
              {(["id", "asset", "category", "severity", "status", "detected"] as SortKey[]).map((k) => (
                <th key={k} className="text-left px-4 py-3 font-semibold">
                  <button onClick={() => toggle(k)} className="inline-flex items-center gap-1 hover:text-foreground">
                    {k} <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((t, i) => (
              <motion.tr
                key={t.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                className="border-t border-border hover:bg-primary/5 transition"
              >
                <td className="px-4 py-3 font-mono text-primary text-xs">{t.id}</td>
                <td className="px-4 py-3">{t.asset}</td>
                <td className="px-4 py-3 text-muted-foreground">{t.category}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-md text-xs border ${sevColor[t.severity]}`}>{t.severity}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-md text-xs ${statusColor[t.status]}`}>{t.status}</span>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{t.detected}</td>
              </motion.tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No threats match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
