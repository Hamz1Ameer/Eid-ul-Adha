import React, { useState, useEffect, useRef } from "react";
import { WISH_PRESETS, THEME_PRESETS } from "./data";
import { WishPreset, ThemePreset } from "./types";
import CardPreview from "./components/CardPreview";
import CardForm from "./components/CardForm";
import {
  Moon,
  Sparkles,
  Heart,
  Gift,
  MessageSquare,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // Master states
  const [to, setTo] = useState("");
  const [from, fromSet] = useState("");
  const [wishId, setWishId] = useState("1");
  const [themeId, setThemeId] = useState("emerald");
  const [customMsg, setCustomMsg] = useState("");
  const [slide1Msg, setSlide1Msg] = useState(
    "As the sacred crescent graces the evening sky, we invite you to open this humble blessing of hope.",
  );
  const [slide3Msg, setSlide3Msg] = useState(
    "May your sacrifices be accepted, and may your heart find absolute tranquillity.",
  );

  // Flow states
  const [didLoadQueryCard, setDidLoadQueryCard] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  const editorRef = useRef<HTMLDivElement>(null);

  // Parse URL Parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get("to");
    const fromParam = params.get("from");
    const wishParam = params.get("wish");
    const themeParam = params.get("theme");
    const msgParam = params.get("msg");
    const s1Param = params.get("s1");
    const s3Param = params.get("s3");

    let hasGreetProps = false;

    if (toParam) {
      setTo(decodeURIComponent(toParam));
      hasGreetProps = true;
    }
    if (fromParam) {
      fromSet(decodeURIComponent(fromParam));
      hasGreetProps = true;
    }
    if (wishParam) {
      if (WISH_PRESETS.some((w) => w.id === wishParam)) {
        setWishId(wishParam);
      } else if (wishParam === "custom") {
        setWishId("custom");
      }
      hasGreetProps = true;
    }
    if (msgParam) {
      setCustomMsg(decodeURIComponent(msgParam));
      setWishId("custom");
      hasGreetProps = true;
    }
    if (s1Param) {
      setSlide1Msg(decodeURIComponent(s1Param));
      hasGreetProps = true;
    }
    if (s3Param) {
      setSlide3Msg(decodeURIComponent(s3Param));
      hasGreetProps = true;
    }
    if (themeParam && THEME_PRESETS.some((t) => t.id === themeParam)) {
      setThemeId(themeParam);
    }

    if (hasGreetProps) {
      setDidLoadQueryCard(true);
      setShowEditor(false); // Focus first on reading the received greeting card!
    } else {
      // If blank landing, populate with visual demo states and load editor immediately
      setTo("Dearest Family");
      fromSet("Salim & Aisha");
      setWishId("1");
      setCustomMsg("");
      setSlide1Msg(
        "As the sacred crescent graces the evening sky, we invite you to open this humble blessing of hope.",
      );
      setSlide3Msg(
        "May your sacrifices be accepted, and may your heart find absolute tranquillity.",
      );
      setThemeId("emerald");
      setDidLoadQueryCard(false);
      setShowEditor(true);
    }
  }, []);

  const handleOpenCreator = () => {
    setShowEditor(true);
    setTimeout(() => {
      editorRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  const activeWish: WishPreset =
    wishId === "custom"
      ? {
          id: "custom",
          title: "Your Custom Blessing",
          text:
            customMsg ||
            "May the divine blessings of Allah bring you hope, faith, and joy on Eid al-Adha and forever.",
          arabic: "تقبل الله منا ومنكم",
        }
      : WISH_PRESETS.find((w) => w.id === wishId) || WISH_PRESETS[0];

  const activeTheme =
    THEME_PRESETS.find((t) => t.id === themeId) || THEME_PRESETS[0];

  return (
    <div className="min-h-screen pattern-bg text-amber-100/90 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* --- TOP FIXED DECORATIVE ATMOSPHERE --- */}
      <div className="absolute top-0 inset-x-0 h-[400px] bg-linear-to-b from-amber-500/5 to-transparent pointer-events-none z-0" />

      {/* --- HEADER --- */}
      <header className="border-b border-amber-900/30 bg-[#022c22]/85 backdrop-blur-md sticky top-0 z-50 py-3.5 px-4 sm:px-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Moon className="w-5 h-5 text-amber-400 fill-amber-400/20" />
              <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1.5 -right-1.5 animate-pulse" />
            </div>
            <span className="font-serif-ornate font-bold text-amber-200 tracking-wider text-sm hidden sm:inline-block">
              Al-Adha 1447
            </span>
            <span className="font-sans font-bold text-amber-200 tracking-wide text-xs sm:hidden">
              Al-Adha 1447
            </span>
          </div>

          <div className="flex items-center gap-2">
            {didLoadQueryCard && !showEditor && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleOpenCreator}
                className="px-4 py-1.5 rounded-full bg-amber-400/10 hover:bg-amber-400/15 border border-amber-400/25 text-amber-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <span>Write a card back</span>
                <Sparkles className="w-3 h-3 text-amber-400" />
              </motion.button>
            )}
            <span className="text-[10px] font-mono text-amber-200/60 tracking-tight select-none bg-emerald-950/40 border border-amber-900/30 py-1 px-2.5 rounded-full">
              10th DHUL HIJJAH 1447
            </span>
          </div>
        </div>
      </header>

      {/* --- MAIN PAGE CONTENT --- */}
      <main className="flex-1 flex flex-col justify-center py-8 px-4 relative z-10">
        <AnimatePresence mode="popLayout">
          {/* FLOW A: RECIPIENT MODE - USER OPENS THE RECEIVED CARD AT TOP HIGHLIGHT */}
          {didLoadQueryCard && !showEditor && (
            <motion.div
              key="recipient-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto w-full flex flex-col items-center gap-8 py-4"
            >
              {/* Little invitation header */}
              <div className="text-center space-y-1">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-amber-400/10 border border-amber-400/20 text-amber-400">
                  A gift for you
                </span>
                <p className="text-xs text-white/50 font-sans mt-1">
                  You have received a beautiful blessing card
                </p>
              </div>

              {/* Card component */}
              <CardPreview
                recipient={to}
                sender={from}
                wish={activeWish}
                theme={activeTheme}
                slide1Msg={slide1Msg}
                slide3Msg={slide3Msg}
                isPreviewMode={false} // Enables envelope sealing reveal
              />

              {/* Elegant scroll down prompt */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={handleOpenCreator}
                className="flex flex-col items-center gap-1.5 text-xs text-amber-400/70 hover:text-amber-400 transition cursor-pointer font-medium mt-2"
              >
                <span>Send back key blessings to family & friends</span>
                <ChevronDown className="w-4 h-4 animate-bounce" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FLOW B: SYSTEM CREATOR - GRID AND CUSTOMIZER */}
        <AnimatePresence>
          {showEditor && (
            <motion.div
              key="creator-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-6xl mx-auto w-full flex flex-col gap-8 md:gap-11"
              ref={editorRef}
            >
              {/* Premium interactive intro */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative text-center max-w-3xl mx-auto pt-2 pb-4"
              >
                {/* Ambient glow */}
                <div className="absolute inset-0 -z-10 blur-3xl bg-amber-400/5 rounded-full" />

                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/20 bg-amber-400/10 backdrop-blur-md"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-300">
                    Eid al-Adha 1447
                  </span>
                  <Gift className="w-3 h-3 text-amber-400" />
                </motion.div>

                {/* Main title */}
                <motion.h1
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-5 text-4xl md:text-6xl leading-[1.1] font-serif-ornate font-bold tracking-tight"
                >
                  <span className="text-amber-50">Craft Beautiful</span>

                  <br />

                  <span className="bg-linear-to-r from-amber-300 via-yellow-200 to-amber-500 bg-clip-text text-transparent">
                    Eid Blessings
                  </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="mt-5 max-w-xl mx-auto text-sm md:text-base leading-relaxed text-white/55"
                >
                  Personalize heartfelt greeting cards with elegant Islamic
                  themes, custom duas, and shareable WhatsApp blessings for your
                  loved ones.
                </motion.p>

                {/* Tiny feature pills */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="mt-6 flex flex-wrap justify-center gap-2"
                >
                  {["Live Preview", "Custom Messages", "WhatsApp Sharing"].map(
                    (item) => (
                      <div
                        key={item}
                        className="px-3 py-1 rounded-full text-[11px] bg-white/[0.03] border border-white/10 text-white/50"
                      >
                        {item}
                      </div>
                    ),
                  )}
                </motion.div>
              </motion.div>
              {/* Responsively Splitting layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Visualizer - Premium 7-column layout on desktop */}
                <div className="col-span-12 lg:col-span-7 lg:sticky lg:top-24 space-y-4 flex flex-col justify-center items-center">
                  <div className="text-center">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-amber-400/80 block">
                      Live Preview Card
                    </span>
                    <p className="text-[11px] text-amber-200/55 font-sans mt-0.5">
                      How your recipients see this blessing in real-time.
                    </p>
                  </div>

                  {/* Card wrapper */}
                  <div className="w-full max-w-md p-1.5 rounded-[40px] bg-emerald-950/20 border border-emerald-800/40 flex items-center justify-center shadow-lg shadow-emerald-950/25">
                    <CardPreview
                      recipient={to}
                      sender={from}
                      wish={activeWish}
                      theme={activeTheme}
                      slide1Msg={slide1Msg}
                      slide3Msg={slide3Msg}
                      isPreviewMode={true} // Stays open for live-editing
                    />
                  </div>
                </div>

                {/* Form configuration column - 5-column layout on desktop */}
                <div className="col-span-12 lg:col-span-5">
                  <CardForm
                    to={to}
                    from={from}
                    wishId={wishId}
                    themeId={themeId}
                    customMsg={customMsg}
                    slide1Msg={slide1Msg}
                    slide3Msg={slide3Msg}
                    onToChange={setTo}
                    onFromChange={fromSet}
                    onWishIdChange={setWishId}
                    onThemeIdChange={setThemeId}
                    onCustomMsgChange={setCustomMsg}
                    onSlide1MsgChange={setSlide1Msg}
                    onSlide3MsgChange={setSlide3Msg}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* --- FOOTER STATEMENT --- */}
      <footer className="border-t border-white/5 bg-black/10 py-6 text-center text-white/30 text-xs">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © 2026 Eid Greetings. Wishing you endless abundance, hope, and joy.
          </p>
          <div className="flex gap-4 items-center">
            <span className="hover:text-amber-400/80 transition flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Share Blessings</span>
            </span>
            <span className="text-white/10">|</span>
            <span className="hover:text-amber-400/80 transition flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
              <span>For Friends & Family</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
