type BadgeProps = {
  label: string;
  className?: string;
};

export function Badge({ label, className }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide ${className ?? ""}`}
    >
      {label}
    </span>
  );
}
