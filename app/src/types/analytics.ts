/** Event names as they appear in Mixpanel. */
export enum AnalyticsEvent {
  PageView = 'Page View',
  ToolClick = 'Tool Click',
  CategoryClick = 'Category Click',
  TagClick = 'Tag Click',
  Search = 'Search',
  ProfileClick = 'Profile Click',
}

/** Where on the site a tool link was clicked. */
export enum ToolClickSource {
  Card = 'card',
  SearchPanel = 'search-panel',
}

/** Which link a Profile Click came from. */
export enum ProfileLocation {
  Footer = 'footer',
  About = 'about',
  ToolCard = 'tool-card',
}
