import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface BackgroundVideoProps {
  videoUrl?: string;
  posterUrl?: string;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  // High quality video clip of luxury watch and craftsmanship / cinematic lifestyle
  videoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-adjusting-a-luxury-wristwatch-42999-large.mp4',
  posterUrl = 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1920&q=80',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may need user interaction if sound is on, but muted works
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
      });
    }
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-950">
      {/* Fallback image shown while video loads */}
      <img
        src={posterUrl}
        alt="AURA Luxury Background"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      {/* Real Background HTML5 Video */}
      <video
        ref={videoRef}
        src={videoUrl}
        poster={posterUrl}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setIsVideoLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover scale-105 transform motion-safe:transition-transform"
      />

      {/* Discretely placed video controls (sound & pause) */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 bg-slate-900/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs text-white/80 transition-all hover:bg-slate-900/80">
        <button
          onClick={togglePlay}
          className="p-1 hover:text-amber-400 transition-colors"
          title={isPlaying ? 'Pausar video' : 'Reproducir video'}
          aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </button>
        <span className="h-3 w-px bg-white/20"></span>
        <button
          onClick={toggleSound}
          className="p-1 hover:text-amber-400 transition-colors"
          title={isMuted ? 'Activar sonido' : 'Silenciar video'}
          aria-label={isMuted ? 'Activar sonido' : 'Silenciar video'}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
        <span className="text-[10px] tracking-wider uppercase font-medium text-slate-300 hidden sm:inline">
          {isMuted ? 'Muted' : 'Audio On'}
        </span>
      </div>
    </div>
  );
};
