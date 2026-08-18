const STYLES = {
  CRITICAL: 'text-[var(--color-critical)] bg-[var(--color-critical)]/10 ring-[var(--color-critical)]/30',
  HIGH: 'text-[var(--color-high)] bg-[var(--color-high)]/10 ring-[var(--color-high)]/30',
  MEDIUM: 'text-[var(--color-medium)] bg-[var(--color-medium)]/10 ring-[var(--color-medium)]/30',
  LOW: 'text-[var(--color-low)] bg-[var(--color-low)]/10 ring-[var(--color-low)]/30',
};

export default function SeverityBadge({ severity }) {
  const cls = STYLES[severity] || STYLES.LOW;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide ring-1 ring-inset mono ${cls}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {severity}
    </span>
  );
}
