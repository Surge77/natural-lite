import { CountUp, Icon } from '@/components/primitives';
import { cn } from '@/lib/cn';
import type { ImpactStat } from '@/types';

export interface StatItemProps {
  readonly stat: ImpactStat;
  /** Starts the count-up; driven by the band's reveal observer. */
  readonly isActive: boolean;
  readonly className?: string;
}

/** One figure in the maroon "Empowering Women Through Every Pack" band. */
export function StatItem({ stat, isActive, className }: StatItemProps) {
  return (
    <li className={cn('flex items-center gap-3', className)}>
      <Icon name={stat.icon} size={30} className="shrink-0 text-nl-gold-500" />
      <div className="flex flex-col">
        <CountUp
          value={stat.value}
          suffix={stat.suffix}
          isActive={isActive}
          className="font-sans text-stat font-bold text-nl-cream-50 tabular-nums"
        />
        <span className="max-w-[9rem] text-caption leading-tight text-nl-cream-50/80">
          {stat.label}
        </span>
      </div>
    </li>
  );
}
