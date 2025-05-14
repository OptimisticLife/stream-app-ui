import { useEffect, useRef } from "react";

export default function MoviePlayer({ videoSrc }: { videoSrc: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    console.log(`src has been changed to ${videoSrc}`);
    if (videoRef.current) {
      videoRef.current.load(); // This reloads the video
    }
  }, [videoSrc]);

  return (
    // Run this effect when videoSrc changes
    // Check if videoSrc is not empty
    videoSrc === "" ? (
      <pre>Click any thumbnail to play video.</pre>
    ) : (
      <div className="movieplayer">
        <pre className="section-title">{videoSrc}</pre>
        <video className="video-player" ref={videoRef} controls>
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
    )
  );
}
