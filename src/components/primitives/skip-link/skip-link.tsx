export interface SkipLinkProps {
  /** id of the <main> landmark this jumps to. */
  readonly targetId: string;
}

/**
 * First focusable element on the page. Hidden until focused, then pinned to the
 * top-left so keyboard users can bypass the header on a very long homepage.
 */
export function SkipLink({ targetId }: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-[100] focus-visible:rounded-md focus-visible:bg-nl-green-900 focus-visible:px-4 focus-visible:py-2.5 focus-visible:text-label focus-visible:font-medium focus-visible:text-nl-cream-50"
    >
      Skip to main content
    </a>
  );
}
