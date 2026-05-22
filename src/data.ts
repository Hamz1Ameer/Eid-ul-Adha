import { WishPreset, ThemePreset } from "./types";

export const WISH_PRESETS: WishPreset[] = [
  {
    id: "1",
    title: "Divine Hope & Blessings",
    text: "May the divine blessings of Allah bring you hope, faith, and joy on Eid al-Adha and forever. Wishing you a peaceful and prosperous celebration, filled with abundance and love.",
    arabic: "عيد مبارك سعيد"
  },
  {
    id: "2",
    title: "Accepted Sacrifice & Devotion",
    text: "Wishing you and your family a blessed Eid al-Adha. May your sacrifices be accepted, your prayers answered, and your devotion rewarded with peace and spiritual fulfillment.",
    arabic: "تقبل الله منا ومنكم"
  },
  {
    id: "3",
    title: "Grace & Enlightenment",
    text: "On this sacred occasion, may Allah's grace illuminate your path, bless your home with warmth, and fill your heart with endless contentment. Eid Mubarak to you and your loved ones!",
    arabic: "كل عام وأنتم بخير"
  },
  {
    id: "4",
    title: "Faith, Unity & Gratitude",
    text: "May the noble spirit of sacrifice and sharing teach us gratitude, deepen our faith, and unite our hearts in compassion. Have a blessed and rewarding celebration!",
    arabic: "أضحى مبارك"
  },
  {
    id: "5",
    title: "Joyous Feasts & Togetherness",
    text: "May your home be echoed with laughter, delicious feasts, and the warm presence of loved ones. Wishing you a wonderful, safe, and memorable Eid al-Adha holiday!",
    arabic: "عساكم من عواده"
  }
];

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: "emerald",
    name: "Imperial Emerald",
    bgGradient: "from-[#022c22] via-[#042f2e] to-[#011c15]",
    cardBg: "bg-emerald-950/45 border-emerald-500/20 backdrop-blur-xl",
    borderColor: "border-amber-400/30",
    accentColor: "text-amber-400",
    textColor: "text-amber-100/90",
    badgeBg: "bg-amber-400/10 text-amber-300 border-amber-400/20",
    ornamentColor: "text-amber-400/15"
  },
  {
    id: "sapphire",
    name: "Royal Sapphire",
    bgGradient: "from-[#030712] via-[#0f172a] to-[#090514]",
    cardBg: "bg-slate-950/50 border-cyan-500/20 backdrop-blur-xl",
    borderColor: "border-cyan-400/30",
    accentColor: "text-cyan-400",
    textColor: "text-cyan-100/90",
    badgeBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    ornamentColor: "text-cyan-400/15"
  },
  {
    id: "crimson",
    name: "Majestic Crimson",
    bgGradient: "from-[#1c0a10] via-[#2d0f19] to-[#14050a]",
    cardBg: "bg-rose-950/45 border-orange-500/20 backdrop-blur-xl",
    borderColor: "border-orange-400/30",
    accentColor: "text-amber-500",
    textColor: "text-orange-100/90",
    badgeBg: "bg-orange-500/10 text-orange-300 border-orange-500/20",
    ornamentColor: "text-orange-500/15"
  },
  {
    id: "minimalist",
    name: "Alabaster Gold (Light)",
    bgGradient: "from-[#fdfcf7] via-[#f7f5eb] to-[#eedeb3]/20",
    cardBg: "bg-white/85 border-amber-200 backdrop-blur-lg shadow-amber-900/5",
    borderColor: "border-amber-500/30",
    accentColor: "text-amber-700",
    textColor: "text-amber-950/80",
    badgeBg: "bg-amber-500/10 text-amber-800 border-amber-300/35",
    ornamentColor: "text-amber-800/10"
  }
];
