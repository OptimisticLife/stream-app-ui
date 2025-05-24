import { useState } from "react";
import MovieList from "../components/movieList";
import MoviePlayer from "../components/moviePlayer";
import DashboardNav from "../components/dashboardNav";
import UploadFile from "../components/upload";
import UploadBtn from "../components/uploadBtn";

type MovieType = {
  id: string;
  name: string;
  video: string;
};

export default function Dashboard() {
  const [playingMovie, setPlayingMovie] = useState<MovieType | null>(null);

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
          <MovieList setPlayingMovie={setPlayingMovie} />
          {playingMovie && <MoviePlayer {...playingMovie} />}
        </>
      )}
    </div>
  );
}
