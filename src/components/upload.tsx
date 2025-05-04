import { useState, useRef } from "react";

type credentialsType = "omit" | "same-origin" | "include";
const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

type requestOptionsTypeBlob = {
  method: string;
  credentials: credentialsType;
  headers: {
    "Content-Type": string;
  };
  body?: Blob;
};

type requestOptionsTypeNewMovie = {
  method: string;
  credentials: credentialsType;
  headers: {
    "Content-Type": string;
  };
  body?: string | null;
};

type requestOptionsPlain = {
  method: string;
  credentials: credentialsType;
  headers: {
    "Content-Type": string;
  };
};

function uploadingChunks(file: File, fetchUrl: string) {
  return new Promise((resolve, reject) => {
    if (!file) return;

    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    let currentChunk = 0;

    const uploadNextChunk = async () => {
      const start = currentChunk * CHUNK_SIZE;
      const end = Math.min(file.size, start + CHUNK_SIZE);
      const chunk = file.slice(start, end);

      const requestOptions: requestOptionsTypeBlob = {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: chunk,
      };

      try {
        await fetch(fetchUrl, requestOptions);

        currentChunk++;
        if (currentChunk < totalChunks) {
          uploadNextChunk(); // Recursive next chunk
        } else {
          resolve("Upload complete");
          console.log("Upload complete");
        }
      } catch (error) {
        console.error("Chunk upload failed", error);
        reject(error);
      }
    };

    uploadNextChunk();
  });
}

function UploadFile({
  uploadViewHandler,
}: {
  uploadViewHandler: (view: boolean) => void;
}) {
  const [thumbnail, setThumbnail] = useState<unknown | File>(null);
  const [movieName, setMovieName] = useState<string>("");
  const [movie, setMovie] = useState<unknown | File>(null);
  const movieRef = useRef(null);
  const thumbnailRef = useRef(null);

  const thumbnailInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setThumbnail(e.target?.files[0]);
    }
  };

  const movieInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMovie(e.target?.files[0]);
    }
  };

  const uploadHandler = async () => {
    const movieDetails = {
      movieName: movieName,
      thumbnailName: movieName,
      movieSize: movie instanceof File ? movie.size : 0,
      thumbnailSize: thumbnail instanceof File ? thumbnail.size : 0,
      movieType: movie instanceof File ? movie.type : "",
      thumbnailType: thumbnail instanceof File ? thumbnail.type : "",
    };

    const newMovieRequestOptions: requestOptionsTypeNewMovie = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieDetails),
    };

    const uploadConfirmationReq: requestOptionsPlain = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await fetch("http://localhost:4647/upload-movie", newMovieRequestOptions);
      await uploadingChunks(
        movie as File,
        "http://localhost:4647/upload-movie-chunk"
      );
      await uploadingChunks(
        thumbnail as File,
        "http://localhost:4647/upload-thumbnail-chunk"
      );

      const response = await fetch(
        "http://localhost:4647/movie-uploaded-confirmation",
        uploadConfirmationReq
      );
      if (response.ok) {
        setMovie(null);
        setThumbnail(null);
        setMovieName("");
        if (movieRef.current) {
          (movieRef.current as HTMLInputElement).value = "";
        }
        if (thumbnailRef.current) {
          (thumbnailRef.current as HTMLInputElement).value = "";
        }

        console.log("Upload completed successfully");
      } else {
        console.log("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }

    // Make sure to upload the movie and thumbnail the entire size.
  };
  return (
    <div className="upload-movie">
      <div className="back-link " onClick={() => uploadViewHandler(false)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="#54b17e"
        >
          <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
        </svg>
        <pre>Back</pre>
      </div>
      <pre className="section-title">Upload Movies</pre>
      <div className="upload-form">
        <input
          type="text"
          placeholder="Movie Name"
          onChange={(e) => setMovieName(e.target.value)}
          value={movieName}
        />
        <div className="file-input">
          <label htmlFor="file-thumbnail" className="custom-file-upload">
            Thumbnail
          </label>

          <input
            type="file"
            onChange={(e) => thumbnailInputHandler(e)}
            id="file-thumbnail"
            ref={thumbnailRef}
          />
        </div>
        <div className="file-input">
          <label htmlFor="file-movie" className="custom-file-upload">
            Movie
          </label>

          <input
            type="file"
            onChange={(e) => movieInputHandler(e)}
            id="file-movie"
            ref={movieRef}
          />
        </div>
        <button
          onClick={uploadHandler}
          disabled={!thumbnail || !movie || !movieName}
        >
          Upload{" "}
        </button>
      </div>
    </div>
  );
}

export default UploadFile;
