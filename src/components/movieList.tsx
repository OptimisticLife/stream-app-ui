import { useEffect, useState } from "react";

const requestOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function MovieList({
  setVideoSrc,
}: {
  setVideoSrc: (src: string) => void;
}) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch data from the server

    async function fetchMovies() {
      try {
        const apiResponse = await fetch(
          "http://localhost:4647/getMovies",
          requestOptions
        );
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
    setVideoSrc(videosrc);
  };
  return (
    <div className="movie-list">
      <pre>Movies from the server:4647 ..</pre>
      <div className="movie-list-container">
        {movies.length > 0 &&
          movies.map(
            (
              movie: { title: string; img: string; videoSrc: string },
              index: number
            ) => (
              <div
                className="movie-card"
                key={index}
                onClick={() => movieHandler(movie.videoSrc)}
              >
                <img src={movie.img} alt={movie.title} />
                <pre>{movie.title}</pre>
              </div>
            )
          )}
      </div>
    </div>
  );
}
