import React from 'react';

export const VideoOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Dark tint for contrast */}
      <div className="absolute inset-0 bg-slate-950/65 backdrop-contrast-125" />

      {/* Radial vignette emphasizing center and text */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.75)_100%)]" />

      {/* Bottom smooth gradient blend into content */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />

      {/* Top subtle gradient for header readability */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-slate-950/90 to-transparent" />
    </div>
  );
};
