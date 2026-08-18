export default function ChartCard({ title, subtitle, action, children, className = '' }) {
  return (
    <div className={`fade-in rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 ${className}`}>
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[var(--color-text)]">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-[var(--color-text-mute)]">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
