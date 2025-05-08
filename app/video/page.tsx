"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";

function VideoContent() {
  const searchParams = useSearchParams();
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  useEffect(() => {
    const url = searchParams.get("url");
    const name = searchParams.get("fileName");
    const size = searchParams.get("fileSize");
    const type = searchParams.get("fileType");

    console.log("File URL from params:", url);
    console.log("File name:", name);
    console.log("File size:", size);
    console.log("File type:", type);

    if (url) {
      const decodedUrl = decodeURIComponent(url);
      console.log("Decoded URL:", decodedUrl);
      setFileUrl(decodedUrl);
      setFileName(name);
      setFileSize(size ? parseInt(size) : null);
      setFileType(type);
    } else {
      setError("No file URL provided");
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading file...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/"
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "Unknown size";
    const units = ["B", "KB", "MB", "GB"];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  const renderFilePreview = () => {
    if (!fileType) return null;

    switch (fileType) {
      case "video":
        return (
          <video
            key={fileUrl}
            src={fileUrl || undefined}
            controls
            className="w-full h-full"
            controlsList="nodownload"
            onError={(e) => {
              console.error("Video error:", e);
              setError("Failed to load video. Please try again.");
            }}
          />
        );
      case "image":
        return (
          <img
            src={fileUrl || undefined}
            alt={fileName || "Image"}
            className="w-full h-full object-contain"
            onError={(e) => {
              console.error("Image error:", e);
              setError("Failed to load image. Please try again.");
            }}
          />
        );
      default:
        return (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <div className="text-center">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <p className="text-gray-600">
                Preview not available for this file type
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-blue-500 hover:text-blue-600"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
        </div>

        {fileName && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{fileName}</h2>
            <div className="flex items-center text-gray-600">
              {fileSize && (
                <span className="mr-4">{formatFileSize(fileSize)}</span>
              )}
              {fileType && <span className="capitalize">{fileType}</span>}
            </div>
          </div>
        )}

        <div className="aspect-video bg-black rounded-xl overflow-hidden">
          {renderFilePreview()}
        </div>

        <div className="mt-6 flex justify-center">
          <a
            href={fileUrl || "#"}
            download={fileName || undefined}
            className="inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download File
          </a>
        </div>
      </div>
    </div>
  );
}

export default function VideoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <VideoContent />
    </Suspense>
  );
}
