import React from 'react';
import { BackgroundVideo } from './BackgroundVideo';
import { VideoOverlay } from './VideoOverlay';
import { HeroContent } from './HeroContent';

interface HeroProps {
  videoUrl?: string;
  posterUrl?: string;
  onExploreClick: () => void;
  onCategoriesClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  videoUrl,
  posterUrl,
  onExploreClick,
  onCategoriesClick,
}) => {
  return (
    <section className="relative w-full overflow-hidden bg-slate-950 flex flex-col justify-center">
      {/* Background Video */}
      <BackgroundVideo videoUrl={videoUrl} posterUrl={posterUrl} />

      {/* Video Overlay */}
      <VideoOverlay />

      {/* Hero Content */}
      <HeroContent
        onExploreClick={onExploreClick}
        onCategoriesClick={onCategoriesClick}
      />
    </section>
  );
};
