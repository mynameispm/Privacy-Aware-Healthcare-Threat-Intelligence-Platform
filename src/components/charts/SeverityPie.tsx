import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { severityData } from "@/lib/mock-data";

export function SeverityPie() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={severityData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} stroke="oklch(0.12 0.02 250)" strokeWidth={2}>
          {severityData.map((d) => <Cell key={d.name} fill={d.color} />)}
        </Pie>
        <Tooltip contentStyle={{ background: "oklch(0.15 0.03 250)", border: "1px solid var(--neon)", borderRadius: 8, fontSize: 12 }} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
