import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";

const schema = z.object({
  appName: z.string().min(2, "App name required").max(80),
  appType: z.enum(["EHR", "Telehealth", "Wearable", "Imaging", "Pharmacy", "Genomics"]),
  medicalData: z.boolean(),
  biometrics: z.boolean(),
  gps: z.boolean(),
  encryption: z.boolean(),
  consent: z.boolean(),
  logging: z.boolean(),
});

type FormVals = z.infer<typeof schema>;

const toggles: { key: keyof FormVals; label: string; desc: string }[] = [
  { key: "medicalData", label: "Medical Data Collection", desc: "PHI, diagnoses, prescriptions" },
  { key: "biometrics", label: "Biometrics", desc: "Fingerprint, facial, gait" },
  { key: "gps", label: "GPS Tracking", desc: "Location & geofencing" },
  { key: "encryption", label: "Encryption Enabled", desc: "AES-256 at-rest & in-transit" },
  { key: "consent", label: "Consent Collection", desc: "Explicit GDPR Art. 7" },
  { key: "logging", label: "Logging Enabled", desc: "Audit trail & SIEM forwarding" },
];

export function ThreatForm() {
  const [result, setResult] = useState<{ risk: number; recs: string[] } | null>(null);
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<FormVals>({
    resolver: zodResolver(schema),
    defaultValues: {
      appName: "", appType: "EHR",
      medicalData: true, biometrics: false, gps: false,
      encryption: true, consent: true, logging: true,
    },
  });

  const vals = watch();

  const onSubmit = (data: FormVals) => {
    let risk = 20;
    if (data.medicalData) risk += 18;
    if (data.biometrics) risk += 15;
    if (data.gps) risk += 10;
    if (!data.encryption) risk += 25;
    if (!data.consent) risk += 20;
    if (!data.logging) risk += 12;
    risk = Math.min(99, risk);
    const recs: string[] = [];
    if (!data.encryption) recs.push("Enable AES-256 encryption at rest and TLS 1.3 in transit");
    if (!data.consent) recs.push("Implement granular consent capture per GDPR Art. 7");
    if (!data.logging) recs.push("Forward audit logs to centralized SIEM");
    if (data.biometrics) recs.push("Apply homomorphic encryption to biometric templates");
    if (data.gps) recs.push("Use differential privacy on location aggregates");
    if (data.medicalData) recs.push("Apply k-anonymity (k≥5) on exported datasets");
    setResult({ risk, recs });
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Application Name" error={errors.appName?.message}>
            <input
              {...register("appName")}
              placeholder="e.g. PatientPortal v3"
              className="w-full px-3 py-2.5 rounded-lg bg-input border border-border focus:border-primary focus:shadow-[0_0_0_3px_oklch(0.72_0.2_240/0.2)] outline-none transition"
            />
          </Field>
          <Field label="Healthcare Application Type">
            <select
              {...register("appType")}
              className="w-full px-3 py-2.5 rounded-lg bg-input border border-border focus:border-primary outline-none"
            >
              {["EHR", "Telehealth", "Wearable", "Imaging", "Pharmacy", "Genomics"].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {toggles.map((t) => (
            <label key={t.key} className="flex items-start gap-3 p-3 rounded-lg glass cursor-pointer hover:neon-border transition">
              <button
                type="button"
                onClick={() => setValue(t.key, !vals[t.key] as never)}
                className={`relative h-6 w-11 rounded-full transition ${vals[t.key] ? "bg-primary shadow-[0_0_12px_var(--neon)]" : "bg-muted"}`}
              >
                <motion.span
                  animate={{ x: vals[t.key] ? 22 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute top-0.5 h-5 w-5 rounded-full bg-foreground"
                />
              </button>
              <div className="flex-1">
                <div className="text-sm font-medium">{t.label}</div>
                <div className="text-xs text-muted-foreground">{t.desc}</div>
              </div>
            </label>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
          type="submit" disabled={isSubmitting}
          className="w-full py-3 rounded-lg font-display font-semibold tracking-wider uppercase text-sm bg-gradient-to-r from-primary to-cyan text-primary-foreground shadow-[0_0_24px_var(--neon)] hover:shadow-[0_0_40px_var(--neon)] transition"
        >
          Run Threat Analysis
        </motion.button>
      </form>

      <motion.div
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
        className="glass-strong rounded-xl p-5 relative overflow-hidden"
      >
        <div className="absolute inset-0 scan-line" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <h3 className="font-display text-sm uppercase tracking-wider">Live Assessment</h3>
          </div>
          {!result ? (
            <p className="text-sm text-muted-foreground">Submit the form to generate a privacy risk score and PET recommendations.</p>
          ) : (
            <>
              <div className="text-center my-6">
                <div className="text-xs text-muted-foreground uppercase tracking-widest">Risk Score</div>
                <div className={`font-display text-6xl font-bold mt-2 ${result.risk > 70 ? "text-critical" : result.risk > 40 ? "text-warning" : "text-success"}`}>
                  {result.risk}
                </div>
                <div className="text-xs text-muted-foreground mt-1">/ 100</div>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">PET Recommendations</p>
                {result.recs.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                    className="text-xs p-2 rounded bg-primary/10 border-l-2 border-primary"
                  >{r}</motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">{label}</label>
      {children}
      {error && <p className="text-xs text-critical mt-1">{error}</p>}
    </div>
  );
}
