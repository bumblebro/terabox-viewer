"use client";

import { useState } from "react";
import { FaDownload, FaPlay } from "react-icons/fa";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setVideoUrl("");

    try {
      const response = await fetch("/api/process-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to process URL");
      }

      setVideoUrl(data.videoUrl);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to process the URL. Please check if it's a valid Terabox link."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            Terabox Video Viewer
          </h1>

          <p className="text-center text-gray-300 mb-8">
            Watch Terabox videos without ads. Simply paste your Terabox video
            link below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste your Terabox video URL here"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  "Processing..."
                ) : (
                  <>
                    <FaPlay className="text-lg" />
                    Watch Video
                  </>
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500">
              {error}
            </div>
          )}

          {videoUrl && (
            <div className="mt-8">
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <video
                  src={videoUrl}
                  controls
                  className="w-full h-full"
                  controlsList="nodownload"
                />
              </div>
              <div className="mt-4 flex justify-center">
                <a
                  href={videoUrl}
                  download
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium flex items-center gap-2"
                >
                  <FaDownload className="text-lg" />
                  Download Video
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
