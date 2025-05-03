import { useEffect, useRef } from "react";

export default function MoviePlayer({ videoSrc }: { videoSrc: string }) {
  const videoRef = useRef(null);

  return (
    useEffect(() => {
      console.log(`src has been changed to ${videoSrc}`);
      document
        .getElementsByClassName("video-player")[0]
        .setAttribute("src", videoSrc);
    }, [videoSrc]), // Run this effect when videoSrc changes
    (
      // Check if videoSrc is not empty
      <div className="movieplayer">
        <pre className="section-title">{videoSrc}</pre>
        <video className="video-player" ref={videoRef} controls>
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
    )
  );
}
