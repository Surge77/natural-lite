export interface NavLink {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}

export interface NavItem extends NavLink {
  /** Present only on "Products", which opens a dropdown. */
  readonly children?: readonly NavLink[];
}

export interface FooterColumn {
  readonly id: string;
  readonly heading: string;
  readonly links: readonly NavLink[];
}
