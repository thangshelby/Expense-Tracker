export type GlobalThemeType = 'dark' | 'light';

export interface SideNavbarItemType {
  key: string;
  title: string;
  icon: string;
  click: () => void;
}
