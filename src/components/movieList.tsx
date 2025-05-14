import { useEffect, useState } from "react";

type requestOptionsType = {
  method: string;
  credentials: RequestCredentials;
  headers: {
    "Content-Type": string;
  };
};

const apiUrl = import.meta.env.VITE_API_URL;

const requestOptions: requestOptionsType = {
  method: "GET",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
};
type MovieType = {
  id: string;
  name: string;
};

export default function MovieList({
  setVideoSrc,
}: {
  setVideoSrc: (src: string) => void;
}) {
  const [movies, setMovies] = useState<Array<MovieType>>([]);

  useEffect(() => {
    // Fetch data from the server

    async function fetchMovies() {
      try {
        const apiResponse = await fetch(`${apiUrl}/getMovies`, requestOptions);
        const movies = await apiResponse.json();
        console.log("Data from the server:", movies);
        setMovies(movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    fetchMovies();
  }, []); // Empty
  //
  // dependency array to run this effect only once when the component mounts

  const movieHandler = (videosrc: string) => {
    setVideoSrc(`${apiUrl}/${videosrc}.mp4`);
  };
  return (
    <div className="movie-list">
      <pre className="section-title">Movies from the server:4647..</pre>
      <div className="movie-list-container">
        {movies.length > 0 &&
          movies.map((movie: { id: string; name: string }, index: number) => (
            <div
              className="movie-card"
              key={index}
              onClick={() => movieHandler(movie.id)}
            >
              <img src={`${apiUrl}/${movie.id}.jpeg`} alt={movie.id} />
              <pre>{movie.name}</pre>
            </div>
          ))}
      </div>
    </div>
  );
}
