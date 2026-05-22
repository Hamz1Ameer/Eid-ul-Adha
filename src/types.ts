export interface GreetingData {
  to: string;
  from: string;
  wishId: string;
  themeId: string;
}

export interface WishPreset {
  id: string;
  title: string;
  text: string;
  arabic?: string; // Optional elegant Arabic phrase for visual flair
}

export interface ThemePreset {
  id: string;
  name: string;
  bgGradient: string; // Tailwind class
  cardBg: string; // Tailwind class for glassmorphism
  borderColor: string;
  accentColor: string; // For highlights
  textColor: string;
  badgeBg: string;
  ornamentColor: string;
}
