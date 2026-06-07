import { useEffect, useRef } from "react";

const VIDEO_SRC = "/videos/cta-real-estate.mp4";

export function CtaBackgroundVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = true;

    const tryPlay = () => {
      void video.play().catch(() => {});
    };

    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplaythrough", tryPlay);

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplaythrough", tryPlay);
    };
  }, []);

  return (
    <video
      ref={ref}
      src={VIDEO_SRC}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="absolute inset-0 w-full h-full object-cover"
      aria-hidden
    />
  );
}
