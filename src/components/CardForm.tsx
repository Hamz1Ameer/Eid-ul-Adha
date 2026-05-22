import React, { useState } from "react";
import { WISH_PRESETS, THEME_PRESETS } from "../data";
import { WishPreset, ThemePreset } from "../types";
import { Copy, Check, Share2, Send, Palette, FileText, User, Users, Gift, Sparkles } from "lucide-react";

interface CardFormProps {
  to: string;
  from: string;
  wishId: string;
  themeId: string;
  customMsg: string;
  slide1Msg: string;
  slide3Msg: string;
  onToChange: (val: string) => void;
  onFromChange: (val: string) => void;
  onWishIdChange: (val: string) => void;
  onThemeIdChange: (val: string) => void;
  onCustomMsgChange: (val: string) => void;
  onSlide1MsgChange: (val: string) => void;
  onSlide3MsgChange: (val: string) => void;
}

export default function CardForm({
  to,
  from,
  wishId,
  themeId,
  customMsg,
  slide1Msg,
  slide3Msg,
  onToChange,
  onFromChange,
  onWishIdChange,
  onThemeIdChange,
  onCustomMsgChange,
  onSlide1MsgChange,
  onSlide3MsgChange,
}: CardFormProps) {
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSuccessfullyGenerated, setIsSuccessfullyGenerated] = useState(false);
  const [advancedExpanded, setAdvancedExpanded] = useState(false);

  // Generate shareable link
  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();

    if (to.trim()) params.set("to", to.trim());
    if (from.trim()) params.set("from", from.trim());
    if (wishId !== "1") params.set("wish", wishId);
    if (themeId !== "emerald") params.set("theme", themeId);

    if (wishId === "custom" && customMsg.trim()) {
      params.set("msg", customMsg.trim());
    }

    const defaultS1 = "As the sacred crescent graces the evening sky, we invite you to open this humble blessing of hope.";
    const defaultS3 = "May your sacrifices be accepted, and may your heart find absolute tranquillity.";

    if (slide1Msg.trim() && slide1Msg.trim() !== defaultS1) {
      params.set("s1", slide1Msg.trim());
    }
    if (slide3Msg.trim() && slide3Msg.trim() !== defaultS3) {
      params.set("s3", slide3Msg.trim());
    }

    const finalUrl = `${baseUrl}?${params.toString()}`;
    setGeneratedUrl(finalUrl);
    setIsSuccessfullyGenerated(true);
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Could not copy URL", err);
    }
  };

  const handleWhatsAppShare = () => {
    const customMessage = `🌙 Eid Mubarak! I have created a personalized Eid al-Adha greeting card just for you. Open it here to see your blessing: ${generatedUrl}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(customMessage)}`;
    window.open(url, "_blank");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Eid al-Adha Greeting Card",
          text: `🌙 Eid Mubarak! I made a personalized greeting card. Open it here:`,
          url: generatedUrl,
        });
      } catch (err) {
        console.log("Supported but cancelled/failed", err);
      }
    }
  };

  return (
    <div className="bg-emerald-950/45 border-2 border-emerald-800/50 backdrop-blur-md rounded-[32px] p-6 sm:p-8 shadow-2xl space-y-6 gold-glow" id="customizer-panel">
      <div className="text-center space-y-1">
        <h3 className="text-xl font-display font-bold text-amber-400">
          ✨ Customize & Share
        </h3>
        <p className="text-xs text-emerald-300/70 font-sans">
          Design a personalized blessing in real-time, then share the special link.
        </p>
      </div>

      <form onSubmit={handleGenerate} className="space-y-5">
        {/* --- RECEPIENT AND SENDER --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>Recipient Name</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Aisha & Family"
              value={to}
              onChange={(e) => {
                onToChange(e.target.value);
                setIsSuccessfullyGenerated(false); // reset URL on change
              }}
              className="w-full bg-emerald-900/30 border border-emerald-800/60 rounded-xl px-4 py-3 text-sm text-amber-100 placeholder-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all font-sans"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>Your Name (Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Yusuf"
              value={from}
              onChange={(e) => {
                onFromChange(e.target.value);
                setIsSuccessfullyGenerated(false);
              }}
              className="w-full bg-emerald-900/30 border border-emerald-800/60 rounded-xl px-4 py-3 text-sm text-amber-100 placeholder-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all font-sans"
            />
          </div>
        </div>

        {/* --- THEME SELECTOR --- */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span>Select Design Theme</span>
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {THEME_PRESETS.map((p) => {
              const worksAsActive = p.id === themeId;

              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    onThemeIdChange(p.id);
                    setIsSuccessfullyGenerated(false);
                  }}
                  className={`px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer text-left border flex items-center justify-between transition relative overflow-hidden ${
                    worksAsActive
                      ? "border-amber-400 bg-amber-400/10 shadow-sm text-amber-200"
                      : "border-emerald-800/40 bg-emerald-900/10 hover:bg-emerald-900/20 text-emerald-100/70"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {/* Small visual circle palette preview */}
                    <div className={`w-3.5 h-3.5 rounded-full bg-gradient-to-br ${p.bgGradient} border border-amber-400/30 shadow-inner`} />
                    <span>
                      {p.name}
                    </span>
                  </div>
                  {worksAsActive && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* --- EID WISHES SELECTOR / CUSTOM MESSAGE --- */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Slide 2 (Main Message)</span>
            </label>
            <div className="flex gap-1.5 bg-emerald-950/60 border border-emerald-800/40 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => {
                  if (wishId === "custom") {
                    onWishIdChange("1");
                  }
                  setIsSuccessfullyGenerated(false);
                }}
                className={`px-2 py-1 text-[10px] uppercase font-bold rounded transition-all cursor-pointer ${
                  wishId !== "custom"
                    ? "bg-amber-400 text-emerald-950"
                    : "text-emerald-300 hover:text-amber-200"
                }`}
              >
                Presets
              </button>
              <button
                type="button"
                onClick={() => {
                  onWishIdChange("custom");
                  setIsSuccessfullyGenerated(false);
                }}
                className={`px-2 py-1 text-[10px] uppercase font-bold rounded transition-all cursor-pointer ${
                  wishId === "custom"
                    ? "bg-amber-400 text-emerald-950"
                    : "text-emerald-300 hover:text-amber-200"
                }`}
              >
                Custom
              </button>
            </div>
          </div>

          {wishId !== "custom" ? (
            <div className="space-y-2 max-h-44 overflow-y-auto pr-1 custom-scrollbar">
              {WISH_PRESETS.map((w) => {
                const isSelected = w.id === wishId;
                return (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => {
                      onWishIdChange(w.id);
                      setIsSuccessfullyGenerated(false);
                    }}
                    className={`w-full p-3 rounded-xl border text-left transition text-xs relative cursor-pointer ${
                      isSelected
                        ? "border-amber-400 bg-amber-400/15 text-amber-200 shadow-md"
                        : "border-emerald-800/40 bg-emerald-900/10 hover:bg-emerald-900/20 text-emerald-100/60"
                    }`}
                  >
                    <div className="flex justify-between items-center font-bold mb-1">
                      <span className={isSelected ? "text-amber-300" : "text-emerald-100/80"}>
                        {w.title}
                      </span>
                      {w.arabic && (
                        <span className="font-serif text-[10px] tracking-wide opacity-80 text-amber-400/95">
                          {w.arabic}
                        </span>
                      )}
                    </div>
                    <p className="line-clamp-2 italic leading-relaxed text-emerald-100/70">
                      "{w.text}"
                    </p>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="animate-fade-in space-y-2">
              <textarea
                value={customMsg}
                onChange={(e) => {
                  onCustomMsgChange(e.target.value);
                  setIsSuccessfullyGenerated(false);
                }}
                placeholder="Write your custom blessing message for Slide 2 here..."
                rows={4}
                className="w-full bg-emerald-900/30 border border-emerald-800/60 rounded-xl px-4 py-3 text-xs text-amber-100 placeholder-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all font-sans leading-relaxed"
                required
              />
              <span className="text-[10px] text-emerald-400/70 italic px-1 block">
                * Appears inside the central, main page alongside the sheep.
              </span>
            </div>
          )}
        </div>

        {/* --- INTERACTIVE MULTI-STEP SLIDES 1 & 3 CUSTOMIZATION --- */}
        <div className="border border-emerald-800/40 bg-emerald-950/20 rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => {
              setAdvancedExpanded(!advancedExpanded);
            }}
            className="w-full px-4 py-3 text-[10px] uppercase font-bold tracking-wider text-emerald-300 flex items-center justify-between hover:bg-emerald-900/10 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-1.5 text-amber-300 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Personalize Slides 1 & 3 (Optional)</span>
            </div>
            <span className="text-amber-400 font-mono text-xs">{advancedExpanded ? "[-]" : "[+]"}</span>
          </button>
          
          {advancedExpanded && (
            <div className="p-4 border-t border-emerald-800/40 space-y-4 animate-fade-in bg-emerald-950/30">
              {/* Slide 1 welcome */}
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-wider text-emerald-400 font-bold">
                  Slide 1: Welcome Greeting text
                </label>
                <textarea
                  value={slide1Msg}
                  onChange={(e) => {
                    onSlide1MsgChange(e.target.value);
                    setIsSuccessfullyGenerated(false);
                  }}
                  rows={2}
                  className="w-full bg-emerald-900/50 border border-emerald-800/50 rounded-lg px-3 py-2 text-xs text-amber-100 placeholder-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all font-sans leading-relaxed"
                  placeholder="Welcome greeting..."
                />
              </div>

              {/* Slide 3 custom prayer / closure */}
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-wider text-emerald-400 font-bold">
                  Slide 3: Interactive Du'a card closing note / letter
                </label>
                <textarea
                  value={slide3Msg}
                  onChange={(e) => {
                    onSlide3MsgChange(e.target.value);
                    setIsSuccessfullyGenerated(false);
                  }}
                  rows={2}
                  className="w-full bg-emerald-900/50 border border-emerald-800/50 rounded-lg px-3 py-2 text-xs text-amber-100 placeholder-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all font-sans leading-relaxed"
                  placeholder="Closing prayer message..."
                />
              </div>
            </div>
          )}
        </div>

        {/* --- GENERATE BUTTON --- */}
        <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold py-4 rounded-xl transition-all uppercase text-xs tracking-widest shadow-lg shadow-amber-500/10 cursor-pointer flex items-center justify-center gap-2"
        >
          <Gift className="w-4 h-4 shrink-0" />
          <span>Generate Shareable Link</span>
        </button>
      </form>

      {/* --- GENERATED URL SHARES --- */}
      {isSuccessfullyGenerated && generatedUrl && (
        <div className="pt-4 border-t border-emerald-800/50 space-y-4 animate-fade-in">
          <div className="bg-emerald-900/30 border border-emerald-800/80 p-4 rounded-2xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-2">
              🎉 Your Personalized Greeting is Ready!
            </span>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={generatedUrl}
                onClick={(e) => (e.target as HTMLInputElement).select()}
                className="flex-1 px-3 py-2.5 bg-emerald-950 border border-emerald-800/80 text-emerald-300 rounded-lg text-xs font-mono select-all focus:outline-none"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="px-4 py-2.5 bg-emerald-900/40 border border-emerald-700 hover:bg-emerald-800 hover:border-emerald-600 text-amber-100 font-semibold rounded-lg text-xs transition duration-200 flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleWhatsAppShare}
              className="w-full bg-emerald-900/50 border border-emerald-700 hover:bg-emerald-800 py-3 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-2 cursor-pointer text-emerald-200"
            >
              <Send className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Share</span>
            </button>

            {navigator.share ? (
              <button
                onClick={handleNativeShare}
                className="w-full bg-emerald-900/50 border border-emerald-700 hover:bg-emerald-800 py-3 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-2 cursor-pointer text-emerald-200"
              >
                <Share2 className="w-4 h-4 text-amber-400" />
                <span>Device Share sheet</span>
              </button>
            ) : (
              <button
                onClick={handleCopy}
                className="w-full bg-emerald-900/50 border border-emerald-700 hover:bg-emerald-800 py-3 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-2 cursor-pointer text-emerald-200"
              >
                <Copy className="w-4 h-4 text-amber-400" />
                <span>Copy to clipboard</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
