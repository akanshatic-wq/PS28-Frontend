export default function KpiCard({ icon: Icon, label, value, delta, deltaLabel, tone = 'default', suffix }) {
  const toneColor = {
    default: 'text-[var(--color-text)]',
    critical: 'text-[var(--color-critical)]',
    high: 'text-[var(--color-high)]',
    ok: 'text-[var(--color-ok)]',
    brand: 'text-[var(--color-brand)]',
  }[tone];

  return (
    <div className="fade-in rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 transition-colors hover:border-[var(--color-border)]/80 hover:bg-[var(--color-panel-hover)]">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-mute)]">{label}</span>
        {Icon && <Icon size={16} className="text-[var(--color-text-mute)]" strokeWidth={1.75} />}
      </div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className={`mono text-2xl font-bold ${toneColor}`}>{value}</span>
        {suffix && <span className="text-sm text-[var(--color-text-mute)]">{suffix}</span>}
      </div>
      {(delta || deltaLabel) && (
        <div className="mt-1.5 flex items-center gap-1 text-xs">
          {delta && (
            <span className={delta.startsWith('+') ? 'text-[var(--color-ok)]' : 'text-[var(--color-text-soft)]'}>
              {delta}
            </span>
          )}
          {deltaLabel && <span className="text-[var(--color-text-mute)]">{deltaLabel}</span>}
        </div>
      )}
    </div>
  );
}
