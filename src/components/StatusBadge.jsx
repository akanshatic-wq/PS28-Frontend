const STYLES = {
  OPEN: 'text-[var(--color-critical)] bg-[var(--color-critical)]/10',
  INVESTIGATING: 'text-[var(--color-high)] bg-[var(--color-high)]/10',
  CONTAINED: 'text-[var(--color-brand)] bg-[var(--color-brand)]/10',
  RESOLVED: 'text-[var(--color-ok)] bg-[var(--color-ok)]/10',
  NEW: 'text-[var(--color-critical)] bg-[var(--color-critical)]/10',
  ACKNOWLEDGED: 'text-[var(--color-brand)] bg-[var(--color-brand)]/10',
  'FALSE POSITIVE': 'text-[var(--color-text-mute)] bg-white/5',
  HEALTHY: 'text-[var(--color-ok)] bg-[var(--color-ok)]/10',
  'AT RISK': 'text-[var(--color-high)] bg-[var(--color-high)]/10',
  COMPROMISED: 'text-[var(--color-critical)] bg-[var(--color-critical)]/10',
  OFFLINE: 'text-[var(--color-text-mute)] bg-white/5',
  ACTIVE: 'text-[var(--color-critical)] bg-[var(--color-critical)]/10',
  MONITORING: 'text-[var(--color-high)] bg-[var(--color-high)]/10',
  MITIGATED: 'text-[var(--color-ok)] bg-[var(--color-ok)]/10',
  EXPIRED: 'text-[var(--color-text-mute)] bg-white/5',
  PENDING: 'text-[var(--color-high)] bg-[var(--color-high)]/10',
  'IN PROGRESS': 'text-[var(--color-brand)] bg-[var(--color-brand)]/10',
  COMPLETED: 'text-[var(--color-ok)] bg-[var(--color-ok)]/10',
};

export default function StatusBadge({ status }) {
  const cls = STYLES[status] || 'text-[var(--color-text-soft)] bg-white/5';
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium mono ${cls}`}>
      {status}
    </span>
  );
}
