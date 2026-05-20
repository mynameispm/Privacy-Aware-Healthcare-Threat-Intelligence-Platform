import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import { gdprRadar } from "@/lib/mock-data";

export function GdprRadar() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <RadarChart data={gdprRadar}>
        <PolarGrid stroke="oklch(1 0 0 / 0.1)" />
        <PolarAngleAxis dataKey="metric" tick={{ fill: "oklch(0.85 0.02 220)", fontSize: 11 }} />
        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "oklch(0.55 0.04 230)", fontSize: 9 }} />
        <Radar dataKey="score" stroke="oklch(0.72 0.2 240)" fill="oklch(0.72 0.2 240)" fillOpacity={0.35} strokeWidth={2} />
        <Tooltip contentStyle={{ background: "oklch(0.15 0.03 250)", border: "1px solid var(--neon)", borderRadius: 8, fontSize: 12 }} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
