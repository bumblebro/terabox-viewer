import { NextResponse } from "next/server";
import axios from "axios";

interface FileInfo {
  is_dir: string | number;
  fs_id: string | number;
  name: string;
  type: string;
  size: string | number;
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
    url_2: string;
  };
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    console.log("Received URL:", url);

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Get file list
    console.log("Getting file list...");
    const fileListResponse = await axios.post<FileListResponse>(
      // "http://vow8gskkckkccoc8og8004g8.49.13.208.218.sslip.io/generate_file",

      "http://localhost:5001/generate_file",
      { url },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(
      "File list response:",
      JSON.stringify(fileListResponse.data, null, 2)
    );

    if (fileListResponse.data.status !== "success") {
      throw new Error("Failed to get file list");
    }

    // Find the first file (not directory)
    const findFile = (files: FileInfo[]): FileInfo | null => {
      for (const file of files) {
        // Convert is_dir to number for comparison
        const isDir = Number(file.is_dir);
        if (isDir === 0) {
          return file;
        }
        if (file.list && file.list.length > 0) {
          const found = findFile(file.list);
          if (found) return found;
        }
      }
      return null;
    };

    const file = findFile(fileListResponse.data.list);

    if (!file) {
      return NextResponse.json(
        { error: "No files found in the shared folder" },
        { status: 404 }
      );
    }

    // Get download link
    console.log("Getting download link...");
    const downloadResponse = await axios.post<DownloadResponse>(
      // "http://vow8gskkckkccoc8og8004g8.49.13.208.218.sslip.io/generate_link",
      "http://localhost:5001/generate_link",
      {
        uk: fileListResponse.data.uk,
        shareid: fileListResponse.data.shareid,
        timestamp: fileListResponse.data.timestamp,
        sign: fileListResponse.data.sign,
        fs_id: file.fs_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (downloadResponse.data.status !== "success") {
      throw new Error("Failed to get download link");
    }

    // Return the file URL and file information
    const responseData = {
      videoUrl: downloadResponse.data.download_link.url_1,
      fileName: file.name,
      fileSize: Number(file.size),
      fileType: file.type,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error processing URL:", error);
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", {
        status: error.response?.status,
        data: error.response?.data,
      });
    }
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to process URL",
      },
      { status: 500 }
    );
  }
}
