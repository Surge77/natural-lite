import { Icon, ResponsiveImage } from '@/components/primitives';
import { cn } from '@/lib/cn';
import type { JourneyStep as JourneyStepData } from '@/types';

export interface JourneyStepProps {
  readonly step: JourneyStepData;
  readonly index: number;
  readonly total: number;
  readonly className?: string;
}

const IMAGE_SIZES = '(min-width: 80rem) 220px, (min-width: 48rem) 30vw, 72vw';

/** One stage of the five-step "Our Journey of Purity & Purpose" band. */
export function JourneyStep({ step, index, total, className }: JourneyStepProps) {
  return (
    <li className={cn('flex flex-col gap-2', className)}>
      {/* Position is visual only in the comp — stated here so it is not lost. */}
      <span className="sr-only">{`Step ${index + 1} of ${total}`}</span>

      <ResponsiveImage
        image={step.image}
        sizes={IMAGE_SIZES}
        aspectRatio="3 / 2"
        className="w-full rounded-md"
      />

      <div className="flex items-center gap-2">
        <Icon name={step.icon} size={18} className="text-nl-green-800" />
        <h3 className="font-sans text-label font-semibold text-nl-ink-900">{step.title}</h3>
      </div>

      <p className="text-caption leading-relaxed text-nl-ink-500">{step.description}</p>
    </li>
  );
}
