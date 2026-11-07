import type { PriceFilter, Pricing, SortKey, ToolType } from '@/types';

export interface Author {
  /** Git author name. */
  name: string;
  /** GitHub handle, when it could be worked out from the commit email. */
  login: string | null;
}

export interface Tool {
  slug: string;
  name: string;
  url: string;
  type: ToolType;
  /** Category slug, e.g. `media`. */
  category: string;
  subcategory: string;
  description: string;
  tags: string[];
  pricing: Pricing | null;
  /** ISO date the tool was added, when git history knows it. */
  addedAt: string | null;
  /** Who first committed the entry, when git history knows it. */
  addedBy: Author | null;
  isNew: boolean;
}

export interface Category {
  slug: string;
  name: string;
  emoji: string;
  description: string;
  subcategories: string[];
  toolCount: number;
  /** Last commit that touched the category file (UTC ISO), null without git. */
  updatedAt: string | null;
}

export interface FilterState {
  tags: string[];
  types: ToolType[];
  price: Pricing | PriceFilter;
  sort: SortKey;
}
