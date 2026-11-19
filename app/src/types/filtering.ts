export enum SortKey {
  AZ = 'az',
  Newest = 'new',
  Match = 'match',
}

/** The "no price filter" choice, next to the real `Pricing` values. */
export enum PriceFilter {
  Any = 'any',
}

/** What the search dropdown shows for the current query. */
export enum SearchPanelState {
  Empty = 'empty',
  Results = 'results',
  None = 'none',
}

export enum SearchVariant {
  Appbar = 'appbar',
  Hero = 'hero',
}

export enum GroupBy {
  Subcategory = 'subcategory',
  Category = 'category',
}
