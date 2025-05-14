type BlobRequestType = {
  method: string;
  credentials: RequestCredentials;
  headers: {
    "Content-Type": string;
    "X-file-id": string;
    "X-is-last"?: string;
  };
  body?: Blob;
};

const CHUNK_SIZE = 5 * 1024 * 1024; // 1MB, change as needed

/**
 * Uploads a file in chunks to a given URL with a fileId.
 * Adds a 'X-Last-Chunk' header to indicate the final chunk.
 */
export function uploadingChunks(
  file: File,
  fetchUrl: string,
  fileId: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file) return reject("No file provided");

    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    let currentChunk = 0;

    const uploadNextChunk = async () => {
      const start = currentChunk * CHUNK_SIZE;
      const end = Math.min(file.size, start + CHUNK_SIZE);
      const chunk = file.slice(start, end);
      const isLastChunk = currentChunk === totalChunks - 1;

      const requestOptions: BlobRequestType = {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-file-id": fileId,
          "X-is-last": isLastChunk.toString(),
        },
        body: chunk,
      };

      try {
        await fetch(fetchUrl, requestOptions);
        currentChunk++;

        if (currentChunk < totalChunks) {
          uploadNextChunk();
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
