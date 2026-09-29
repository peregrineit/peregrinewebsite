'use client';
import { useEffect, useRef, useState } from 'react';

// Webflow-style background video. The poster is always shown (as the video's
// background image); the video sources are only attached at desktop widths, so
// phones never download the video.
const DESKTOP_QUERY = '(min-width: 768px)';

export default function BackgroundVideo({
  className,
  videoId,
  poster,
  sources,
}: {
  className: string;
  videoId: string;
  poster: string;
  sources: { src: string; type: string }[];
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    if (isDesktop) video.play().catch(() => {});
  }, [isDesktop]);

  return (
    <div data-wf-ignore="true" className={className}>
      <video
        ref={videoRef}
        id={videoId}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        style={{ backgroundImage: `url('${poster}')` }}
        data-wf-ignore="true"
        data-object-fit="cover"
      >
        {isDesktop && sources.map((s) => <source key={s.src} src={s.src} type={s.type} data-wf-ignore="true" />)}
      </video>
    </div>
  );
}
