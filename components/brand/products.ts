import type { LucideIcon } from 'lucide-react';
import { LifeBuoy } from 'lucide-react';

/**
 * Canonical MenuWright identity — name, accent color, and docs path prefix.
 * The accent hex is the single source of truth for product-identity color in
 * the chrome (nav, nameplate, diagrams).
 */
export interface ProductIdentity {
  name: string;
  /**
   * Product accent hex — identity, not interaction. Must be a 6-digit hex
   * (e.g. "#5D3EFB"): consumers append alpha digits (`${accent}40`), so a
   * 3-digit hex would produce invalid CSS.
   */
  accent: string;
  icon: LucideIcon;
  /** Destination intent for product navigation. */
  destination: 'product-site' | 'docs';
  /** Marketing site or internal documentation destination. */
  href: string;
  /** Docs path prefix that marks this product active. */
  match: string;
}

export const PRODUCTS: ProductIdentity[] = [
  { name: 'DontDieFishing', accent: '#1A3A5C', icon: LifeBuoy, destination: 'product-site', href: 'https://dontdiefishing.com', match: '/dontdiefishing' },
];

/**
 * Accent hex for a MenuWright reference, tolerant of casing and surrounding
 * whitespace. Returns undefined for non-product tags, which callers render
 * neutral.
 */
export function productAccent(tag: string): string | undefined {
  const wanted = tag.trim().toLowerCase();
  return PRODUCTS.find((product) => product.name.toLowerCase() === wanted)?.accent;
}
