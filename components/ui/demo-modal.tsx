"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Fermeture avec la touche Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Pause la vidéo quand on ferme
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Démo TradeFlow Africa"
    >
      {/* Backdrop sombre avec blur */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Conteneur vidéo */}
      <div className="relative z-10 w-full max-w-5xl mx-4 animate-in fade-in zoom-in-95 duration-200">
        {/* Barre titre */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0A2342] rounded-t-xl border border-white/10 border-b-0">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-white font-semibold text-sm tracking-tight">
              TradeFlow Africa — Démo interactive
            </span>
          </div>
          <button
            onClick={onClose}
            id="demo-modal-close"
            aria-label="Fermer la démo"
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Lecteur vidéo */}
        <div className="relative bg-black rounded-b-xl overflow-hidden shadow-2xl border border-white/10 border-t-0">
          <video
            ref={videoRef}
            src="/ProjetPOESAM.mp4"
            controls
            autoPlay
            playsInline
            className="w-full max-h-[75vh] object-contain"
            style={{ display: "block" }}
          >
            Votre navigateur ne supporte pas la lecture vidéo HTML5.
          </video>
        </div>

        {/* Hint Escape */}
        <p className="text-center text-white/30 text-xs mt-3 tracking-wide">
          Appuyez sur <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/50 font-mono">Esc</kbd> ou cliquez en dehors pour fermer
        </p>
      </div>
    </div>
  );
}
