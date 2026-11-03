import { ToolType } from '@/types';

export const SITE_NAME = 'Awesome Apps & Skills';
export const REPO_URL = 'https://github.com/nishkohli96/awesome-apps-and-skills';
export const SEARCH_PLACEHOLDER = 'Search 150+ tools, skills and apps';

/** SVG path data (24x24 stroke icons) taken from the approved design. */
export const ICON = {
  search: 'M11 4a7 7 0 1 0 0 14a7 7 0 1 0 0-14z M20 20l-4-4',
  heart: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z',
  star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',
  menu: 'M4 7h16 M4 12h16 M4 17h16',
  close: 'M6 6l12 12 M18 6L6 18',
  out: 'M7 17L17 7 M8 7h9v9',
  sun: 'M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8z M12 2v2 M12 20v2 M4.9 4.9l1.4 1.4 M17.7 17.7l1.4 1.4 M2 12h2 M20 12h2 M4.9 19.1l1.4-1.4 M17.7 6.3l1.4-1.4',
  moon: 'M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z',
  monitor: 'M3 4h18v12H3z M8 20h8 M12 16v4',
} as const;

interface TypeMeta {
  label: string;
  icon: string;
}

export const TYPE_META: Record<ToolType, TypeMeta> = {
  [ToolType.App]: { label: 'Apps', icon: 'M4 5h16v14H4z M4 9h16' },
  [ToolType.WebTool]: {
    label: 'Web tools',
    icon: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18z M3 12h18 M12 3c3 3.5 3 14.5 0 18 M12 3c-3 3.5-3 14.5 0 18',
  },
  [ToolType.Skill]: { label: 'Skills', icon: 'M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z' },
  [ToolType.Website]: {
    label: 'Websites',
    icon: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1 M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
  },
  [ToolType.McpServer]: { label: 'MCP servers', icon: 'M9 3v5 M15 3v5 M7 8h10v4a5 5 0 0 1-10 0z M12 17v4' },
  [ToolType.Library]: {
    label: 'Libraries',
    icon: 'M8 4c-2 0-3 1-3 3v2c0 1.5-1 2.5-2 3c1 .5 2 1.5 2 3v2c0 2 1 3 3 3 M16 4c2 0 3 1 3 3v2c0 1.5 1 2.5 2 3c-1 .5-2 1.5-2 3v2c0 2-1 3-3 3',
  },
  [ToolType.Guide]: { label: 'Guides', icon: 'M3 5h6a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H3z M21 5h-6a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h7z' },
  // The design does not draw these two; same stroke style as the rest.
  [ToolType.Starter]: { label: 'Starters', icon: 'M13 3L4 14h7l-1 7 9-11h-7z' },
  [ToolType.Plugin]: { label: 'Plugins', icon: 'M4 8h4a2 2 0 1 1 4 0h4v4a2 2 0 1 1 0 4v4H4z' },
};

/** Order of the "Browse by type" strip on the home page. */
export const TYPE_STRIP: ToolType[] = [
  ToolType.Skill,
  ToolType.McpServer,
  ToolType.App,
  ToolType.WebTool,
  ToolType.Library,
  ToolType.Guide,
];
