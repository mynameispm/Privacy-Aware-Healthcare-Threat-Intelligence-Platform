import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { LayoutDashboard, ShieldAlert, Grid3x3, FileCheck, FileText, BarChart3, Settings, Activity } from "lucide-react";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/threat-analysis", label: "Threat Analysis", icon: ShieldAlert },
  { to: "/threat-matrix", label: "Threat Matrix", icon: Grid3x3 },
  { to: "/gdpr", label: "GDPR Compliance", icon: FileCheck },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl sticky top-0 h-screen">
      <div className="px-6 py-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-primary blur-lg opacity-60" />
            <div className="relative h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-cyan flex items-center justify-center">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
          </div>
          <div>
            <p className="font-display text-sm font-bold tracking-wider gradient-text">MEDISEC</p>
            <p className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase">SOC v3.1</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-6 space-y-1">
        {nav.map((item, i) => {
          const active = path === item.to;
          const Icon = item.icon;
          return (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                to={item.to}
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  active
                    ? "bg-primary/15 text-foreground neon-border"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="sb-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r bg-primary shadow-[0_0_12px_var(--neon)]"
                  />
                )}
                <Icon className={`h-4 w-4 ${active ? "text-primary" : ""}`} />
                <span className="font-medium tracking-wide">{item.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </nav>
      <div className="px-4 py-4 border-t border-sidebar-border">
        <div className="glass rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-muted-foreground">System Online</span>
          </div>
          <p className="text-[10px] text-muted-foreground/70 font-mono">UPTIME 99.998%</p>
        </div>
      </div>
    </aside>
  );
}
