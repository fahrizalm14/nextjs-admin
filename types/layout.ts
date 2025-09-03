// Struktur menu
export interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  children?: MenuItem[];
}
