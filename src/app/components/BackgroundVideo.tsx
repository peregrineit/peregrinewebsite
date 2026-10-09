'use client';
import { useEffect, useRef, useState } from 'react';

// Webflow-style background video. The poster is always shown (as the video's
// background image). The video sources are attached only at desktop widths and only
// once the video is near the viewport, so phones never download it and desktop visitors
// who never scroll to it don't either.
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
  const [isNear, setIsNear] = useState(false);

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
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px 0px' },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const attach = isDesktop && isNear;
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    if (attach) video.play().catch(() => {});
  }, [attach]);

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
        {attach && sources.map((s) => <source key={s.src} src={s.src} type={s.type} data-wf-ignore="true" />)}
      </video>
    </div>
  );
}
