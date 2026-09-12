import { ButtonLink, OrnamentDivider, SealBadge } from '@/components/primitives';
import { TrustItem } from '@/components/composites';
import { HERO, HERO_MOBILE_SCENE, HERO_SCENE, TRUST_MARKS } from '@/data';

const HEADING_ID = 'hero-heading';

function BrandStatement({ mobile = false }: { readonly mobile?: boolean }) {
  return (
    <div
      className={
        mobile
          ? 'mt-4 border-l-2 border-nl-gold-500 pl-3 lg:hidden'
          : 'absolute top-[15%] right-[5%] hidden max-w-[13rem] flex-col items-center text-center lg:flex'
      }
    >
      {mobile ? null : <SealBadge size={88} />}
      <p className={mobile ? 'text-label font-semibold leading-relaxed text-nl-green-900' : 'mt-2 font-display text-[1.2rem] leading-relaxed font-semibold text-nl-green-950'}>
        {HERO.statement.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>
      {mobile ? null : <OrnamentDivider width={112} className="mt-2" />}
    </div>
  );
}

/**
 * The opening band.
 *
 * Copy on the left over the cream ground; everything to its right is one
 * photograph, exactly as composed in the comp — the woman, the five pouches,
 * the produce, the counter, the gold seal and the brand statement all belong to
 * that single scene rather than being separate elements.
 *
 * The two columns split the band 38/62 as the comp does, and the copy is inset
 * with `--nl-container-inset` so its left edge matches every heading further
 * down the page. Both are percentages of this band, never `vw`: viewport units
 * include the scrollbar, which is what previously shifted the copy right.
 *
 * The scene is the LCP element, so it is the one image on the page marked
 * `priority`.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby={HEADING_ID}
      className="relative scroll-mt-32 overflow-hidden bg-nl-cream-300"
    >
      {/* Matches the photograph's own ground so the two meet without a seam. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,#fbf4e9_0%,#f7efe2_42%,#f3ebdd_100%)]"
      />

      <div className="relative flex flex-col lg:flex-row lg:items-center">
        {/*
          Left padding mirrors Container's gutter so the headline lines up with
          every heading further down the page.
        */}
        <div className="px-(--nl-gutter) pt-5 pb-4 lg:w-[38%] lg:shrink-0 lg:py-6 lg:pr-4 lg:pl-(--nl-container-inset)">
          <h1 id={HEADING_ID} className="max-w-[15ch] text-display-xl">
            <span className="block text-nl-green-900">{HERO.headlineLeading}</span>{' '}
            <span className="block text-nl-maroon-700">{HERO.headlineTrailing}</span>
          </h1>

          <p className="mt-2.5 text-body text-nl-ink-700">{HERO.subheading}</p>
          <OrnamentDivider width={140} className="mt-2.5" />
          <BrandStatement mobile />

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="#products" trailingIcon="cart">
              {HERO.primaryCta}
            </ButtonLink>
            <ButtonLink href="#brand-story" variant="outline" trailingIcon="play">
              {HERO.secondaryCta}
            </ButtonLink>
          </div>

          <ul className="mt-5 grid grid-cols-3 gap-x-1 gap-y-4 sm:grid-cols-5">
            {TRUST_MARKS.map((mark) => (
              <TrustItem key={mark.id} item={mark} size="sm" />
            ))}
          </ul>
        </div>

        <div className="relative lg:w-[62%] lg:shrink-0">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f3ebdd] lg:aspect-[1457/1079] lg:[mask-image:linear-gradient(to_right,transparent,#000_7%,#000_100%)]">
            <picture>
              {HERO_MOBILE_SCENE.sources?.map((source) => (
                <source
                  key={`mobile-${source.type}`}
                  media="(max-width: 63.99rem)"
                  type={source.type}
                  srcSet={source.srcSet}
                />
              ))}
              {HERO_SCENE.sources?.map((source) => (
                <source key={source.type} type={source.type} srcSet={source.srcSet} />
              ))}
              <img
                src={HERO_SCENE.src}
                alt={HERO_SCENE.alt}
                width={HERO_SCENE.width}
                height={HERO_SCENE.height}
                sizes="(min-width: 64rem) 62vw, 100vw"
                loading="eager"
                decoding="sync"
                fetchPriority="high"
                className="size-full object-cover"
              />
            </picture>
          </div>
          <BrandStatement />
        </div>
      </div>
    </section>
  );
}
