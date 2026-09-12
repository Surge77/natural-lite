import { Container, Icon } from '@/components/primitives';
import { FooterColumn, Logo, PaymentMethods, SocialLinks } from '@/components/composites';
import {
  BRAND,
  CONTACT_ICONS,
  CONTACT_LINKS,
  FOOTER_COLUMNS,
} from '@/data';

/**
 * The dark green footer: brand block, three link columns, contact details, and
 * the copyright bar.
 *
 * Link columns are <details> accordions on phones and open columns from `md`,
 * which keeps the footer from becoming a very long list on a small screen.
 */
export function SiteFooter() {
  return (
    <footer className="bg-nl-green-900 text-nl-cream-50">
      <Container className="py-4 md:py-5">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          <div className="flex flex-col items-start gap-3 lg:col-span-1">
            <Logo tone="onDark" stackedTagline />
            <SocialLinks />
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <FooterColumn key={column.id} column={column} />
          ))}

          <div className="border-b border-nl-cream-50/12 pb-3 md:border-0 md:pb-0">
            <h2 className="text-label font-semibold text-nl-cream-50">Contact</h2>
            <span aria-hidden="true" className="mt-1 block h-px w-7 bg-nl-gold-500" />
            <ul className="mt-2 flex flex-col gap-1.5">
              {CONTACT_LINKS.map((link, index) => (
                <li key={link.id} className="flex items-start gap-2">
                  <Icon
                    name={CONTACT_ICONS[index] ?? 'pin'}
                    size={15}
                    className="mt-0.5 shrink-0 text-nl-gold-500"
                  />
                  {link.href === '#' ? (
                    <span className="text-caption text-nl-cream-50/75">{link.label}</span>
                  ) : (
                    <a
                      href={link.href}
                      className="text-caption text-nl-cream-50/75 transition-colors hover:text-nl-cream-50"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-nl-cream-50/12">
        <Container className="flex flex-col items-center gap-2 py-3 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-caption text-nl-cream-50/60">
            {`© ${BRAND.copyrightYear} ${BRAND.name}. All Rights Reserved.`}
          </p>

          <p className="flex items-center gap-2 text-caption text-nl-cream-50/80">
            <Icon name="leaf" size={12} className="text-nl-gold-500" />
            {BRAND.footerTagline}
            <Icon name="leaf" size={12} className="scale-x-[-1] text-nl-gold-500" />
          </p>

          <PaymentMethods />
        </Container>
      </div>
    </footer>
  );
}
