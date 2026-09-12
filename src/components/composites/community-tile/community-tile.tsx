import { ResponsiveImage } from '@/components/primitives';
import { cn } from '@/lib/cn';
import type { CommunityPost } from '@/types';

export interface CommunityTileProps {
  readonly post: CommunityPost;
  readonly className?: string;
}

/** One square from the Instagram strip. Opens the profile in a new tab. */
export function CommunityTile({ post, className }: CommunityTileProps) {
  return (
    <a
      href={post.href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        'group block overflow-hidden rounded-md',
        'transition-transform duration-(--duration-base) ease-(--ease-brand)',
        'hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none',
        className,
      )}
    >
      <ResponsiveImage
        image={post.image}
        sizes="(min-width: 80rem) 150px, (min-width: 48rem) 24vw, 46vw"
        aspectRatio="1 / 1"
      />
    </a>
  );
}
