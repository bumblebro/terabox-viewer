import { NextResponse } from "next/server";
import axios from "axios";

interface FileInfo {
  is_dir: number;
  fs_id: string | number;
  name: string;
  type: string;
  size: number | string;
  image: string;
  list: FileInfo[];
}

interface FileListResponse {
  status: string;
  sign: string;
  timestamp: number;
  shareid: number;
  uk: number;
  list: FileInfo[];
}

interface DownloadResponse {
  status: string;
  download_link: {
    url_1: string;
    url_2?: string;
  };
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    console.log("Received URL:", url);

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Step 1: Get file list using TeraDL API
    const fileListResponse = await axios.post<FileListResponse>(
      "https://teradl-api.dapuntaratya.com/generate_file",
      { url },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (
      fileListResponse.data.status !== "success" ||
      !fileListResponse.data.list
    ) {
      return NextResponse.json(
        { error: "Failed to get file list" },
        { status: 400 }
      );
    }

    // Step 2: Find the first video file
    const findVideoFile = (files: FileInfo[]): FileInfo | null => {
      for (const file of files) {
        if (file.type === "video") {
          return file;
        }
        if (file.list && file.list.length > 0) {
          const found = findVideoFile(file.list);
          if (found) return found;
        }
      }
      return null;
    };

    const videoFile = findVideoFile(fileListResponse.data.list);
    if (!videoFile) {
      return NextResponse.json(
        { error: "No video file found" },
        { status: 404 }
      );
    }

    // Step 3: Generate download link using TeraDL API
    const downloadResponse = await axios.post<DownloadResponse>(
      "https://teradl-api.dapuntaratya.com/generate_link",
      {
        uk: fileListResponse.data.uk,
        shareid: fileListResponse.data.shareid,
        timestamp: fileListResponse.data.timestamp,
        sign: fileListResponse.data.sign,
        fs_id: videoFile.fs_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (
      downloadResponse.data.status !== "success" ||
      !downloadResponse.data.download_link.url_1
    ) {
      return NextResponse.json(
        { error: "Failed to generate download link" },
        { status: 500 }
      );
    }

    // Return the direct video URL and file information
    return NextResponse.json({
      videoUrl:
        downloadResponse.data.download_link.url_2 ||
        downloadResponse.data.download_link.url_1,
      fileName: videoFile.name,
      fileSize: typeof videoFile.size === "number" ? videoFile.size : 0,
    });
  } catch (error) {
    console.error("Error processing URL:", error);
    return NextResponse.json(
      { error: "Failed to process URL. Please try again." },
      { status: 500 }
    );
  }
}
