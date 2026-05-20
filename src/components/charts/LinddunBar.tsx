import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { linddunData } from "@/lib/mock-data";

export function LinddunBar() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={linddunData}>
        <defs>
          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.85 0.18 195)" />
            <stop offset="100%" stopColor="oklch(0.5 0.2 240)" />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
        <XAxis dataKey="category" tick={{ fill: "oklch(0.65 0.04 230)", fontSize: 10 }} interval={0} angle={-20} textAnchor="end" height={60} />
        <YAxis tick={{ fill: "oklch(0.65 0.04 230)", fontSize: 11 }} />
        <Tooltip contentStyle={{ background: "oklch(0.15 0.03 250)", border: "1px solid var(--neon)", borderRadius: 8, fontSize: 12 }} cursor={{ fill: "oklch(1 0 0 / 0.04)" }} />
        <Bar dataKey="count" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
