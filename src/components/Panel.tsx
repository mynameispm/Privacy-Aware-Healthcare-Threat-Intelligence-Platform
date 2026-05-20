import { motion } from "framer-motion";
import { ReactNode } from "react";

export function Panel({ title, subtitle, children, className = "" }: { title?: string; subtitle?: string; children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative glass-strong rounded-xl p-5 overflow-hidden ${className}`}
    >
      {(title || subtitle) && (
        <div className="mb-4 flex items-start justify-between">
          <div>
            {title && <h3 className="font-display text-sm font-semibold tracking-wider uppercase text-foreground">{title}</h3>}
            {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
          </div>
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_var(--neon)]" />
        </div>
      )}
      {children}
    </motion.div>
  );
}
