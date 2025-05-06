export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About TeraBox Viewer</h1>
      <div className="prose prose-lg">
        <p className="mb-4">
          TeraBox Viewer is a free, open-source web application that allows
          users to watch TeraBox videos online without downloading them. Our
          mission is to provide a simple and efficient way to access and view
          content shared on TeraBox.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Features</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>Instant video playback from TeraBox links</li>
          <li>No downloads required</li>
          <li>Simple and intuitive interface</li>
          <li>Mobile-friendly design</li>
          <li>Free to use</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-4">How It Works</h2>
        <p className="mb-4">
          Simply paste your TeraBox share link into our viewer, and we'll handle
          the rest. Our service processes the link and provides you with a
          direct video player, making it easy to watch your content instantly.
        </p>
      </div>
    </div>
  );
}
