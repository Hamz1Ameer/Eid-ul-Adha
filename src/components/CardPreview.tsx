import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WishPreset, ThemePreset } from "../types";
import { MailOpen, RefreshCw, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

interface CardPreviewProps {
  recipient: string;
  sender: string;
  wish: WishPreset;
  theme: ThemePreset;
  slide1Msg?: string;
  slide3Msg?: string;
  isPreviewMode?: boolean; // If true, disables envelope so they can see updates live
}

export default function CardPreview({
  recipient,
  sender,
  wish,
  theme,
  slide1Msg = "As the sacred crescent graces the evening sky, we invite you to open this humble blessing of hope.",
  slide3Msg = "May your sacrifices be accepted, and may your heart find absolute tranquillity.",
  isPreviewMode = false,
}: CardPreviewProps) {
  const [isOpen, setIsOpen] = useState(isPreviewMode);
  const [activeSlide, setActiveSlide] = useState(0);
  const [revealedPrayers, setRevealedPrayers] = useState<Record<number, boolean>>({});

  // When preview props change, if it is in editor mode, keep open.
  React.useEffect(() => {
    if (isPreviewMode) {
      setIsOpen(true);
    }
  }, [isPreviewMode]);

  // Is Light Theme check to adjust soft text contrasts
  const isLight = theme.id === "minimalist";

  // Decorative Lantern SVG
  const Lantern = ({ delay = 0, className = "" }) => (
    <motion.div
      initial={{ rotate: -5 }}
      animate={{ rotate: 5 }}
      transition={{
        repeat: Infinity,
        repeatType: "mirror",
        duration: 3.5,
        ease: "easeInOut",
        delay,
      }}
      className={`origin-top flex flex-col items-center ${className}`}
    >
      {/* Lantern String */}
      <div className={`w-0.5 h-16 ${isLight ? "bg-amber-600/30" : "bg-amber-400/20"}`} />
      {/* Lantern Cap */}
      <svg viewBox="0 0 100 120" className={`w-10 h-12 fill-current ${theme.accentColor} filter drop-shadow`}>
        {/* Top loop */}
        <circle cx="50" cy="15" r="10" fill="none" stroke="currentColor" strokeWidth="6" />
        {/* Dome */}
        <path d="M20,60 C20,35 50,25 50,25 C50,25 80,35 80,60" stroke="currentColor" strokeWidth="3" />
        {/* Glass body */}
        <path d="M20,60 L25,100 L75,100 L80,60 Z" />
        {/* Ornaments */}
        <line x1="50" y1="25" x2="50" y2="100" stroke={isLight ? "#b45309" : "#fef08a"} strokeWidth="2" opacity="0.4" />
        <line x1="35" y1="65" x2="35" y2="95" stroke={isLight ? "#b45309" : "#fef08a"} strokeWidth="1" opacity="0.3" />
        <line x1="65" y1="65" x2="65" y2="95" stroke={isLight ? "#b45309" : "#fef08a"} strokeWidth="1" opacity="0.3" />
        {/* Base */}
        <rect x="15" y="100" width="70" height="10" rx="3" />
      </svg>
      {/* Light glow (only for dark themes) */}
      {!isLight && (
        <div className="w-4 h-4 rounded-full bg-amber-400 blur-md -mt-6 animate-pulse" />
      )}
    </motion.div>
  );

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[3/4.4] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* --- 1. ENVELOPE / SEALED CARD VIEW --- */
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9, transition: { duration: 0.6, ease: "easeIn" } }}
            className={`w-full h-full rounded-[36px] p-8 flex flex-col justify-between items-center text-center shadow-2xl relative overflow-hidden bg-gradient-to-br ${theme.bgGradient} border border-amber-500/20`}
            id="eid-greeting-envelope"
          >
            {/* Islamic Lattice background */}
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay">
              <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="lattice-env" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                    <circle cx="20" cy="20" r="3" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#lattice-env)" className={theme.accentColor} />
              </svg>
            </div>

            {/* Glowing lantern strings in the top corners */}
            <div className="absolute top-0 left-12"><Lantern delay={0.2} /></div>
            <div className="absolute top-0 right-12"><Lantern delay={0.8} /></div>

            {/* Middle Greeting Message Placeholder */}
            <div className="my-auto py-12 flex flex-col items-center gap-6 z-10 w-full">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: [0.95, 1.05, 0.95], opacity: 1 }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className={`w-20 h-20 rounded-full flex items-center justify-center ${
                  isLight ? "bg-amber-100 text-amber-800" : "bg-amber-400/10 text-amber-300"
                } border border-amber-400/30 shadow-[0_0_20px_rgba(245,158,11,0.2)]`}
              >
                <svg viewBox="0 0 100 100" className="w-12 h-12 fill-current">
                  <path d="M50,10 A40,40 0 1,0 90,50 A30,30 0 1,1 50,10 Z" />
                </svg>
              </motion.div>

              <div className="space-y-2">
                <h3 className={`text-xs uppercase tracking-widest ${isLight ? "text-amber-800" : "text-amber-400"} font-bold font-sans`}>
                  Blessed Greeting
                </h3>
                <h2 className="text-3xl font-bold font-display tracking-tight text-white drop-shadow-md">
                  Peace Be Upon You
                </h2>
                {recipient && (
                  <p className={`text-sm mt-4 max-w-xs mx-auto ${isLight ? "text-amber-950/70" : "text-amber-200/80"} font-sans leading-relaxed`}>
                    Dear <span className="font-semibold text-amber-300">{recipient}</span>, a personalized 3-part greeting has been created for you.
                  </p>
                )}
              </div>

              {/* Wax Seal - Click to Open Button */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className={`mt-6 px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 cursor-pointer z-20 ${
                  isLight
                    ? "bg-amber-800 text-white hover:bg-amber-900"
                    : "bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 hover:from-amber-300 hover:to-amber-400"
                }`}
                id="open-card-btn"
              >
                <MailOpen className="w-5 h-5 animate-pulse" />
                <span>Open Blessing</span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-200 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                </span>
              </motion.button>
            </div>

            <p className={`text-[10px] ${isLight ? "text-amber-900/40" : "text-white/30"} uppercase tracking-wider`}>
              Made with heart by friends & family
            </p>
          </motion.div>
        ) : (
          /* --- 2. THE ACTUAL REVEALED CARD VIEW (MULTIPLE STEP GREETING) --- */
          <motion.div
            key="revealed-card"
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`w-full h-full rounded-[36px] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden bg-gradient-to-b ${theme.bgGradient} border-2 ${theme.borderColor}`}
            id="eid-greeting-card"
          >
            {/* Elegant Islamic Arch Overlay */}
            <div className="absolute inset-4 border border-amber-400/20 rounded-3xl pointer-events-none" />

            {/* Glowing lanterns & Moon ornament */}
            <div className="absolute top-0 left-6"><Lantern delay={0} /></div>
            <div className="absolute top-0 right-6"><Lantern delay={0.6} /></div>

            {/* Ambient Sparkle Particles */}
            <div className="absolute top-20 inset-x-8 flex justify-between pointer-events-none opacity-40">
              <svg className="w-4 h-4 fill-current text-amber-300 animate-pulse" viewBox="0 0 24 24">
                <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
              </svg>
              <svg className="w-5 h-5 fill-current text-yellow-300 animate-pulse delay-500" viewBox="0 0 24 24" style={{ animationDelay: '0.4s' }}>
                <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
              </svg>
            </div>

            {/* Main Interactive Slide Content Panel with AnimatePresence transition */}
            <div className="flex-1 flex flex-col justify-center min-h-0 z-10 py-5">
              <AnimatePresence mode="wait">
                {activeSlide === 0 && (
                  <motion.div
                    key="welcome-intro-slide"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.22 }}
                    className="flex-1 flex flex-col justify-between text-center items-center py-2"
                  >
                    <div>
                      <span className={`text-[9px] uppercase tracking-widest ${isLight ? "text-amber-800/80" : "text-amber-400/80"} font-black`}>
                        Message Slide 1 of 3
                      </span>
                      <h3 className={`text-xl sm:text-2xl font-serif font-bold mt-1 tracking-wide ${isLight ? "text-amber-900" : "text-amber-200"}`}>
                        Sacred Invitation
                      </h3>
                      <div className="text-[10px] text-amber-500 font-serif opacity-80 mt-0.5">
                        أهلاً وسهلاً
                      </div>
                    </div>

                    {/* Majestic golden crescent moon and stars */}
                    <div className="my-auto py-2">
                      <motion.div
                        animate={{ y: [-4, 4, -4], rotate: [-1, 2, -1] }}
                        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                        className="relative"
                      >
                        <svg viewBox="0 0 100 100" className={`w-20 h-20 mx-auto fill-current ${theme.accentColor} drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]`}>
                          <path d="M52,15 A35,35 0 1,0 87,50 A26,26 0 1,1 52,15 Z" />
                          <circle cx="68" cy="30" r="3" className="fill-yellow-300 animate-ping" />
                          <polygon points="68,28 70,30 74,30 71,32 72,36 68,34 64,36 65,32 62,30 66,30" className="fill-current text-amber-300 animate-pulse" />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Message Box */}
                    <div className="space-y-4 max-w-xs sm:max-w-md">
                      {recipient && (
                        <p className={`text-xs font-semibold uppercase tracking-wider ${isLight ? "text-amber-900" : "text-amber-300"}`}>
                          To: <span className="underline decoration-amber-400 decoration-2">{recipient}</span>
                        </p>
                      )}
                      <p className={`text-[13px] sm:text-sm leading-relaxed px-4 italic font-sans ${isLight ? "text-amber-950/80" : "text-emerald-100/90"}`}>
                        "{slide1Msg}"
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeSlide === 1 && (
                  <motion.div
                    key="central-blessing-slide"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.22 }}
                    className="flex-1 flex flex-col justify-between text-center items-center py-2"
                  >
                    <div>
                      <span className={`text-[9px] uppercase tracking-widest ${isLight ? "text-amber-800/80" : "text-amber-400/80"} font-black`}>
                        Message Slide 2 of 3
                      </span>
                      {wish.arabic && (
                        <div className={`text-lg sm:text-xl font-serif mt-1 tracking-widest opacity-80 ${isLight ? "text-amber-800" : "text-amber-300"}`}>
                          {wish.arabic}
                        </div>
                      )}
                    </div>

                    {/* Premium Sacrificial Ram / Sheep Animation */}
                    <div className="my-auto py-2 flex flex-col items-center">
                      <motion.div
                        animate={{ y: [-2, 2, -2], scaleY: [1.02, 0.98, 1.02] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="relative"
                      >
                        <svg viewBox="0 0 80 80" className="w-16 h-16 mx-auto">
                          {/* Fluffy body */}
                          <path
                            d="M 28,40 C 26,40 24.5,38.5 24.5,36.5 C 24.5,35 25.5,33.5 27,33 C 25.5,31 26,28.5 28,27 C 30,25.5 32.5,26 34,27.5 C 36,25.5 39,25.5 41,27.5 C 42.5,26 45,25.5 47,27 C 49,28.5 49.5,31 48,33 C 49.5,33.5 50.5,35 50.5,36.5 C 50.5,38.5 49,40 47,40 Q 48,44 46,47 C 44,50 40,51 37.5,49 Q 35,51 31,50 C 27,49 26.5,45 28,40 Z"
                            fill={isLight ? "#fbfbf8" : "#f0fdf4"}
                            stroke={isLight ? "#e5e5db" : "#a7f3d0"}
                            strokeWidth="1.5"
                          />
                          {/* Curly horns */}
                          <path d="M 31,23 C 27,21 23,24 25,27 L 27.5,26" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
                          <path d="M 44,23 C 48,21 52,24 50,27 L 47.5,26" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
                          <rect x="33.5" y="27" width="11" height="13" rx="4" fill={isLight ? "#1e293b" : "#022c22"} />
                          <circle cx="36" cy="32" r="1.2" fill="#fff" />
                          <circle cx="42" cy="32" r="1.2" fill="#fff" />
                          <path d="M 34,26 C 36,24.5 39,24.5 41,26 C 42.5,26.5 43,28 42,29 C 41,30 34,30 33,29 C 32,28 32.5,26.5 34,26 Z" fill={isLight ? "#fbfbf8" : "#f0fdf4"} />
                          <ellipse cx="37.5" cy="55" rx="10" ry="1.5" fill="black" opacity="0.12" />
                        </svg>
                      </motion.div>
                      <span className={`text-[8px] uppercase tracking-widest ${isLight ? "text-amber-800/40" : "text-amber-100/40"} font-mono`}>
                        Eid Sacrifice motif
                      </span>
                    </div>

                    <div className="space-y-3.5 max-w-xs sm:max-w-md">
                      <h1 className={`text-2xl font-bold font-display ${isLight ? "text-amber-900" : "text-amber-200"} tracking-tight`}>
                        Al-Adha Mubarak
                      </h1>
                      <p className={`text-[13px] sm:text-sm leading-relaxed px-4 italic font-sans ${isLight ? "text-amber-950/80" : "text-emerald-100/90"}`}>
                        "{wish.text}"
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeSlide === 2 && (
                  <motion.div
                    key="duas-closing-slide"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.22 }}
                    className="flex-1 flex flex-col justify-between text-center items-center py-2"
                  >
                    <div>
                      <span className={`text-[9px] uppercase tracking-widest ${isLight ? "text-amber-800/80" : "text-amber-400/80"} font-black`}>
                        Message Slide 3 of 3
                      </span>
                      <h3 className={`text-xl font-serif font-bold mt-1 tracking-wide ${isLight ? "text-amber-900" : "text-amber-200"}`}>
                        Sacred Devotions
                      </h3>
                      <div className="text-[10px] text-amber-500 font-serif opacity-80 mt-0.5">
                        تقبل الله دعاءكم
                      </div>
                    </div>

                    {/* Interactive prayer list widgets */}
                    <div className="w-full max-w-[280px] sm:max-w-xs space-y-1.5 py-2">
                      <p className={`text-[9px] uppercase tracking-widest ${isLight ? "text-stone-400" : "text-emerald-400/60"} mb-1`}>
                        Recipient interactive du'as (Tap to reveal):
                      </p>
                      {[
                        { id: 1, icon: "🕌", label: "Barakah & Serenity", desc: "May your home always find divine stillness and peaceful heartbeats." },
                        { id: 2, icon: "💖", label: "Accepted Good Deeds", desc: "May all your sacrifices, prayers, and charities be highly rewarded." },
                        { id: 3, icon: "🌟", label: "Endless Health", desc: "May physical strength and absolute content walk with you on all paths." }
                      ].map((p) => {
                        const isRevealed = !!revealedPrayers[p.id];
                        return (
                          <motion.button
                            key={p.id}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            type="button"
                            onClick={() => {
                              setRevealedPrayers(prev => ({ ...prev, [p.id]: !prev[p.id] }));
                            }}
                            className={`w-full text-left p-2 rounded-xl border text-[11px] transition-all relative overflow-hidden flex items-start gap-2 cursor-pointer select-none ${
                              isRevealed
                                ? "border-amber-400 bg-amber-400/10 text-amber-200 shadow-sm"
                                : "border-emerald-800/30 bg-emerald-900/10 text-emerald-100/60 hover:bg-emerald-900/20"
                            }`}
                          >
                            <span className="text-xs">{p.icon}</span>
                            <div className="flex-1 text-left leading-tight">
                              <p className={`font-bold text-[11px] ${isRevealed ? "text-amber-300" : "text-emerald-100/85"}`}>
                                {p.label}
                              </p>
                              <AnimatePresence>
                                {isRevealed && (
                                  <motion.p
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 0.9 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="text-[10px] mt-1 text-emerald-100/90 italic leading-snug"
                                  >
                                    "{p.desc}"
                                  </motion.p>
                                )}
                              </AnimatePresence>
                            </div>
                            <span className={`text-[9px] text-amber-400 font-bold self-start`}>
                              {isRevealed ? "✓" : "Reveal"}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Closing statement text */}
                    <div className="space-y-3 px-2 max-w-xs sm:max-w-md">
                      <p className={`text-[12px] sm:text-xs leading-relaxed italic font-sans ${isLight ? "text-amber-950/80" : "text-emerald-100/90"}`}>
                        "{slide3Msg}"
                      </p>

                      {sender && (
                        <div className={`pt-2 border-t ${isLight ? "border-amber-200/50" : "border-amber-400/10"}`}>
                          <span className={`text-[9px] uppercase tracking-wider ${isLight ? "text-amber-950/50" : "text-emerald-300/50"} block`}>
                            With love & prayers from
                          </span>
                          <p className={`text-xs font-bold ${isLight ? "text-amber-800" : "text-amber-300"} font-serif mt-0.5`}>
                            {sender}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* --- SLIDE PROGRESSION CONTROLS BAR --- */}
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-amber-400/15 z-10 relative">
              <button
                type="button"
                disabled={activeSlide === 0}
                onClick={() => setActiveSlide((prev) => prev - 1)}
                className={`text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg border font-bold transition flex items-center gap-1 cursor-pointer select-none ${
                  activeSlide === 0
                    ? "opacity-20 cursor-not-allowed border-transparent text-gray-500"
                    : isLight
                    ? "border-amber-700/20 text-amber-800 hover:bg-amber-500/10"
                    : "border-amber-400/20 text-amber-300 hover:bg-amber-400/10"
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              {/* Dot Indicators */}
              <div className="flex gap-2">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeSlide === idx
                        ? isLight
                          ? "bg-amber-700 w-5"
                          : "bg-amber-400 w-5 shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                        : isLight
                        ? "bg-stone-300"
                        : "bg-emerald-900/80 border border-emerald-700/50"
                    }`}
                  />
                ))}
              </div>

              {activeSlide < 2 ? (
                <button
                  type="button"
                  onClick={() => setActiveSlide((prev) => prev + 1)}
                  className={`text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg border font-bold transition flex items-center gap-1 cursor-pointer select-none ${
                    isLight
                      ? "border-amber-700/20 bg-amber-700 text-white hover:bg-amber-850"
                      : "border-amber-400/25 bg-amber-400 text-emerald-950 hover:bg-amber-300"
                  }`}
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveSlide(0)}
                  className={`text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded-lg border font-bold transition flex items-center gap-1 cursor-pointer select-none ${
                    isLight
                      ? "border-amber-700/20 text-amber-800 hover:bg-amber-50"
                      : "border-amber-400/25 text-amber-300 hover:bg-white/5"
                  }`}
                >
                  <span>Restart</span>
                  <RefreshCw className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '3s' }} />
                </button>
              )}
            </div>

            {/* Back to envelope option for shared recipient view at the top absolute */}
            {!isPreviewMode && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  setActiveSlide(0);
                }}
                className={`absolute top-4 right-4 p-1.5 rounded-full transition flex items-center justify-center gap-1 text-[9px] uppercase font-bold tracking-wider cursor-pointer z-20 ${
                  isLight
                    ? "text-amber-700 hover:bg-amber-100"
                    : "text-amber-300/50 hover:text-amber-300 hover:bg-white/5"
                }`}
                title="Seal Back in Envelope"
              >
                <RefreshCw className="w-2.5 h-2.5" />
                <span>Seal</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
