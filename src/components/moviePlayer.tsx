import { useEffect, useRef } from "react";

type MovieType = {
  id: string;
  name: string;
  video: string;
};

export default function MoviePlayer({ name, video }: MovieType) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // This reloads the video
    }
  }, [video]);

  return (
    // Run this effect when playingMovie changes
    // Check if playingMovie is not empty
    video === "" ? (
      <pre>Click any thumbnail to play video.</pre>
    ) : (
      <div className="movieplayer">
        <pre className="section-title">{name}</pre>
        <video className="video-player" ref={videoRef} controls>
          <source src={video} type="video/mp4" />
        </video>
      </div>
    )
  );
}
