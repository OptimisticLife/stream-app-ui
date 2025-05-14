import { useState, useRef } from "react";
import { uploadingChunks } from "../util/uploadchunk";

const apiUrl = import.meta.env.VITE_API_URL;

function UploadFile({
  uploadViewHandler,
}: {
  uploadViewHandler: (view: boolean) => void;
}) {
  const [thumbnail, setThumbnail] = useState<unknown | File>(null);
  const [thumbnailErrMsg, setThumbnailErrMsg] = useState<string>("");
  const [movieName, setMovieName] = useState<string>("");
  const [movie, setMovie] = useState<unknown | File>(null);
  const [movieErrMsg, setMovieErrMsg] = useState<string>("");
  const movieRef = useRef(null);
  const thumbnailRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const thumbnailInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Should check .jpeg and size  < 5MB i.e 5000000Byte
      const file = e.target?.files[0];
      console.log("File Type:", file.type, file.size);
      if (file.size > 5000000) {
        setThumbnailErrMsg("File size should less than 5MB.");
        return;
      }
      if (file.type !== "image/jpeg") {
        setThumbnailErrMsg("Thumbnail image should be jpeg format");
        return;
      }
      setThumbnailErrMsg("");
      setThumbnail(e.target.files[0]);
    }
  };

  const movieInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Should check .mp4 and size  < 50MB i.e 50000000Byte
      const file = e.target?.files[0];
      console.log("File Type:", file);

      if (file.size > 50000000) {
        setMovieErrMsg("File size should less than 50MB.");
        return;
      }
      if (file.type !== "video/mp4") {
        setMovieErrMsg("Thumbnail image should be mp4 format");
        return;
      }
      setMovieErrMsg("");
      setMovie(e.target?.files[0]);
    }
  };

  const uploadHandler = async () => {
    setIsLoading(true);

    const fileId =
      movieName + "-" + Math.random().toString(36).substring(2, 14);

    try {
      await uploadingChunks(
        thumbnail as File,
        `${apiUrl}/upload-thumbnail-chunk`,
        fileId
      );

      await uploadingChunks(
        movie as File,
        `${apiUrl}/upload-movie-chunk`,
        fileId
      );

      setMovie(null);
      setThumbnail(null);
      setMovieName("");
      setIsLoading(false);
      if (movieRef.current) {
        (movieRef.current as HTMLInputElement).value = "";
      }
      if (thumbnailRef.current) {
        (thumbnailRef.current as HTMLInputElement).value = "";
      }
      console.log("Upload completed successfully");
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

          {thumbnailErrMsg && <pre className="status">{thumbnailErrMsg}</pre>}
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
          {movieErrMsg && <pre className="status">{movieErrMsg}</pre>}
        </div>
        <button
          className="upload-form-btn"
          onClick={uploadHandler}
          disabled={!thumbnail || !movie || !movieName}
        >
          <pre>Upload</pre>
          {isLoading && <span className="loader"></span>}
        </button>
      </div>
    </div>
  );
}

export default UploadFile;
