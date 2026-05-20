# MediSec SOC — Healthcare Privacy Intelligence Dashboard

A futuristic, enterprise-grade Security Operations Center (SOC) dashboard built for healthcare cybersecurity and GDPR compliance monitoring. Features glassmorphism design, neon-blue cyber aesthetics, real-time data visualization, and interactive privacy threat analysis tools.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Design System](#design-system)
- [Features](#features)
- [Project Structure](#project-structure)
- [Components](#components)
- [Routes](#routes)
- [Charts & Visualizations](#charts--visualizations)
- [Mock Data](#mock-data)
- [Development](#development)
- [Build & Deploy](#build--deploy)
- [Architecture Decisions](#architecture-decisions)

---

## Overview

MediSec SOC is a healthcare privacy intelligence platform designed for security teams monitoring threats to protected health information (PHI), biometric data, and patient records. The dashboard provides:

- Real-time threat severity monitoring
- LINDDUN privacy threat taxonomy analysis
- GDPR compliance scoring per regulatory principle
- Privacy Enhancing Technology (PET) recommendations
- Interactive threat matrices with search, filter, and sort
- Downloadable compliance and incident reports

The visual language draws from cybersecurity operations centers: dark backgrounds, neon-blue glow effects, glassmorphic panels, and subtle grid animations create an immersive command-center experience.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [TanStack Start](https://tanstack.com/start) v1 (React 19, SSR/SSG, file-based routing) |
| Build Tool | Vite 7 |
| Language | TypeScript 5.8 (strict mode) |
| Styling | Tailwind CSS 4 with custom `@theme` tokens |
| Animation | Framer Motion |
| Charts | Recharts |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| UI Primitives | Radix UI (via shadcn/ui components) |
| Runtime | Cloudflare Workers (edge) |

---

## Design System

### Color Palette (OKLCH)

The entire theme is defined in `src/styles.css` using OKLCH color space for perceptually uniform colors:

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `oklch(0.12 0.02 250)` | Page background |
| `--foreground` | `oklch(0.96 0.02 220)` | Primary text |
| `--primary` | `oklch(0.72 0.2 240)` | Neon blue — links, buttons, highlights |
| `--cyan` | `oklch(0.85 0.18 195)` | Accent cyan for gradients |
| `--success` | `oklch(0.78 0.18 160)` | Green — healthy status |
| `--warning` | `oklch(0.82 0.18 80)` | Amber — medium risk |
| `--critical` | `oklch(0.65 0.25 20)` | Red — critical threats |
| `--neon` | `oklch(0.75 0.22 235)` | Glow color for borders and shadows |

### Custom Utilities

| Utility | Description |
|---------|-------------|
| `.glass` | Semi-transparent background with `backdrop-blur(18px)` and subtle border |
| `.glass-strong` | More opaque glass with `backdrop-blur(24px)` for headers and panels |
| `.neon-border` | Cyan border with multi-layered box-shadow glow |
| `.gradient-text` | Gradient text clip from primary to cyan |
| `.grid-bg` | Subtle CSS grid lines for the SOC aesthetic |
| `.scan-line` | Animated vertical scan-line effect |

### Typography

- **Display font**: Orbitron (fallback: Inter) — used for headings, stat numbers, and brand text
- **Body font**: System sans-serif stack via Tailwind
- **Monospace**: Used for IDs, timestamps, and technical values

---

## Features

### 1. Dashboard (`/`)

The main command center displaying:
- **5 Stat Cards**: Total Threats, Critical Threats, GDPR Compliance %, Privacy Risk Score, PET Recommendations — each with animated progress bars and hover lift effects
- **Threat Severity Distribution**: Donut chart breaking down threats by Critical/High/Medium/Low
- **LINDDUN Threat Categories**: Bar chart visualizing the 7-category LINDDUN privacy threat taxonomy
- **GDPR Compliance Posture**: Radar chart scoring 6 GDPR principles
- **Risk vs Mitigation Trend**: 12-month area chart comparing active risk against mitigated risk

### 2. Threat Analysis (`/threat-analysis`)

An interactive assessment form for evaluating healthcare application privacy risk:

- **Application Configuration**: Name and type (EHR, Telehealth, Wearable, Imaging, Pharmacy, Genomics)
- **6 Toggle Switches**:
  - Medical Data Collection (PHI, diagnoses, prescriptions)
  - Biometrics (fingerprint, facial, gait)
  - GPS Tracking (location & geofencing)
  - Encryption Enabled (AES-256 at-rest & in-transit)
  - Consent Collection (GDPR Article 7)
  - Logging Enabled (audit trail & SIEM forwarding)
- **Live Risk Scoring** (0–100): Dynamically calculated based on toggled options
  - Missing encryption: +25 points
  - Missing consent: +20 points
  - Medical data enabled: +18 points
  - Biometrics enabled: +15 points
  - Missing logging: +12 points
  - GPS enabled: +10 points
- **PET Recommendations**: Context-aware suggestions including homomorphic encryption for biometrics, differential privacy for GPS, k-anonymity for datasets

Powered by **React Hook Form** with **Zod** schema validation.

### 3. Threat Matrix (`/threat-matrix`)

A fully interactive threat registry table:

- **Search**: Real-time filtering by threat ID, asset name, or category
- **Severity Filter**: Toggle between All / Critical / High / Medium / Low
- **Sortable Columns**: Click any column header to sort ascending/descending
- **Animated Rows**: Framer Motion staggered entry animations
- **Color-Coded Badges**: Severity and status have distinct neon color schemes
- **Mock Data**: 10 realistic healthcare threats (PatientPortal API, EHR Sync, Telehealth Stream, etc.)

### 4. GDPR Compliance (`/gdpr`)

A compliance monitoring page with:

- **Radar Chart**: Visual score across 6 GDPR principles (Consent, Data Minimization, Encryption, Access Control, Retention, Breach Notification)
- **Principle Scorecard**: Animated progress bars with color-coded status indicators
- Score breakdown:
  - Consent: 94%
  - Encryption: 98%
  - Breach Notification: 92%
  - Access Control: 89%
  - Data Minimization: 86%
  - Retention: 78%

### 5. Reports (`/reports`)

A document management interface:

- **Featured Report Cards**: 3 highlighted downloadable cards with hover lift, gradient glow orbs, and PDF export buttons
- **Report History Table**: Complete list of 6 generated reports with ID, title, type, date, size, and export action
- **PDF Export Simulation**: Client-side blob generation with realistic metadata

### 6. Analytics (`/analytics`)

Deep-dive analytics page with full-size charts:
- Risk vs Mitigation 12-month area chart
- LINDDUN distribution bar chart
- Severity breakdown pie chart

### 7. Settings (`/settings`)

Platform configuration panels:
- Organization details (MediSec Health Network, EU-West, Enterprise tier)
- Security settings (MFA, Session timeout, Audit logging)
- Notification preferences (Critical alerts, Daily digest, Weekly report)

---

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── charts/                 # Recharts visualizations
│   │   │   ├── GdprRadar.tsx       # Radar chart for GDPR principles
│   │   │   ├── LinddunBar.tsx      # Bar chart for LINDDUN categories
│   │   │   ├── RiskTrend.tsx       # Area chart for risk over time
│   │   │   └── SeverityPie.tsx     # Donut chart for threat severity
│   │   ├── layout/                 # Shell components
│   │   │   ├── AppLayout.tsx       # Page wrapper (sidebar + topbar + main)
│   │   │   ├── Sidebar.tsx         # Navigation sidebar with animated indicators
│   │   │   └── TopBar.tsx          # Header with search, notifications, profile
│   │   ├── ui/                     # shadcn/ui primitive components
│   │   ├── Panel.tsx               # Glassmorphic card container with title/subtitle
│   │   ├── StatCard.tsx            # Animated KPI card with progress bar
│   │   ├── ThreatForm.tsx          # Interactive threat assessment form
│   │   └── ThreatTable.tsx         # Sortable/filterable threat registry
│   ├── lib/
│   │   ├── mock-data.ts            # All demo data (stats, threats, reports, chart data)
│   │   ├── utils.ts                # cn() utility for Tailwind class merging
│   │   ├── error-capture.ts        # Error handling utilities
│   │   └── error-page.ts           # Error page helpers
│   ├── routes/                     # TanStack Start file-based routes
│   │   ├── __root.tsx              # Root layout (HTML shell)
│   │   ├── index.tsx               # Dashboard (home)
│   │   ├── threat-analysis.tsx     # Threat analysis form page
│   │   ├── threat-matrix.tsx       # Threat registry table page
│   │   ├── gdpr.tsx                # GDPR compliance page
│   │   ├── reports.tsx             # Reports library page
│   │   ├── analytics.tsx           # Deep analytics page
│   │   └── settings.tsx            # Platform settings page
│   ├── router.tsx                  # TanStack Router configuration
│   ├── server.ts                   # Server entry
│   ├── start.ts                    # Start instance with middleware
│   └── styles.css                  # Global styles, theme tokens, utilities
├── public/                         # Static assets
├── vite.config.ts                  # Vite configuration
├── wrangler.jsonc                  # Cloudflare Workers config
├── tsconfig.json                   # TypeScript configuration
├── package.json
└── README.md
```

---

## Components

### `AppLayout`

```tsx
<AppLayout title="Page Title" subtitle="Page description">
  {children}
</AppLayout>
```

Standard page wrapper providing the sidebar, topbar, and main content area with the grid background.

### `Panel`

```tsx
<Panel title="Chart Title" subtitle="Description">
  <AnyChart />
</Panel>
```

Glassmorphic container with animated entrance, optional title/subtitle header, and a pulsing status dot.

### `StatCard`

```tsx
<StatCard
  label="Total Threats"
  value="1,248"
  delta="+42 last 24h"
  icon={ShieldAlert}
  tone="primary"
  index={0}
/>
```

KPI card with tone-mapped gradient glow, animated progress bar, and Framer Motion hover lift.

### `ThreatForm`

Self-contained form component with live risk calculation and PET recommendation generation. Uses `react-hook-form` + `zodResolver` for validation.

### `ThreatTable`

Fully controlled table with:
- `useMemo` for filtered/sorted data
- `useState` for query, severity filter, and sort state
- Framer Motion row animations
- Responsive horizontal scroll

---

## Routes

| Route | File | Description |
|-------|------|-------------|
| `/` | `src/routes/index.tsx` | Main dashboard with 5 stat cards and 4 charts |
| `/threat-analysis` | `src/routes/threat-analysis.tsx` | Interactive LINDDUN threat assessment form |
| `/threat-matrix` | `src/routes/threat-matrix.tsx` | Searchable, sortable threat registry |
| `/gdpr` | `src/routes/gdpr.tsx` | GDPR compliance radar and scorecard |
| `/reports` | `src/routes/reports.tsx` | Report cards and download history |
| `/analytics` | `src/routes/analytics.tsx` | Full-page chart deep-dive |
| `/settings` | `src/routes/settings.tsx` | Platform configuration |

---

## Charts & Visualizations

All charts use **Recharts** with responsive containers and custom OKLCH-themed styling:

| Chart | Component | Type | Data |
|-------|-----------|------|------|
| Threat Severity | `SeverityPie` | Donut (PieChart) | Critical: 37, High: 124, Medium: 412, Low: 675 |
| LINDDUN Categories | `LinddunBar` | Bar (gradient fill) | 7 privacy threat categories |
| GDPR Posture | `GdprRadar` | Radar | 6 GDPR principle scores |
| Risk Trend | `RiskTrend` | Dual Area (2 series) | 12 months of risk vs mitigated data |

---

## Mock Data

All demo data lives in `src/lib/mock-data.ts`:

```typescript
export const stats = {
  totalThreats: 1248,
  criticalThreats: 37,
  gdprScore: 92,
  privacyRisk: 28,
  petRecs: 14,
};

export const threats: Threat[] = [ /* 10 realistic healthcare threats */ ];
export const reports = [ /* 6 generated reports */ ];
export const severityData = [ /* donut chart data */ ];
export const linddunData = [ /* LINDDUN 7 categories */ ];
export const gdprRadar = [ /* 6 GDPR principles */ ];
export const riskTrend = [ /* 12-month trend */ ];
```

---

## Development

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 20+

### Install Dependencies

```bash
bun install
```

### Start Development Server

```bash
bun run dev
```

The Vite dev server starts at `http://localhost:3000` with hot module replacement.

### Code Quality

```bash
bun run lint      # ESLint
bun run format    # Prettier
```

---

## Build & Deploy

### Production Build

```bash
bun run build
```

Generates an optimized static/SSR bundle for Cloudflare Workers.

### Development Build

```bash
bun run build:dev
```

### Preview

```bash
bun run preview
```

### Deploy (Cloudflare Workers)

This project is configured for Cloudflare Workers via `wrangler.jsonc`. Deploy with:

```bash
npx wrangler deploy
```

---

## Architecture Decisions

### Why TanStack Start?

TanStack Start provides file-based routing, built-in SSR/SSG, and server functions — all within a single Vite-based framework. It eliminates the need for separate Next.js or Remix setups while maintaining type-safe routing.

### Why OKLCH Colors?

OKLCH provides perceptually uniform color space, meaning lightness values actually correspond to perceived brightness. This ensures the dark theme maintains consistent contrast ratios across all hues.

### Why Recharts over D3?

Recharts offers React-native chart composition with far less boilerplate than D3. For a dashboard with standard chart types (pie, bar, radar, area), Recharts provides excellent defaults while remaining fully customizable via SVG primitives.

### Glassmorphism Strategy

Glass effects are achieved through:
1. `backdrop-filter: blur()` for the frosted effect
2. Semi-transparent gradients for depth
3. Subtle borders with low-opacity OKLCH values
4. Inset box-shadows for internal highlight edges

This approach performs well on modern browsers and avoids heavy canvas/WebGL dependencies.

### Form Architecture

The threat analysis form uses a controlled toggle pattern with `react-hook-form`'s `watch()` and `setValue()` for instantaneous UI feedback. Zod schema ensures type safety from form inputs through validation to the risk calculation engine.

---

## License

Private — MediSec Health Network Internal Use

---

<p align="center">
  <sub>Built with <span style="color: oklch(0.72 0.2 240)">&#9670;</span> for healthcare security teams.</sub>
</p>
