export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose prose-lg">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          1. Information We Collect
        </h2>
        <p className="mb-4">
          We collect information that you provide directly to us, including when
          you use our service to view TeraBox videos. This may include:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>TeraBox share links that you input</li>
          <li>Usage data and analytics</li>
          <li>Device and browser information</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          2. How We Use Your Information
        </h2>
        <p className="mb-4">We use the information we collect to:</p>
        <ul className="list-disc pl-6 mb-6">
          <li>Provide and maintain our service</li>
          <li>Process your video viewing requests</li>
          <li>Improve our service</li>
          <li>Monitor usage patterns</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Storage</h2>
        <p className="mb-4">
          We do not permanently store your TeraBox links or any personal
          information. All data is processed in real-time and is not retained
          after your session ends.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Cookies</h2>
        <p className="mb-4">
          We use cookies to improve your experience on our website. You can
          choose to disable cookies through your browser settings, but this may
          affect the functionality of our service.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          5. Third-Party Services
        </h2>
        <p className="mb-4">
          Our service integrates with TeraBox and may use other third-party
          services. These services have their own privacy policies and may
          collect information as specified in their respective privacy policies.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Security</h2>
        <p className="mb-4">
          We implement appropriate security measures to protect your
          information. However, no method of transmission over the internet is
          100% secure, and we cannot guarantee absolute security.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          7. Changes to This Policy
        </h2>
        <p className="mb-4">
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us
          through our contact page.
        </p>
      </div>
    </div>
  );
}
