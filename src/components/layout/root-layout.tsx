import type { ReactNode } from 'react';

import { IconSprite, SkipLink } from '@/components/primitives';
import { AnnouncementBar, SiteFooter, SiteHeader } from '@/components/sections';

const MAIN_ID = 'main-content';

/** Page chrome shared by every route: sprite, skip link, header, footer. */
export function RootLayout({ children }: { readonly children: ReactNode }) {
  return (
    <>
      <IconSprite />
      <SkipLink targetId={MAIN_ID} />
      <AnnouncementBar />
      <SiteHeader />
      <main id={MAIN_ID}>{children}</main>
      <SiteFooter />
    </>
  );
}
