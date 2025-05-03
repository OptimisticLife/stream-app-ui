import { useState } from "react";
import MovieList from "../components/movieList";
import MoviePlayer from "../components/moviePlayer";
import DashboardNav from "../components/dashboardNav";
import UploadFile from "../components/upload";

export default function Dashboard() {
  const [videoSrc, setVideoSrc] = useState("http://localhost:4647/video-1.mp4");

  return (
    <div className="dashboard">
      <DashboardNav />
      <UploadFile />
      <MovieList setVideoSrc={setVideoSrc} />
      <MoviePlayer videoSrc={videoSrc} />
    </div>
  );
}
