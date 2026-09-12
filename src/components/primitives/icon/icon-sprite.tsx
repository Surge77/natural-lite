import { ContactSymbols } from './symbols/contact-symbols';
import { JourneySymbols } from './symbols/journey-symbols';
import { TrustSymbols } from './symbols/trust-symbols';
import { UiSymbols } from './symbols/ui-symbols';

/**
 * Every icon definition, mounted once at the app root.
 *
 * Inlined rather than served as an external SVG because `<use href="file.svg#id">`
 * across documents is still unreliable in Safari. One inline sprite gives the
 * same single-definition benefit with no fetch and no polyfill.
 *
 * Stroke defaults live on the referencing <svg> in `Icon`, not here: a <use>
 * instance inherits from its own ancestors, not from the symbol's.
 */
export function IconSprite() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
    >
      <UiSymbols />
      <TrustSymbols />
      <JourneySymbols />
      <ContactSymbols />
    </svg>
  );
}
