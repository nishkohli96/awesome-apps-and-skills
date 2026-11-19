import { ToolType } from '@/types';

interface TypeMeta {
  label: string;
  icon: string;
}

export const TYPE_META: Record<ToolType, TypeMeta> = {
  [ToolType.App]: {
    label: 'Apps',
    icon: 'M4 5h16v14H4z M4 9h16',
  },
  [ToolType.WebTool]: {
    label: 'Web tools',
    icon: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18z M3 12h18 M12 3c3 3.5 3 14.5 0 18 M12 3c-3 3.5-3 14.5 0 18',
  },
  [ToolType.Skill]: {
    label: 'Skills',
    icon: 'M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z',
  },
  [ToolType.Website]: {
    label: 'Websites',
    icon: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1 M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
  },
  [ToolType.McpServer]: {
    label: 'MCP servers',
    icon: 'M9 3v5 M15 3v5 M7 8h10v4a5 5 0 0 1-10 0z M12 17v4',
  },
  [ToolType.Library]: {
    label: 'Libraries',
    icon: 'M8 4c-2 0-3 1-3 3v2c0 1.5-1 2.5-2 3c1 .5 2 1.5 2 3v2c0 2 1 3 3 3 M16 4c2 0 3 1 3 3v2c0 1.5 1 2.5 2 3c-1 .5-2 1.5-2 3v2c0 2-1 3-3 3',
  },
  [ToolType.Guide]: {
    label: 'Guides',
    icon: 'M3 5h6a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H3z M21 5h-6a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h7z',
  },
  // The design does not draw these two; same stroke style as the rest.
  [ToolType.Starter]: {
    label: 'Starters',
    icon: 'M13 3L4 14h7l-1 7 9-11h-7z',
  },
  [ToolType.Plugin]: {
    label: 'Plugins',
    icon: 'M4 8h4a2 2 0 1 1 4 0h4v4a2 2 0 1 1 0 4v4H4z',
  },
  [ToolType.Newsletter]: {
    label: 'Newsletters',
    icon: 'M3 6h18v12H3z M3 7l9 6 9-6',
  },
  [ToolType.VideoChannel]: {
    label: 'Video channels',
    icon: 'M3 6h14v12H3z M17 10l4-2v8l-4-2',
  },
};
