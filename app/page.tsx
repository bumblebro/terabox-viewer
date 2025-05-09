"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setLoadingMessage("Processing your request...");

    try {
      setLoadingMessage("Connecting to Terabox...");
      const response = await fetch("/api/process-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to process URL");
      }

      if (!data.videoUrl) {
        throw new Error("No download link received");
      }

      setLoadingMessage("Redirecting to file page...");
      // Redirect to the video page with all the information
      const queryParams = new URLSearchParams({
        url: data.videoUrl,
        fileName: data.fileName,
        fileSize: data.fileSize.toString(),
        fileType: data.fileType,
      });
      router.push(`/video?${queryParams.toString()}`);
    } catch (err) {
      console.error("Error:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Download Terabox Files
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Download files from Terabox without login. Works with 1024terabox,
              freeterabox, nephobox, and other Terabox domains.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="url"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Enter Terabox URL
                </label>
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://1024terabox.com/s/..."
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white text-gray-700"
                  disabled={loading}
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                  {error}
                </div>
              )}
              {loading && (
                <div className="text-blue-600 text-sm bg-blue-50 p-3 rounded-lg border border-blue-100">
                  {loadingMessage}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
              >
                {loading ? "Processing..." : "Watch Terabox Video"}
              </button>
            </form>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Fast Downloads
              </h3>
              <p className="text-gray-600">
                Get your files quickly with our optimized download system
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                No Login Required
              </h3>
              <p className="text-gray-600">
                Skip the Terabox login process and download directly
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Privacy Focused
              </h3>
              <p className="text-gray-600">
                Your data is never stored on our servers
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
