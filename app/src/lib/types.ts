export const TOOL_TYPES = [
  'app',
  'web-tool',
  'skill',
  'website',
  'mcp-server',
  'library',
  'guide',
  'starter',
  'plugin',
] as const;
export type ToolType = (typeof TOOL_TYPES)[number];

export const PRICINGS = ['free', 'freemium', 'paid'] as const;
export type Pricing = (typeof PRICINGS)[number];

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
  isNew: boolean;
}

export interface Category {
  slug: string;
  name: string;
  emoji: string;
  description: string;
  subcategories: string[];
  toolCount: number;
}

export type SortKey = 'az' | 'new' | 'match';

export interface FilterState {
  tags: string[];
  types: ToolType[];
  price: Pricing | 'any';
  sort: SortKey;
}
