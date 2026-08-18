import { Inbox, AlertTriangle, Loader2 } from 'lucide-react';

export function LoadingState({ label = 'Loading data…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-[var(--color-text-mute)]">
      <Loader2 size={20} className="animate-spin" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export function EmptyState({ title = 'Nothing here yet', description = 'Try adjusting your filters or search.', icon: Icon = Inbox }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-[var(--color-border)] py-16 text-center">
      <Icon size={22} className="text-[var(--color-text-mute)]" />
      <p className="text-sm font-medium text-[var(--color-text-soft)]">{title}</p>
      <p className="max-w-xs text-xs text-[var(--color-text-mute)]">{description}</p>
    </div>
  );
}

export function ErrorState({ message = 'Something went wrong loading this data.' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-[var(--color-critical)]/40 py-16 text-center">
      <AlertTriangle size={22} className="text-[var(--color-critical)]" />
      <p className="text-sm font-medium text-[var(--color-critical)]">{message}</p>
    </div>
  );
}
