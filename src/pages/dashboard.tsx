import { useState } from "react";
import MovieList from "../components/movieList";
import MoviePlayer from "../components/moviePlayer";
import DashboardNav from "../components/dashboardNav";
import UploadFile from "../components/upload";
import UploadBtn from "../components/uploadBtn";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [videoSrc, setVideoSrc] = useState(`${apiUrl}/video-1.mp4`);

  const [uploadView, setUploadView] = useState(false);

  return (
    <div className="dashboard">
      <DashboardNav />
      {!uploadView && (
        <UploadBtn uploadView={uploadView} uploadViewHandler={setUploadView} />
      )}
      {uploadView && <UploadFile uploadViewHandler={setUploadView} />}
      {!uploadView && (
        <>
          <MovieList setVideoSrc={setVideoSrc} />
          <MoviePlayer videoSrc={videoSrc} />
        </>
      )}
    </div>
  );
}
