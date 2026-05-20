import { Bell, Search, Shield } from "lucide-react";

export function TopBar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="sticky top-0 z-30 glass-strong border-b border-border px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="font-display text-xl font-bold tracking-wide text-foreground">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-input/50 border border-border w-64">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search threats, assets..."
            className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground"
          />
        </div>
        <button className="relative h-9 w-9 rounded-lg glass hover:neon-border transition flex items-center justify-center">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-critical animate-pulse" />
        </button>
        <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-cyan flex items-center justify-center">
          <Shield className="h-4 w-4 text-primary-foreground" />
        </div>
      </div>
    </header>
  );
}
