import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { riskTrend } from "@/lib/mock-data";

export function RiskTrend() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={riskTrend}>
        <defs>
          <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.65 0.25 20)" stopOpacity={0.6} />
            <stop offset="100%" stopColor="oklch(0.65 0.25 20)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="mitGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.72 0.2 240)" stopOpacity={0.6} />
            <stop offset="100%" stopColor="oklch(0.72 0.2 240)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
        <XAxis dataKey="month" tick={{ fill: "oklch(0.65 0.04 230)", fontSize: 11 }} />
        <YAxis tick={{ fill: "oklch(0.65 0.04 230)", fontSize: 11 }} />
        <Tooltip contentStyle={{ background: "oklch(0.15 0.03 250)", border: "1px solid var(--neon)", borderRadius: 8, fontSize: 12 }} />
        <Area type="monotone" dataKey="risk" stroke="oklch(0.65 0.25 20)" fill="url(#riskGrad)" strokeWidth={2} />
        <Area type="monotone" dataKey="mitigated" stroke="oklch(0.72 0.2 240)" fill="url(#mitGrad)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
