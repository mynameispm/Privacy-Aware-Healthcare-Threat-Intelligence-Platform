import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  tone = "primary",
  index = 0,
}: {
  label: string;
  value: string | number;
  delta?: string;
  icon: LucideIcon;
  tone?: "primary" | "critical" | "success" | "warning";
  index?: number;
}) {
  const toneMap = {
    primary: "from-primary/30 to-cyan/10 text-primary",
    critical: "from-critical/40 to-critical/10 text-critical",
    success: "from-success/30 to-success/10 text-success",
    warning: "from-warning/30 to-warning/10 text-warning",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 120 }}
      whileHover={{ y: -4 }}
      className="relative glass-strong rounded-xl p-5 overflow-hidden group"
    >
      <div className={`absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${toneMap[tone]} blur-2xl opacity-60 group-hover:opacity-90 transition`} />
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
          <Icon className={`h-4 w-4 ${toneMap[tone].split(" ").pop()}`} />
        </div>
        <div className="font-display text-3xl font-bold text-foreground">{value}</div>
        {delta && <div className="text-xs text-muted-foreground mt-1">{delta}</div>}
        <div className="mt-4 h-1 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "70%" }}
            transition={{ delay: index * 0.08 + 0.2, duration: 1 }}
            className={`h-full bg-gradient-to-r ${toneMap[tone]}`}
          />
        </div>
      </div>
    </motion.div>
  );
}
